import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ColorSwatch } from "@/components/product/ColorSwatch";
import { ProductFeatures } from "@/components/product/ProductFeatures";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { QuoteCTA } from "@/components/product/QuoteCTA";
import { Container } from "@/components/shared/Container";
import { PriceTag } from "@/components/shared/PriceTag";
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
  return {
    title: product.name[locale],
    description: product.tagline[locale],
    openGraph: {
      title: product.name[locale],
      description: product.tagline[locale],
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
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

  return (
    <Container as="article" className="py-12 md:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} alt={product.name[locale]} />
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <ColorSwatch
              hex={product.colorHex}
              label={colorLabel}
              size="sm"
            />
            <span>{colorLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{sizeLabel}</span>
          </div>
          <h1 className="font-heading text-4xl tracking-tight text-foreground md:text-5xl">
            {product.name[locale]}
          </h1>
          <p className="text-lg text-muted-foreground">
            {product.tagline[locale]}
          </p>
          <PriceTag
            price={product.price}
            locale={locale}
            size="lg"
            weight="semibold"
          />
          <div className="flex flex-col gap-4 text-base text-foreground/85">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <QuoteCTA slug={product.slug} />
          <div
            id="specs"
            className="mt-8 flex flex-col gap-12 border-t border-border pt-10 scroll-mt-24"
          >
            <ProductSpecs specs={product.specs} />
            <ProductFeatures features={product.features[locale]} />
          </div>
        </div>
      </div>
    </Container>
  );
}
