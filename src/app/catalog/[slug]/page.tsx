import {
  ArrowLeft,
  ArrowRight,
  Check,
  Droplets,
  Ruler,
  Scale,
  Users,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FloatingShape } from "@/components/home/FloatingShape";
import { ProductFeatures } from "@/components/product/ProductFeatures";
import { ProductImageGrid } from "@/components/product/ProductImageGrid";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { COLORS, SIZES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { ProductModel } from "@/lib/models/Product";
import {
  alternatesFor,
  breadcrumbSchema,
  openGraphFor,
  productMetaDescription,
  productMetaTitle,
  productSchema,
  twitterFor,
} from "@/lib/seo";
import type { Product, ProductColor } from "@/types/product";

type PageParams = { slug: string };

const L = {
  backToCatalog: "Catalog",
  seats: "locuri",
  jetsUnit: "duze inox",
  powerUnit: "consum maxim",
  footprint: "amprentă",
  weightEmpty: "greutate carcasă",
  weightFull: "greutate cu apă",
  priceEyebrow: "Preț de la",
  priceIncludes: "TVA și livrare în România incluse.",
  colorLabel: "Culoare",
  capacityLabel: "Capacitate",
  ctaPrimary: "Cereți o ofertă",
  trustResponse: "Garanție 5 ani",
  trustObligations: "Transport gratuit",
  trustDelivery: "Livrare în maxim 72 de ore",
} as const;

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

async function loadSimilarProducts(
  capacity: number,
  color: string,
  excludeSlug: string,
  limit = 3,
): Promise<Product[]> {
  await dbConnect();
  const docs = await ProductModel.find({
    slug: { $ne: excludeSlug },
    $or: [{ "specs.capacity": capacity }, { color }],
  })
    .sort({ order: 1, createdAt: -1 })
    .limit(limit)
    .lean();
  return docs.map((doc) => ({
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
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const docs = await ProductModel.find().select("slug").lean();
    return docs.map((doc) => ({ slug: doc.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return {};

  const title = productMetaTitle(product);
  const description = productMetaDescription(product);
  const path = `/catalog/${slug}`;

  return {
    title,
    description,
    alternates: alternatesFor(path),
    openGraph: openGraphFor(path, { title, description, type: "article" }),
    twitter: twitterFor({ title, description }),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  const product = await loadProduct(slug);
  if (!product) {
    notFound();
  }

  const similarProducts = await loadSimilarProducts(
    product.specs.capacity,
    product.color,
    product.slug,
  );

  const sizeEntry = SIZES.find((s) => s.value === product.size);
  const sizeLabel = sizeEntry ? sizeEntry.label : product.size;
  const colorEntry = COLORS.find((c) => c.value === product.color);
  const colorLabel = colorEntry ? colorEntry.label : product.color;

  const paragraphs = product.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const priceFormatted = formatPrice(product.price);

  return (
    <article className="pb-28">
      <section className="relative isolate overflow-hidden bg-accent py-20 text-accent-foreground md:py-28">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:-top-10 md:-right-10 md:h-40 md:w-40"
          range={180}
          rotate={-22}
          bob={13}
          bobDuration={5.6}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="120"
              cy="120"
              r="72"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden size-2 rounded-full bg-accent-foreground/50 md:block md:top-16 md:left-[46%]"
          range={90}
          bob={11}
          bobDuration={3.8}
        >
          <span className="block h-full w-full" />
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/20 md:block md:-bottom-16 md:-left-12 md:h-56 md:w-56"
          range={140}
          rotate={18}
          bob={10}
          bobDuration={6.8}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle
              cx="120"
              cy="120"
              r="112"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="120"
              cy="120"
              r="82"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="120"
              cy="120"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="120"
              cy="120"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/30 md:block md:bottom-20 md:right-[16%] md:h-12 md:w-10"
          range={120}
          rotate={10}
          bob={9}
          bobDuration={4.4}
        >
          <svg viewBox="0 0 40 48" className="h-full w-full">
            <path
              d="M20 4 C 20 4, 6 22, 6 32 A 14 14 0 0 0 34 32 C 34 22, 20 4, 20 4 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:bottom-10 md:left-[38%] md:h-8 md:w-40"
          range={100}
          bob={7}
          bobDuration={5.2}
        >
          <svg
            viewBox="0 0 160 32"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16 Q 20 4 40 16 T 80 16 T 120 16 T 160 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden size-1.5 rounded-full bg-accent-foreground/60 md:block md:bottom-24 md:right-[8%]"
          range={70}
          bob={9}
          bobDuration={3.2}
        >
          <span className="block h-full w-full" />
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/30 md:block md:top-10 md:left-[22%] md:h-14 md:w-14"
          range={130}
          bob={9}
          bobDuration={5.8}
        >
          <svg viewBox="0 0 56 56" className="h-full w-full">
            <circle
              cx="16"
              cy="36"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="34"
              cy="22"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="44"
              cy="42"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <FadeIn>
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 text-small text-accent-foreground/70 transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:text-accent-foreground"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              {L.backToCatalog}
            </Link>
          </FadeIn>

          <div className="mt-10 grid items-end gap-10 md:mt-14 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <h1 className="text-display text-accent-foreground">
                {product.name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
              <p className="text-lede text-accent-foreground/80">
                {product.tagline}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <Container size="wide" className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="md:col-span-8">
            <ProductImageGrid images={product.images} product={product} />

            <h2 className="mt-12 font-heading text-[clamp(1.875rem,1.5rem+1.8vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:mt-16">
              {product.name}
            </h2>

            <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-[1.7] text-foreground/90 md:mt-10">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <dl
              id="specs"
              className="mt-16 grid scroll-mt-24 grid-cols-2 gap-x-6 gap-y-8 md:mt-24 md:grid-cols-3 md:gap-x-8 md:gap-y-10"
            >
              <StatCard
                Icon={Users}
                value={String(product.specs.capacity)}
                label={L.seats}
              />
              <StatCard
                Icon={Droplets}
                value={String(product.specs.jets)}
                label={L.jetsUnit}
              />
              <StatCard
                Icon={Zap}
                value={product.specs.power}
                label={L.powerUnit}
              />
              <StatCard
                Icon={Ruler}
                value={product.specs.dimensions}
                label={L.footprint}
              />
              <StatCard
                Icon={Scale}
                value={product.specs.weightEmpty}
                label={L.weightEmpty}
              />
              <StatCard
                Icon={Waves}
                value={product.specs.weightFull}
                label={L.weightFull}
              />
            </dl>

            <div className="mt-16 md:mt-24">
              <ProductFeatures features={product.features} />
            </div>
          </div>

          <aside className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(14,26,36,0.04),0_18px_40px_-24px_rgba(14,26,36,0.18)]">
                <FloatingShape
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 text-accent/15"
                  range={60}
                  rotate={-10}
                  bob={6}
                  bobDuration={5.6}
                >
                  <svg viewBox="0 0 128 128" className="h-full w-full">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="36"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </FloatingShape>

                <div className="relative px-7 pb-7 pt-7 md:px-8 md:pt-8">
                  <span className="text-eyebrow text-accent">
                    {L.priceEyebrow}
                  </span>
                  <p className="mt-3 font-heading text-[clamp(2.5rem,2.1rem+1.2vw,3.25rem)] font-bold leading-none tracking-[-0.035em] text-foreground tabular-nums">
                    {priceFormatted}
                  </p>
                  <p className="mt-3 text-small text-muted-foreground">
                    {L.priceIncludes}
                  </p>
                </div>

                <dl className="relative grid grid-cols-2 border-y border-border">
                  <div className="px-7 py-5 md:px-8">
                    <dt className="text-eyebrow text-muted-foreground">
                      {L.colorLabel}
                    </dt>
                    <dd className="mt-2 flex items-center gap-2.5 text-sm font-medium text-foreground">
                      <span
                        aria-hidden="true"
                        className="size-3.5 rounded-full ring-1 ring-black/10"
                        style={{ backgroundColor: product.colorHex }}
                      />
                      {colorLabel}
                    </dd>
                  </div>
                  <div className="border-l border-border px-7 py-5 md:px-8">
                    <dt className="text-eyebrow text-muted-foreground">
                      {L.capacityLabel}
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-foreground">
                      {sizeLabel}
                    </dd>
                  </div>
                </dl>

                <div className="relative px-7 pb-7 pt-6 md:px-8 md:pb-8">
                  <Button asChild variant="accent" size="lg" className="w-full">
                    <Link href={`/contact?product=${encodeURIComponent(slug)}`}>
                      <span>{L.ctaPrimary}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
                      />
                    </Link>
                  </Button>
                  <ul className="mt-6 space-y-2.5 text-small text-muted-foreground">
                    {[L.trustResponse, L.trustObligations, L.trustDelivery].map(
                      (item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-accent"
                            strokeWidth={2.5}
                          />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {similarProducts.length > 0 ? (
        <Container size="wide" className="pt-24 md:pt-32">
          <SimilarProducts
            products={similarProducts}
            capacity={product.specs.capacity}
            colorLabel={colorLabel}
          />
        </Container>
      ) : null}

      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: L.backToCatalog, path: "/catalog" },
            { name: product.name, path: `/catalog/${slug}` },
          ]),
        ]}
      />
    </article>
  );
}

function StatCard({
  Icon,
  value,
  label,
}: {
  Icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3.5">
      <Icon
        aria-hidden="true"
        className="size-7 text-accent/90"
        strokeWidth={1.5}
      />
      <dd className="flex min-h-[2lh] flex-col justify-end font-heading text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] font-bold leading-tight tracking-[-0.02em] text-foreground tabular-nums">
        {value}
      </dd>
      <dt className="text-eyebrow text-muted-foreground">{label}</dt>
    </div>
  );
}
