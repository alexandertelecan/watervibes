import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SIZES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { productAltText } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const SIZE_LABELS: Record<string, string> = {
  "2-person": "2 persoane",
  "4-person": "4 persoane",
  "6+person": "6+ persoane",
};

const COLOR_LABELS: Record<string, string> = {
  white: "Alb",
  graphite: "Grafit",
  teak: "Teak",
  pearl: "Perlat",
  midnight: "Midnight",
};

const FAVORITE_LABEL = "Salvați pentru mai târziu";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const sizeEntry = SIZES.find((s) => s.value === product.size);
  const sizeLabel = sizeEntry
    ? (SIZE_LABELS[sizeEntry.value] ?? sizeEntry.value)
    : product.size;
  const colorLabel = COLOR_LABELS[product.color] ?? product.color;

  const formattedPrice = formatPrice(product.price);

  const aspect = index % 2 === 0 ? "aspect-[4/5]" : "aspect-[5/6]";

  return (
    <Link
      href={`/catalog/${product.slug}`}
      aria-label={`${product.name}, ${sizeLabel}, ${formattedPrice}`}
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
              alt={productAltText(product)}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          ) : null}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/20 via-black/5 to-transparent"
          />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-foreground shadow-sm backdrop-blur-sm">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {sizeLabel}
          </span>

          <span
            aria-label={FAVORITE_LABEL}
            role="img"
            className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition-colors duration-200 group-hover:text-accent"
          >
            <Heart aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </span>

          <span
            aria-label={colorLabel}
            role="img"
            className="absolute inset-x-0 bottom-0 mx-auto block h-2 w-3/5 border-t border-dashed border-white/70"
            style={{ backgroundColor: product.colorHex }}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-h3 text-foreground">{product.name}</h3>
            <span className="shrink-0 text-small text-muted-foreground">
              {colorLabel}
            </span>
          </div>
          {product.tagline ? (
            <p className="line-clamp-1 text-small text-muted-foreground">
              {product.tagline}
            </p>
          ) : null}
          <p className="mt-1 text-[17px] font-semibold tracking-[-0.01em] text-foreground tabular-nums">
            {formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}
