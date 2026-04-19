"use client";

import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronDown,
  Clock,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import type { ColorOption } from "@/components/catalog/CatalogFilters";
import {
  CATALOG_SORT_VALUES,
  DEFAULT_SORT,
  SORT_LABELS,
  type CatalogSort,
} from "@/components/catalog/catalog-sort";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const SORT_ICONS: Record<CatalogSort, LucideIcon> = {
  featured: Sparkles,
  priceAsc: ArrowUpNarrowWide,
  priceDesc: ArrowDownNarrowWide,
  newest: Clock,
};

const L = {
  sortLabel: "Sortați după",
  sortPrefix: "Sortați",
  active: "Filtre active",
  clear: "Ștergeți tot",
  clearOne: "Eliminați filtrul",
  persons: (n: number) => (n === 1 ? "1 persoană" : `${n} persoane`),
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

function parseNumberParam(value: string | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
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

type CatalogToolbarProps = {
  count: number;
  priceMin: number;
  priceMax: number;
  colors: ColorOption[];
};

export function CatalogToolbar({
  count,
  priceMin,
  priceMax,
  colors: colorOptions,
}: CatalogToolbarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = parseSort(searchParams.get("sort"));
  const capacities = useMemo(
    () =>
      parseCsv(searchParams.get("capacity"))
        .map((v) => Number(v))
        .filter((n) => Number.isFinite(n)),
    [searchParams],
  );
  const colors = useMemo(
    () => parseCsv(searchParams.get("color")),
    [searchParams],
  );

  const urlPriceMinRaw = parseNumberParam(searchParams.get("priceMin"));
  const urlPriceMaxRaw = parseNumberParam(searchParams.get("priceMax"));
  const urlPriceMin =
    urlPriceMinRaw !== null && urlPriceMinRaw > priceMin
      ? Math.min(urlPriceMinRaw, priceMax)
      : priceMin;
  const urlPriceMax =
    urlPriceMaxRaw !== null && urlPriceMaxRaw < priceMax
      ? Math.max(urlPriceMaxRaw, priceMin)
      : priceMax;
  const priceActive = urlPriceMin > priceMin || urlPriceMax < priceMax;

  const activeCount =
    capacities.length + colors.length + (priceActive ? 1 : 0);

  const pushParams = (next: URLSearchParams) => {
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const removeCapacity = (value: number) => {
    const next = new URLSearchParams(searchParams.toString());
    const remaining = capacities.filter((v) => v !== value);
    if (remaining.length) next.set("capacity", remaining.join(","));
    else next.delete("capacity");
    pushParams(next);
  };

  const removeColor = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const remaining = colors.filter((v) => v !== value);
    if (remaining.length) next.set("color", remaining.join(","));
    else next.delete("color");
    pushParams(next);
  };

  const removePrice = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("priceMin");
    next.delete("priceMax");
    pushParams(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("capacity");
    next.delete("color");
    next.delete("priceMin");
    next.delete("priceMax");
    pushParams(next);
  };

  const onSortChange = (value: string) => {
    if (!(CATALOG_SORT_VALUES as readonly string[]).includes(value)) return;
    const next = new URLSearchParams(searchParams.toString());
    if (value === DEFAULT_SORT) next.delete("sort");
    else next.set("sort", value);
    pushParams(next);
  };

  const ActiveSortIcon = SORT_ICONS[sort];

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

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={L.sortLabel}
            className={cn(
              "group/sort inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background pl-4 pr-3 text-sm text-foreground shadow-sm transition-colors",
              "hover:border-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "data-[state=open]:border-foreground",
            )}
          >
            <ActiveSortIcon aria-hidden="true" className="size-4 text-accent" />
            <span className="hidden text-muted-foreground sm:inline">
              {L.sortPrefix}
            </span>
            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-border sm:inline-block"
            />
            <span className="font-semibold">{SORT_LABELS[sort]}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/sort:rotate-180"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-60 rounded-(--radius-lg) p-1.5 shadow-lg"
          >
            <DropdownMenuRadioGroup value={sort} onValueChange={onSortChange}>
              {CATALOG_SORT_VALUES.map((v) => {
                const Icon = SORT_ICONS[v];
                const active = v === sort;
                return (
                  <DropdownMenuRadioItem
                    key={v}
                    value={v}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-md py-2.5 pl-3 pr-9 text-sm text-foreground transition-colors",
                      active ? "bg-accent/5 font-semibold" : "font-medium",
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        active ? "text-accent" : "text-muted-foreground",
                      )}
                    />
                    <span>{SORT_LABELS[v]}</span>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow text-muted-foreground">{L.active}</span>
          {priceActive ? (
            <PriceChip
              min={urlPriceMin}
              max={urlPriceMax}
              showMin={urlPriceMin > priceMin}
              showMax={urlPriceMax < priceMax}
              removeLabel={L.clearOne}
              onRemove={removePrice}
            />
          ) : null}
          {capacities.map((n) => (
            <FilterChip
              key={`capacity-${n}`}
              label={L.persons(n)}
              removeLabel={L.clearOne}
              onRemove={() => removeCapacity(n)}
            />
          ))}
          {colors.map((v) => {
            const entry = colorOptions.find((c) => c.value === v);
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

function PriceChip({
  min,
  max,
  showMin,
  showMax,
  removeLabel,
  onRemove,
}: {
  min: number;
  max: number;
  showMin: boolean;
  showMax: boolean;
  removeLabel: string;
  onRemove: () => void;
}) {
  const ariaLabel = `${removeLabel}: ${formatPrice(min)} ${formatPrice(max)}`;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-3 pr-1 text-foreground shadow-xs">
      <span className="inline-flex items-baseline gap-3 text-sm tabular-nums">
        {showMin ? (
          <span className="inline-flex items-baseline gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Min
            </span>
            <span>{formatPrice(min)}</span>
          </span>
        ) : null}
        {showMax ? (
          <span className="inline-flex items-baseline gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Max
            </span>
            <span>{formatPrice(max)}</span>
          </span>
        ) : null}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={ariaLabel}
        className="inline-flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </span>
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
