"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

// DESIGN.md §5 — ProductGallery (Aesop echo)
// Primary image floats on a --surface panel with huge py margin.
// Desktop: 64px vertical filmstrip on the right (flex-col, gap-3).
// Mobile: horizontal strip under the primary.
// No lightbox — the hero image is already the feature.
export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const safe = images.length > 0 ? images : [];

  const move = (delta: number) => {
    if (safe.length === 0) return;
    setIndex((current) => (current + delta + safe.length) % safe.length);
  };

  const handleKey = (event: React.KeyboardEvent, i: number) => {
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

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-6">
      <div className="order-1 flex-1 rounded-xl bg-surface px-6 py-12 shadow-lg md:py-20 lg:py-24">
        <div className="relative mx-auto aspect-4/5 w-full overflow-hidden">
          {safe[index] ? (
            <Image
              src={safe[index]}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          ) : null}
        </div>
      </div>

      {safe.length > 1 ? (
        <div
          role="tablist"
          aria-label={alt}
          className="order-2 flex flex-row gap-3 overflow-x-auto md:flex-col md:w-16 md:shrink-0 md:overflow-x-visible"
        >
          {safe.map((src, i) => {
            const active = i === index;
            return (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`${alt} — ${i + 1}`}
                onClick={() => setIndex(i)}
                onKeyDown={(event) => handleKey(event, i)}
                className={cn(
                  "relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm bg-muted transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
