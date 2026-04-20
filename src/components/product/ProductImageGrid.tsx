"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useState } from "react";

import { productAltText } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
//build commit
const THUMB_COL_CAP = 6;

export function ProductImageGrid({
  images,
  product,
}: {
  images: string[];
  product: Product;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const activeSrc = images[safeIndex]!;
  const hasThumbs = images.length > 1;
  const colCount = Math.min(images.length, THUMB_COL_CAP);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-surface">
        <Image
          key={activeSrc}
          src={activeSrc}
          alt={productAltText(product, safeIndex)}
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover"
        />
      </div>

      {hasThumbs ? (
        <ul
          role="list"
          className="grid gap-3 md:gap-4"
          style={
            {
              gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
            } as CSSProperties
          }
        >
          {images.map((src, i) => {
            const isActive = i === safeIndex;
            return (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Afișați imaginea ${i + 1}`}
                  aria-pressed={isActive}
                  className={cn(
                    "relative block aspect-4/3 w-full cursor-pointer overflow-hidden rounded-lg bg-surface transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                      : "opacity-65 hover:opacity-100",
                  )}
                >
                  <Image
                    src={src}
                    alt={productAltText(product, i)}
                    fill
                    sizes="(min-width: 1024px) 14vw, 20vw"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
