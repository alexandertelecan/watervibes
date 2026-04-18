import { ArrowLeft, Quote } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ColorSwatch } from "@/components/product/ColorSwatch";
import { ProductFeatures } from "@/components/product/ProductFeatures";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { QuoteCTA } from "@/components/product/QuoteCTA";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SIZES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import type { Locale, Product, ProductColor } from "@/types/product";

type PageParams = { locale: string; slug: string };

function assertLocale(value: string): Locale {
  return (routing.locales as readonly string[]).includes(value)
    ? (value as Locale)
    : (routing.defaultLocale as Locale);
}

async function loadProduct(slug: string): Promise<Product | null> {
  await dbConnect();
  const doc = await ProductModel.findOne({ slug }).lean();
  if (!doc) return null;
  return {
    _id: String(doc._id),
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    size: doc.size,
    color: doc.color as ProductColor,
    colorHex: doc.colorHex,
    price: doc.price,
    images: doc.images,
    specs: doc.specs,
    features: doc.features,
    featured: doc.featured,
    order: doc.order,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : "",
    updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : "",
  };
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const docs = await ProductModel.find().select("slug").lean();
    return routing.locales.flatMap((locale) =>
      docs.map((doc) => ({ locale, slug: doc.slug })),
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const product = await loadProduct(slug);
  if (!product) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const path = `/${locale}/catalog/${slug}`;
  return {
    title: product.name[locale],
    description: product.tagline[locale],
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        en: `${siteUrl}/en/catalog/${slug}`,
        ro: `${siteUrl}/ro/catalog/${slug}`,
      },
    },
    openGraph: {
      title: product.name[locale],
      description: product.tagline[locale],
      url: `${siteUrl}${path}`,
      locale,
      type: "website",
      images: product.images[0]
        ? [{ url: product.images[0] }]
        : ["/og-image.jpg"],
    },
  };
}

// Extract a single-sentence pull quote from the description paragraphs —
// preferring the first sentence of the second paragraph (it's typically a
// product-detail sentence that reads well out of context). Falls back to
// the first paragraph's first sentence. Returns null if nothing usable.
function pickPullQuote(paragraphs: string[]): string | null {
  const source = paragraphs[1] ?? paragraphs[0];
  if (!source) return null;
  const match = source.match(/^[^.!?]+[.!?]/);
  const sentence = (match?.[0] ?? source).trim();
  return sentence.length < 30 || sentence.length > 220 ? null : sentence;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = assertLocale(rawLocale);

  const product = await loadProduct(slug);
  if (!product) {
    notFound();
  }

  const t = await getTranslations();
  const sizeEntry = SIZES.find((s) => s.value === product.size);
  const sizeLabel = sizeEntry ? t(sizeEntry.labelKey) : product.size;
  const colorLabel = t(`common.colors.${product.color}`);
  const description = product.description[locale];
  const paragraphs = description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const pullQuote = pickPullQuote(paragraphs);

  const priceFormatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const modelBadge = String(product.specs.capacity).padStart(2, "0");

  return (
    <article className="pb-28">
      {/* ────────────────────────────────────────────────────────────
          1. Breadcrumb rail — slim, editorial, below the header.
          ──────────────────────────────────────────────────────────── */}
      <Container size="wide" className="pt-6 md:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 text-small text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            {t("product.breadcrumb.catalog")}
          </Link>

          <div className="flex items-center gap-3 text-eyebrow text-muted-foreground">
            <ColorSwatch
              hex={product.colorHex}
              label={colorLabel}
              size="sm"
            />
            <span>{colorLabel}</span>
            <span
              aria-hidden="true"
              className="inline-block h-px w-6 bg-border"
            />
            <span>{sizeLabel}</span>
          </div>
        </div>
      </Container>

      {/* ────────────────────────────────────────────────────────────
          2. Masthead — eyebrow + display name + tagline (asymmetric).
          ──────────────────────────────────────────────────────────── */}
      <Container size="wide" className="pt-12 md:pt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <span className="text-eyebrow text-accent">
              {t("product.masthead.eyebrow")} · {t("product.masthead.model")}{" "}
              {modelBadge}
            </span>
            <h1 className="mt-5 font-heading text-[clamp(2.75rem,2.25rem+3vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
              {product.name[locale]}
            </h1>
          </div>
          <p className="self-end font-heading text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-normal leading-[1.4] tracking-[-0.01em] text-foreground/80 md:col-span-4 md:col-start-9 md:text-balance">
            {product.tagline[locale]}
          </p>
        </div>
      </Container>

      {/* ────────────────────────────────────────────────────────────
          3. Stats rail — the signature numerical rhythm. Four big
             numerals set inline, divided by thin rules.
          ──────────────────────────────────────────────────────────── */}
      <Container size="wide" className="pt-10 md:pt-14">
        <dl className="grid grid-cols-2 divide-x divide-border border-y border-border md:grid-cols-4">
          <StatInline
            value={String(product.specs.capacity)}
            label={t("product.specs.units.seats")}
          />
          <StatInline
            value={String(product.specs.jets)}
            label={t("product.specs.units.jets")}
          />
          <StatInline
            value={product.specs.power}
            label={t("product.specs.units.power")}
          />
          <StatInline
            value={product.specs.dimensions}
            label={t("product.specs.units.footprint")}
            compact
          />
        </dl>
      </Container>

      {/* ────────────────────────────────────────────────────────────
          4. Gallery panel — Aesop echo, wide container.
          ──────────────────────────────────────────────────────────── */}
      <Container size="wide" className="pt-12 md:pt-20">
        <ProductGallery
          images={product.images}
          alt={product.name[locale]}
        />
      </Container>

      {/* ────────────────────────────────────────────────────────────
          5. Description + sticky price/CTA column.
          ──────────────────────────────────────────────────────────── */}
      <Container size="wide" className="pt-20 md:pt-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <span className="text-eyebrow text-accent">
              {t("product.description.eyebrow")}
            </span>
            <div className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-[1.7] text-foreground/90">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-8 md:sticky md:top-24 md:p-10">
              <div>
                <span className="text-eyebrow text-muted-foreground">
                  {t("product.price.from")}
                </span>
                <p className="mt-2 font-heading text-[clamp(2.25rem,1.8rem+1.5vw,3rem)] font-bold leading-none tracking-[-0.03em] text-foreground tabular-nums">
                  {priceFormatted}
                </p>
                <p className="mt-3 text-small text-muted-foreground">
                  {t("product.price.includes")}
                </p>
              </div>
              <div
                aria-hidden="true"
                className="h-px w-full bg-border"
              />
              <QuoteCTA slug={product.slug} />
            </div>
          </aside>
        </div>
      </Container>

      {/* ────────────────────────────────────────────────────────────
          6. Pull quote — editorial moment, oversize aqua Quote mark.
          ──────────────────────────────────────────────────────────── */}
      {pullQuote ? (
        <Container size="default" className="pt-24 md:pt-32">
          <figure className="relative">
            <Quote
              aria-hidden="true"
              className="absolute -left-2 -top-6 h-16 w-16 rotate-180 text-accent-tint md:-left-6 md:h-24 md:w-24"
              strokeWidth={1.2}
            />
            <blockquote className="relative font-heading text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-bold leading-[1.25] tracking-[-0.025em] text-foreground text-balance">
              {pullQuote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-eyebrow text-muted-foreground">
              <span className="inline-block h-px w-8 bg-accent" />
              {product.name[locale]}
            </figcaption>
          </figure>
        </Container>
      ) : null}

      {/* ────────────────────────────────────────────────────────────
          7. "At a glance" stats — full six-spec numerical grid.
          ──────────────────────────────────────────────────────────── */}
      <section
        id="specs"
        className="scroll-mt-24 bg-surface py-20 md:py-28 mt-24 md:mt-32"
      >
        <Container size="wide">
          <ProductSpecs specs={product.specs} />
        </Container>
      </section>

      {/* ────────────────────────────────────────────────────────────
          8. What's included — numbered feature list.
          ──────────────────────────────────────────────────────────── */}
      <Container size="wide" className="pt-20 md:pt-28">
        <ProductFeatures features={product.features[locale]} />
      </Container>

      {/* ────────────────────────────────────────────────────────────
          9. Closing CTA band.
          ──────────────────────────────────────────────────────────── */}
      <Container size="wide" className="pt-24 md:pt-32">
        <div className="relative overflow-hidden rounded-xl bg-foreground px-8 py-14 text-background md:px-16 md:py-20">
          {/* soft aqua glow top-right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <span className="text-eyebrow text-accent-tint">
                {t("product.closing.eyebrow")}
              </span>
              <h2 className="mt-5 font-heading text-[clamp(1.875rem,1.5rem+1.8vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                {t("product.closing.title")}
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:self-end">
              <p className="text-[1.0625rem] leading-[1.6] text-background/80">
                {t("product.closing.description")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button asChild variant="accent" size="lg">
                  <Link href={`/contact?product=${encodeURIComponent(slug)}`}>
                    {t("product.closing.primary")}
                  </Link>
                </Button>
                <Link
                  href="/catalog"
                  className="group inline-flex items-center gap-2 text-small text-background/80 transition-colors hover:text-background"
                >
                  <ArrowLeft
                    className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  {t("product.breadcrumb.back")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

function StatInline({
  value,
  label,
  compact = false,
}: {
  value: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 px-5 py-7 md:px-8 md:py-9">
      <dd
        className={
          compact
            ? "font-heading text-[clamp(1.25rem,1rem+0.6vw,1.625rem)] font-bold leading-tight tracking-[-0.02em] text-foreground tabular-nums"
            : "font-heading text-[clamp(2.5rem,2rem+2.5vw,4.5rem)] font-bold leading-none tracking-[-0.035em] text-foreground tabular-nums"
        }
      >
        {value}
      </dd>
      <dt className="text-eyebrow text-muted-foreground">{label}</dt>
    </div>
  );
}
