"use client";

import { ImageIcon, Sparkles } from "lucide-react";
import Image from "next/image";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

import type { ProductFormValues } from "./product-form-types";

type Props = {
  values: ProductFormValues;
};

export function ProductFormPreview({ values }: Props) {
  const cover = values.images?.[0];
  const name = values.name?.trim() || "Numele produsului";
  const tagline = values.tagline?.trim() || "Sloganul apare aici, sub nume.";
  const colorName = values.color?.trim() || "—";
  const capacity = values.specs?.capacity || 0;
  const price = values.price > 0 ? formatPrice(values.price) : "— lei";
  const colorHex = values.colorHex || "#1A3BC7";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-eyebrow text-foreground">Previzualizare</span>
        </div>
        {values.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            <Sparkles aria-hidden="true" className="size-2.5" />
            Featured
          </span>
        ) : null}
      </div>

      <div className="p-4">
        {/* Catalog card mock */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
          {cover ? (
            <Image
              src={cover}
              alt=""
              fill
              unoptimized
              sizes="320px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon className="size-7" strokeWidth={1.25} />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                Fără imagine
              </span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3
            className={cn(
              "font-(family-name:--font-fraunces) text-xl font-bold tracking-tight text-foreground",
              !values.name && "text-muted-foreground/50",
            )}
          >
            {name}
          </h3>
          <p
            className={cn(
              "mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground",
              !values.tagline && "italic text-muted-foreground/50",
            )}
          >
            {tagline}
          </p>
          <p className="mt-3 text-base font-semibold text-foreground tabular-nums">
            {price}
          </p>
        </div>
      </div>

      {/* Quick facts strip */}
      <dl className="grid grid-cols-2 border-t border-border text-[11px]">
        <div className="border-r border-border px-4 py-3">
          <dt className="text-eyebrow text-muted-foreground">Capacitate</dt>
          <dd className="mt-1 font-semibold tabular-nums text-foreground">
            {capacity > 0 ? `${capacity} persoane` : "—"}
          </dd>
        </div>
        <div className="px-4 py-3">
          <dt className="text-eyebrow text-muted-foreground">Culoare</dt>
          <dd className="mt-1 flex items-center gap-2 font-medium text-foreground">
            <span
              aria-hidden="true"
              className="size-3 rounded-full ring-1 ring-inset ring-border"
              style={{ backgroundColor: colorHex }}
            />
            <span className="truncate">{colorName}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
