import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { routing } from "@/i18n/routing";
import { PRODUCT_SIZES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import type { Locale, Product, ProductColor } from "@/types/product";

type PageParams = { locale: string };
type PageSearch = { size?: string; color?: string };

function splitCsv(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}

function assertLocale(value: string): Locale {
  return (routing.locales as readonly string[]).includes(value)
    ? (value as Locale)
    : (routing.defaultLocale as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearch>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = assertLocale(rawLocale);
  const sp = await searchParams;

  const t = await getTranslations("catalog");

  const sizes = splitCsv(sp.size).filter((s) =>
    (PRODUCT_SIZES as readonly string[]).includes(s),
  );
  const colors = splitCsv(sp.color);

  await dbConnect();
  const filter: Record<string, unknown> = {};
  if (sizes.length) filter.size = { $in: sizes };
  if (colors.length) filter.color = { $in: colors };

  const docs = await ProductModel.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .lean();

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

  return (
    <Container as="section" className="py-16 md:py-24">
      <SectionHeading title={t("title")} description={t("description")} />
      <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <Suspense fallback={null}>
          <CatalogFilters />
        </Suspense>
        <div className="flex-1">
          <CatalogGrid products={products} locale={locale} />
        </div>
      </div>
    </Container>
  );
}
