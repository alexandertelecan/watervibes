"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

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
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIndex(i);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-accent/40">
        {safe[index] ? (
          <Image
            src={safe[index]}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      {safe.length > 1 ? (
        <div
          className="flex gap-3 overflow-x-auto md:grid md:grid-cols-4"
          role="tablist"
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
                  "relative aspect-[4/3] w-24 flex-shrink-0 overflow-hidden rounded-xl bg-accent/40 ring-1 ring-border transition-all md:w-auto",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
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
