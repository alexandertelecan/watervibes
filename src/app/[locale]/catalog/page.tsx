import type { Metadata } from "next";
import type { SortOrder } from "mongoose";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import {
  CATALOG_SORT_VALUES,
  CatalogToolbar,
  type CatalogSort,
} from "@/components/catalog/CatalogToolbar";
import { SizeRibbon } from "@/components/catalog/SizeRibbon";
import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { PRODUCT_SIZES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import {
  alternatesFor,
  assertLocale,
  breadcrumbSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";
import type { Product, ProductColor } from "@/types/product";

type PageParams = { locale: string };
type PageSearch = { size?: string; color?: string; sort?: string };

function splitCsv(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}

function parseSort(value: string | undefined): CatalogSort {
  if (!value) return "featured";
  return (CATALOG_SORT_VALUES as readonly string[]).includes(value)
    ? (value as CatalogSort)
    : "featured";
}

function mongoSortFor(sort: CatalogSort): Record<string, SortOrder> {
  switch (sort) {
    case "priceAsc":
      return { price: 1, createdAt: -1 };
    case "priceDesc":
      return { price: -1, createdAt: -1 };
    case "newest":
      return { createdAt: -1 };
    case "featured":
    default:
      return { featured: -1, order: 1, createdAt: -1 };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.catalog" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: alternatesFor(locale, "/catalog"),
    openGraph: openGraphFor(locale, "/catalog", { title, description }),
    twitter: twitterFor({ title, description }),
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
  const sort = parseSort(sp.sort);

  await dbConnect();
  const filter: Record<string, unknown> = {};
  if (sizes.length) filter.size = { $in: sizes };
  if (colors.length) filter.color = { $in: colors };

  const docs = await ProductModel.find(filter)
    .sort(mongoSortFor(sort))
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
    <>
      {/* Intro band — editorial asymmetric header on the surface seam */}
      <section className="relative overflow-hidden border-b border-border/80 bg-surface/60 pt-16 pb-14 md:pt-24 md:pb-16">
        {/* corner watermark — oversize wordmark lives in the negative space */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-4 hidden select-none font-display text-[11rem] font-bold leading-none tracking-[-0.04em] text-foreground/4 md:block"
        >
          WV
        </div>
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-accent" />
                <span className="text-eyebrow text-accent">
                  {t("eyebrow")}
                </span>
              </div>
              <h1 className="mt-5 text-h1 text-foreground">{t("title")}</h1>
            </div>
            <p className="text-lede text-muted-foreground md:col-span-5 md:col-start-8 md:self-end">
              {t("description")}
            </p>
          </div>

          <div className="mt-10 md:mt-12">
            <Suspense fallback={null}>
              <SizeRibbon />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* Results section */}
      <Container as="section" className="py-12 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <Suspense fallback={null}>
            <CatalogFilters />
          </Suspense>

          <div className="min-w-0 flex-1">
            <Suspense fallback={null}>
              <CatalogToolbar count={products.length} />
            </Suspense>

            <div className="mt-10 md:mt-12">
              <CatalogGrid products={products} locale={locale} />
            </div>
          </div>
        </div>
      </Container>

      <JsonLd
        data={breadcrumbSchema(
          [{ name: t("title"), path: "/catalog" }],
          locale,
        )}
      />
    </>
  );
}
