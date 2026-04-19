"use client";

import { ArrowUpDown, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COLORS, SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const CATALOG_SORT_VALUES = [
  "featured",
  "priceAsc",
  "priceDesc",
  "newest",
] as const;
export type CatalogSort = (typeof CATALOG_SORT_VALUES)[number];

const DEFAULT_SORT: CatalogSort = "featured";

const SORT_LABELS: Record<CatalogSort, string> = {
  featured: "Recomandate",
  priceAsc: "Preț: de la mic la mare",
  priceDesc: "Preț: de la mare la mic",
  newest: "Cele mai noi",
};

const L = {
  sortLabel: "Sortați după",
  active: "Filtre active",
  clear: "Ștergeți tot",
  clearOne: "Eliminați filtrul",
} as const;

function parseSort(value: string | null): CatalogSort {
  if (!value) return DEFAULT_SORT;
  return (CATALOG_SORT_VALUES as readonly string[]).includes(value)
    ? (value as CatalogSort)
    : DEFAULT_SORT;
}

function parseCsv(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}

function formatKicker(count: number): string {
  if (count === 0) return "Niciun rezultat";
  if (count === 1) return "1 jacuzzi";
  if (count < 20) return `${count} jacuzzi`;
  return `${count} de jacuzzi`;
}

function formatActiveCount(count: number): string {
  return count === 1 ? "1 activ" : `${count} active`;
}

export function CatalogToolbar({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = parseSort(searchParams.get("sort"));
  const sizes = useMemo(
    () => parseCsv(searchParams.get("size")),
    [searchParams],
  );
  const colors = useMemo(
    () => parseCsv(searchParams.get("color")),
    [searchParams],
  );
  const activeCount = sizes.length + colors.length;

  const pushParams = (next: URLSearchParams) => {
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const onSortChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (!value || value === DEFAULT_SORT) next.delete("sort");
    else next.set("sort", value);
    pushParams(next);
  };

  const removeSize = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const remaining = sizes.filter((v) => v !== value);
    if (remaining.length) next.set("size", remaining.join(","));
    else next.delete("size");
    pushParams(next);
  };

  const removeColor = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const remaining = colors.filter((v) => v !== value);
    if (remaining.length) next.set("color", remaining.join(","));
    else next.delete("color");
    pushParams(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("size");
    next.delete("color");
    pushParams(next);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <p className="text-h3 tabular-nums text-foreground">
            {formatKicker(count)}
          </p>
          {activeCount > 0 ? (
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
              {formatActiveCount(activeCount)}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-eyebrow text-muted-foreground">
            <ArrowUpDown aria-hidden="true" className="size-3.5" />
            {L.sortLabel}
          </span>
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger
              aria-label={L.sortLabel}
              className={cn(
                "h-10 gap-2 rounded-full border-foreground/15 bg-background pl-4 pr-3 text-sm font-semibold text-foreground shadow-sm",
                "hover:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "data-[size=default]:h-10",
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end" className="min-w-48">
              {CATALOG_SORT_VALUES.map((v) => (
                <SelectItem key={v} value={v}>
                  {SORT_LABELS[v]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow text-muted-foreground">{L.active}</span>
          {sizes.map((v) => {
            const entry = SIZES.find((s) => s.value === v);
            if (!entry) return null;
            return (
              <FilterChip
                key={`size-${v}`}
                label={entry.label}
                removeLabel={L.clearOne}
                onRemove={() => removeSize(v)}
              />
            );
          })}
          {colors.map((v) => {
            const entry = COLORS.find((c) => c.value === v);
            if (!entry) return null;
            return (
              <FilterChip
                key={`color-${v}`}
                label={entry.label}
                swatch={entry.hex}
                removeLabel={L.clearOne}
                onRemove={() => removeColor(v)}
              />
            );
          })}
          <button
            type="button"
            onClick={clearAll}
            className="ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {L.clear}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  label,
  swatch,
  removeLabel,
  onRemove,
}: {
  label: string;
  swatch?: string;
  removeLabel: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-1 pl-3 pr-1 text-sm text-foreground shadow-xs">
      {swatch ? (
        <span
          aria-hidden="true"
          className="inline-block size-3 rounded-full ring-1 ring-border/70"
          style={{ backgroundColor: swatch }}
        />
      ) : null}
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`${removeLabel}: ${label}`}
        className="inline-flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </span>
  );
}
