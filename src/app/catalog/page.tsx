import type { Metadata } from "next";
import type { SortOrder } from "mongoose";
import { Suspense } from "react";

import {
  CatalogFilters,
  type ColorOption,
} from "@/components/catalog/CatalogFilters";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import {
  CATALOG_SORT_VALUES,
  type CatalogSort,
} from "@/components/catalog/catalog-sort";
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { FloatingShape } from "@/components/home/FloatingShape";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { COLORS } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import {
  alternatesFor,
  breadcrumbSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";
import type { Product, ProductColor } from "@/types/product";

type PageSearch = {
  capacity?: string;
  color?: string;
  priceMin?: string;
  priceMax?: string;
  sort?: string;
};

const TITLE = "Catalog";
const DESCRIPTION =
  "Explorați colecția noastră de jacuzzi. De la variante intime, pentru două persoane, până la modele ample pentru seri cu prietenii. Filtrați după dimensiune sau culoare și găsiți jacuzziul care se potrivește spațiului dumneavoastră.";

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

  await dbConnect();

  const [priceAgg, rawCapacities, colorAgg] = await Promise.all([
    ProductModel.aggregate<{ min: number; max: number }>([
      { $group: { _id: null, min: { $min: "$price" }, max: { $max: "$price" } } },
    ]),
    ProductModel.distinct("specs.capacity") as Promise<number[]>,
    ProductModel.aggregate<{ value: string; hex: string }>([
      { $sort: { featured: -1, order: 1, createdAt: -1 } },
      { $group: { _id: "$color", hex: { $first: "$colorHex" } } },
      { $project: { _id: 0, value: "$_id", hex: 1 } },
      { $sort: { value: 1 } },
    ]),
  ]);

  const priceBounds = priceAgg[0] ?? { min: 0, max: 0 };
  const availableCapacities = rawCapacities
    .filter((n): n is number => typeof n === "number" && Number.isFinite(n))
    .sort((a, b) => a - b);

  const availableColors: ColorOption[] = colorAgg.map((c) => {
    const known = COLORS.find((k) => k.value === c.value);
    const label =
      known?.label ??
      (c.value ? c.value.charAt(0).toUpperCase() + c.value.slice(1) : c.value);
    return { value: c.value, hex: c.hex, label };
  });
  const availableColorValues = availableColors.map((c) => c.value);

  const capacities = splitCsv(sp.capacity)
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && availableCapacities.includes(n));
  const colors = splitCsv(sp.color).filter((c) =>
    availableColorValues.includes(c),
  );
  const sort = parseSort(sp.sort);

  const parsedPriceMin = Number(sp.priceMin);
  const parsedPriceMax = Number(sp.priceMax);
  const priceMin =
    Number.isFinite(parsedPriceMin) && parsedPriceMin > priceBounds.min
      ? Math.min(parsedPriceMin, priceBounds.max)
      : priceBounds.min;
  const priceMax =
    Number.isFinite(parsedPriceMax) && parsedPriceMax < priceBounds.max
      ? Math.max(parsedPriceMax, priceBounds.min)
      : priceBounds.max;

  const filter: Record<string, unknown> = {};
  if (capacities.length) filter["specs.capacity"] = { $in: capacities };
  if (colors.length) filter.color = { $in: colors };
  if (priceMin > priceBounds.min || priceMax < priceBounds.max) {
    filter.price = { $gte: priceMin, $lte: priceMax };
  }

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
            <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
          <svg viewBox="0 0 160 32" className="h-full w-full" preserveAspectRatio="none">
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
            <circle cx="16" cy="36" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="34" cy="22" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="44" cy="42" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <h1 className="text-display text-accent-foreground">{TITLE}</h1>
            </FadeIn>
            <FadeIn
              delay={0.1}
              className="md:col-span-5 md:col-start-8"
            >
              <p className="text-lede text-accent-foreground/80">{DESCRIPTION}</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <Container as="section" className="py-12 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <Suspense fallback={null}>
            <CatalogFilters
              priceMin={priceBounds.min}
              priceMax={priceBounds.max}
              capacities={availableCapacities}
              colors={availableColors}
            />
          </Suspense>

          <div className="min-w-0 flex-1">
            <Suspense fallback={null}>
              <CatalogToolbar
                count={products.length}
                priceMin={priceBounds.min}
                priceMax={priceBounds.max}
                colors={availableColors}
              />
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
