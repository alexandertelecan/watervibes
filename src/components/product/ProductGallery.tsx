"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { productAltText } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const L = {
  frame: "Cadru",
  prev: "Imaginea anterioară",
  next: "Imaginea următoare",
  noImages: "Fotografii în pregătire",
} as const;

export function ProductGallery({
  images,
  product,
}: {
  images: string[];
  product: Product;
}) {
  const [index, setIndex] = useState(0);
  const safe = images.length > 0 ? images : [];
  const count = safe.length;
  const primaryAlt = productAltText(product, index);
  const stripLabel = productAltText(product, 0);

  const move = (delta: number) => {
    if (count === 0) return;
    setIndex((current) => (current + delta + count) % count);
  };

  const handleThumbKey = (event: React.KeyboardEvent, i: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIndex(i);
    }
  };

  const frameCurrent = String(Math.min(index + 1, Math.max(count, 1))).padStart(
    2,
    "0",
  );
  const frameTotal = String(Math.max(count, 1)).padStart(2, "0");

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
      <div className="relative order-1 flex-1">
        <div className="relative overflow-hidden rounded-xl bg-surface px-6 py-12 shadow-lg md:px-14 md:py-20 lg:py-24">
          <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-2 text-eyebrow text-muted-foreground md:left-10 md:top-10">
            <span>{L.frame}</span>
            <span className="tabular-nums text-foreground">{frameCurrent}</span>
            <span aria-hidden="true" className="h-px w-4 bg-border" />
            <span className="tabular-nums">{frameTotal}</span>
          </div>

          <div className="relative mx-auto aspect-4/5 w-full overflow-hidden">
            {safe[index] ? (
              <Image
                src={safe[index]}
                alt={primaryAlt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-eyebrow text-muted-foreground">
                {L.noImages}
              </div>
            )}
          </div>

          {count > 1 ? (
            <div className="absolute bottom-6 right-6 flex gap-2 md:bottom-10 md:right-10">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={L.prev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={L.next}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {count > 1 ? (
        <div
          role="tablist"
          aria-label={stripLabel}
          className="order-2 flex flex-row gap-3 overflow-x-auto md:w-20 md:shrink-0 md:flex-col md:overflow-x-visible"
        >
          {safe.map((src, i) => {
            const active = i === index;
            const label = String(i + 1).padStart(2, "0");
            const thumbAlt = productAltText(product, i);
            return (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={thumbAlt}
                onClick={() => setIndex(i)}
                onKeyDown={(event) => handleThumbKey(event, i)}
                className={cn(
                  "group relative flex shrink-0 flex-col items-start gap-2 focus-visible:outline-none",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-square w-20 overflow-hidden rounded-sm bg-muted transition-all duration-200",
                    active
                      ? "opacity-100 ring-2 ring-foreground ring-offset-2 ring-offset-background"
                      : "opacity-60 group-hover:opacity-90",
                    "group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
                  )}
                >
                  <Image
                    src={src}
                    alt={thumbAlt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <span
                  className={cn(
                    "text-eyebrow tabular-nums transition-colors",
                    active ? "text-accent" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
