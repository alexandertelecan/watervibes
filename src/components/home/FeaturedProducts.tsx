import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Link } from "@/i18n/navigation";
import { SIZES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { assertLocale, productAltText } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { ProductColor } from "@/types/product";

// Airbnb-style listing cards — DESIGN.md §5
// 3 products (admin's `featured: true` first, backfilled from most-recent
// to always fill the row). Each card: image-dominant, rounded 16px, a
// size pill top-left, a decorative heart icon top-right, and under the
// image a tight metadata stack (name, size · color · color-dot, price,
// "View"). Hover lifts 4px and zooms the image 3%.
export async function FeaturedProducts() {
  await dbConnect();

  const featured = await ProductModel.find({ featured: true })
    .sort({ order: 1 })
    .limit(3)
    .lean();

  let products = featured;
  if (products.length < 3) {
    const filler = await ProductModel.find({
      _id: { $nin: featured.map((p) => p._id) },
    })
      .sort({ createdAt: -1 })
      .limit(3 - products.length)
      .lean();
    products = [...products, ...filler];
  }

  if (products.length === 0) {
    return null;
  }

  const locale = assertLocale(await getLocale());
  const t = await getTranslations("featured");
  const tRoot = await getTranslations();

  const priceFmt = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <section className="py-20 md:py-28">
      <Container as="div" size="wide">
        <FadeIn underline>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            lede={t("description")}
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-10">
          {products.map((doc, i) => {
            const name = doc.name[locale];
            const tagline = doc.tagline[locale];
            const sizeEntry = SIZES.find((s) => s.value === doc.size);
            const sizeLabel = sizeEntry ? tRoot(sizeEntry.labelKey) : doc.size;
            const colorLabel = tRoot(`common.colors.${doc.color}`);
            const priceLabel = priceFmt.format(doc.price);
            const altText = productAltText(
              {
                name: doc.name,
                size: doc.size,
                color: doc.color as ProductColor,
                specs: { capacity: doc.specs.capacity },
              },
              locale,
              tRoot,
            );

            return (
              <FadeIn
                key={String(doc._id)}
                delay={Math.min(i, 3) * 0.08}
              >
                <ListingCard
                  href={`/catalog/${doc.slug}`}
                  name={name}
                  tagline={tagline}
                  sizeLabel={sizeLabel}
                  colorLabel={colorLabel}
                  colorHex={doc.colorHex}
                  image={doc.images?.[0]}
                  imageAlt={altText}
                  priceLabel={priceLabel}
                  fromLabel={t("fromPrice")}
                  saveLabel={t("save")}
                />
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center md:mt-20">
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

function ListingCard({
  href,
  name,
  tagline,
  sizeLabel,
  colorLabel,
  colorHex,
  image,
  imageAlt,
  priceLabel,
  fromLabel,
  saveLabel,
}: {
  href: string;
  name: string;
  tagline: string;
  sizeLabel: string;
  colorLabel: string;
  colorHex: string;
  image?: string;
  imageAlt: string;
  priceLabel: string;
  fromLabel: string;
  saveLabel: string;
}) {
  return (
    <Link
      href={href as "/catalog/[slug]"}
      aria-label={`${name}, ${sizeLabel} · ${priceLabel}`}
      className="group/card block rounded-(--radius-lg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-y-1">
        <div className="relative aspect-4/5 overflow-hidden rounded-(--radius-lg) bg-surface">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-eyebrow text-muted-foreground">
              {name}
            </div>
          )}

          {/* Size pill top-left — Airbnb "Guest favorite" position */}
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-background/95 px-3 py-1 text-small font-semibold text-foreground shadow-sm backdrop-blur-sm">
            {sizeLabel}
          </span>

          {/* Heart icon top-right — decorative "save" cue */}
          <span
            aria-hidden="true"
            title={saveLabel}
            className={cn(
              "absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full",
              "bg-background/40 text-background backdrop-blur-sm",
              "transition-colors duration-200 group-hover/card:bg-background/60",
            )}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </span>
        </div>

        <div className="mt-4 px-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-h3 text-foreground">{name}</h3>
            <span
              aria-hidden="true"
              title={colorLabel}
              className="mt-1.5 inline-block size-3.5 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: colorHex }}
            />
          </div>
          {tagline ? (
            <p className="mt-1 line-clamp-2 text-small text-muted-foreground">
              {tagline}
            </p>
          ) : null}
          <p className="mt-3 text-body">
            <span className="text-muted-foreground">{fromLabel}</span>{" "}
            <span className="font-semibold text-foreground">{priceLabel}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
