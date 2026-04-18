import { Heart } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types/product";

// DESIGN.md §5 — ProductCard (catalog grid variant)
// * 16px radius, alternating aspect ratios (odd index 4/5, even 5/6).
// * Overlay chrome on the image: frosted size pill top-left, heart glyph
//   top-right. Purely decorative — the whole card is the link.
// * "Fabric-swatch strip" kept per DESIGN.md: 60% × 8px tinted to the
//   product color, dashed top border reads as stitched.
// * Below the image: name (h3), one-line tagline, "From €X,XXX" with
//   "From" as an eyebrow and price bolded.
// * Hover: image zoom 3%, card lifts 6px, shadow md → lg. 500ms out-expo.
export function ProductCard({
  product,
  locale,
  index = 0,
}: {
  product: Product;
  locale: Locale;
  index?: number;
}) {
  const t = useTranslations();
  const sizeEntry = SIZES.find((s) => s.value === product.size);
  const sizeLabel = sizeEntry ? t(sizeEntry.labelKey) : product.size;
  const colorLabel = t(`common.colors.${product.color}`);
  const fromLabel = t("catalog.card.from");
  const favoriteLabel = t("catalog.card.favorite");
  const name = product.name[locale];
  const tagline = product.tagline?.[locale];

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const aspect = index % 2 === 0 ? "aspect-[4/5]" : "aspect-[5/6]";

  return (
    <Link
      href={`/catalog/${product.slug}`}
      aria-label={`${name} — ${sizeLabel} — ${fromLabel} ${formattedPrice}`}
      className="group block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/80 transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-lg",
            aspect,
          )}
        >
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          ) : null}

          {/* top gradient veil so the chrome stays legible over any photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/20 via-black/5 to-transparent"
          />

          {/* Size pill — frosted white, top-left */}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-foreground shadow-sm backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent"
            />
            {sizeLabel}
          </span>

          {/* Heart — decorative corner mark, top-right */}
          <span
            aria-label={favoriteLabel}
            role="img"
            className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition-colors duration-200 group-hover:text-accent"
          >
            <Heart aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </span>

          {/* Fabric-swatch strip — DESIGN.md-mandated color read */}
          <span
            aria-label={colorLabel}
            role="img"
            className="absolute inset-x-0 bottom-0 mx-auto block h-2 w-3/5 border-t border-dashed border-white/70"
            style={{ backgroundColor: product.colorHex }}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-h3 text-foreground">{name}</h3>
            <span className="shrink-0 text-small text-muted-foreground">
              {colorLabel}
            </span>
          </div>
          {tagline ? (
            <p className="line-clamp-1 text-small text-muted-foreground">
              {tagline}
            </p>
          ) : null}
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-eyebrow text-muted-foreground">
              {fromLabel}
            </span>
            <span className="text-[17px] font-semibold tracking-[-0.01em] text-foreground">
              {formattedPrice}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
