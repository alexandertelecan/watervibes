import { getLocale, getTranslations } from "next-intl/server";

import { ProductCard } from "@/components/catalog/ProductCard";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import type { Locale, Product, ProductColor } from "@/types/product";

function assertLocale(value: string): Locale {
  return (routing.locales as readonly string[]).includes(value)
    ? (value as Locale)
    : (routing.defaultLocale as Locale);
}

// DESIGN.md §5 + §7 — FeaturedProducts
// Grid of featured cards. After the first 6, DESIGN.md §7 (Goop borrow)
// breaks the grid with a full-bleed pull-quote before resuming. The
// breaker is suppressed when there are ≤6 featured products — current
// seed keeps things under 6, so the breaker will only surface once admin
// marks more.
export async function FeaturedProducts() {
  await dbConnect();
  const docs = await ProductModel.find({ featured: true })
    .sort({ order: 1 })
    .limit(12)
    .lean();

  if (docs.length === 0) {
    console.warn(
      "[FeaturedProducts] No featured products found — section omitted.",
    );
    return null;
  }

  const locale = assertLocale(await getLocale());
  const t = await getTranslations("featured");

  const products: Product[] = docs.map((doc) => ({
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
  }));

  const showBreaker = products.length > 6;
  const first = products.slice(0, 6);
  const rest = showBreaker ? products.slice(6) : [];

  return (
    <section className="py-24 md:py-32">
      <Container as="div" size="wide">
        <FadeIn underline>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lede={t("description")} />
        </FadeIn>
        <Grid products={first} locale={locale} indexOffset={0} />

        {showBreaker ? (
          <>
            <FadeIn className="my-24 md:my-32">
              <figure className="mx-auto max-w-4xl text-center">
                <blockquote
                  className="text-h1 italic text-foreground"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  &ldquo;{t("breakerQuote")}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-eyebrow text-muted-foreground">
                  {t("breakerAttribution")}
                </figcaption>
              </figure>
            </FadeIn>
            <Grid products={rest} locale={locale} indexOffset={6} />
          </>
        ) : null}

        <div className="mt-16 flex justify-center">
          <Button asChild variant="outline" size="md">
            <Link href="/catalog">
              <span>{t("viewAll")}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
              >
                <path
                  d="M1 8h12M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function Grid({
  products,
  locale,
  indexOffset,
}: {
  products: Product[];
  locale: Locale;
  indexOffset: number;
}) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
      {products.map((product, i) => (
        <FadeIn
          key={product._id}
          delay={Math.min(i, 4) * 0.08}
        >
          <ProductCard
            product={product}
            locale={locale}
            index={indexOffset + i}
          />
        </FadeIn>
      ))}
    </div>
  );
}
