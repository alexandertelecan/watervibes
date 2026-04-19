import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import { productAltText } from "@/lib/seo";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product; index?: number }) {
  const capacity = product.specs.capacity;
  const capacityLabel = `${capacity} persoane`;
  const priceLabel = formatPrice(product.price);

  return (
    <Link
      href={`/catalog/${product.slug}`}
      aria-label={`${product.name}, ${capacityLabel}, ${priceLabel}`}
      className="group/card block rounded-(--radius-lg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-y-1">
        <div className="relative aspect-square overflow-hidden rounded-(--radius-lg) bg-surface">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={productAltText(product)}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-eyebrow text-muted-foreground">
              {product.name}
            </div>
          )}
        </div>

        <div className="mt-4 px-1">
          <h3 className="text-h3 text-foreground">{product.name}</h3>
          <p className="mt-1 text-small text-muted-foreground">
            {capacityLabel}
          </p>
          <p className="mt-2 text-body font-semibold text-foreground tabular-nums">
            {priceLabel}
          </p>
        </div>
      </div>
    </Link>
  );
}
