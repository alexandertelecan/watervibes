import Image from "next/image";
import { useTranslations } from "next-intl";

import { PriceTag } from "@/components/shared/PriceTag";
import { Link } from "@/i18n/navigation";
import { SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types/product";

// DESIGN.md §5 — ProductCard
// * Corner radius --radius-lg (24px).
// * Alternating aspect ratios: odd index 4/5 portrait, even 5/6 (taller).
// * Hover: image zoom 3%, card lifts 6px, shadow md → lg. 500ms, out-expo.
// * Fabric-swatch strip along the bottom interior edge: 60% × 8px, tinted
//   to the product color, dashed top border reads as stitched. Replaces
//   the old ColorSwatch dot.
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
  const name = product.name[locale];

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const aspect = index % 2 === 0 ? "aspect-4/5" : "aspect-5/6";

  return (
    <Link
      href={`/catalog/${product.slug}`}
      aria-label={`${name} — ${sizeLabel} — ${formattedPrice}`}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-surface shadow-md transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-lg",
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
          <span
            aria-label={colorLabel}
            role="img"
            className="absolute inset-x-0 bottom-0 mx-auto block h-2 w-3/5 border-t border-dashed border-border/80"
            style={{ backgroundColor: product.colorHex }}
          />
        </div>
        <div className="mt-5 flex flex-col gap-1.5">
          <h3 className="text-h3 text-foreground">{name}</h3>
          <div className="flex items-baseline gap-3 text-small text-muted-foreground">
            <span>{sizeLabel}</span>
            <span aria-hidden="true">·</span>
            <PriceTag price={product.price} locale={locale} />
          </div>
        </div>
      </div>
    </Link>
  );
}
