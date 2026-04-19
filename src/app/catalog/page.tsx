import type { Metadata } from "next";
import type { SortOrder } from "mongoose";
import { Suspense } from "react";

import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import {
  CATALOG_SORT_VALUES,
  CatalogToolbar,
  type CatalogSort,
} from "@/components/catalog/CatalogToolbar";
import { SizeRibbon } from "@/components/catalog/SizeRibbon";
import { FloatingShape } from "@/components/home/FloatingShape";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { PRODUCT_SIZES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import {
  alternatesFor,
  breadcrumbSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";
import type { Product, ProductColor } from "@/types/product";

type PageSearch = { size?: string; color?: string; sort?: string };

const TITLE = "Modele";
const DESCRIPTION =
  "Selecție de jacuzzi pentru 2 până la 10 persoane, disponibile în dimensiuni și finisaje diferite. Fiecare model este gândit pentru utilizare reală, cu hidromasaj eficient, funcționare stabilă și integrare ușoară în orice spațiu.";

const META_TITLE = "Modele Jacuzzi Exterior · Colecția WaterVibe";
const META_DESCRIPTION =
  "Jacuzzi exterior pentru două, patru sau șase persoane. Modele cu hidromasaj în mai multe finisaje. Filtrați după dimensiune și culoare, vedeți specificațiile, primiți o ofertă cu livrare în România.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor("/catalog"),
  openGraph: openGraphFor("/catalog", {
    title: META_TITLE,
    description: META_DESCRIPTION,
  }),
  twitter: twitterFor({ title: META_TITLE, description: META_DESCRIPTION }),
};

function splitCsv(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
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

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<PageSearch>;
}) {
  const sp = await searchParams;

  const sizes = splitCsv(sp.size).filter((s) =>
    (PRODUCT_SIZES as readonly string[]).includes(s),
  );
  const colors = splitCsv(sp.color);
  const sort = parseSort(sp.sort);

  await dbConnect();
  const filter: Record<string, unknown> = {};
  if (sizes.length) filter.size = { $in: sizes };
  if (colors.length) filter.color = { $in: colors };

  const docs = await ProductModel.find(filter).sort(mongoSortFor(sort)).lean();

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
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent/20 md:block md:-top-10 md:-right-10 md:h-40 md:w-40"
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
          className="pointer-events-none absolute hidden size-2 rounded-full bg-accent/40 md:block md:top-16 md:left-[46%]"
          range={90}
          bob={11}
          bobDuration={3.8}
        >
          <span className="block h-full w-full" />
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <h1 className="text-display text-foreground">{TITLE}</h1>
            </FadeIn>
            <FadeIn
              delay={0.1}
              className="md:col-span-5 md:col-start-8"
            >
              <p className="text-lede text-muted-foreground">{DESCRIPTION}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.18} className="mt-12 md:mt-16">
            <Suspense fallback={null}>
              <SizeRibbon />
            </Suspense>
          </FadeIn>
        </Container>
      </section>

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
              <CatalogGrid products={products} />
            </div>
          </div>
        </div>
      </Container>

      <JsonLd data={breadcrumbSchema([{ name: TITLE, path: "/catalog" }])} />
    </>
  );
}
