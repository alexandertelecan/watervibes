"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/shared/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export type ColorOption = { value: string; hex: string; label: string };

const L = {
  showFilters: "Filtre",
  clear: "Ștergeți tot",
  price: "Preț",
  priceMinLabel: "Minim",
  priceMaxLabel: "Maxim",
  capacity: "Capacitate",
  color: "Culoare",
  persons: (n: number) => (n === 1 ? "1 persoană" : `${n} persoane`),
} as const;

function parseMulti(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}

function parseNumberParam(value: string | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

const PRICE_STEP = 500;

function roundStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

type CatalogFiltersProps = {
  priceMin: number;
  priceMax: number;
  capacities: number[];
  colors: ColorOption[];
};

export function CatalogFilters({
  priceMin,
  priceMax,
  capacities,
  colors,
}: CatalogFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const selectedCapacities = useMemo(
    () =>
      parseMulti(searchParams.get("capacity"))
        .map((v) => Number(v))
        .filter((n) => Number.isFinite(n) && capacities.includes(n)),
    [searchParams, capacities],
  );
  const availableColorValues = useMemo(
    () => colors.map((c) => c.value),
    [colors],
  );
  const selectedColors = useMemo(
    () =>
      parseMulti(searchParams.get("color")).filter((v) =>
        availableColorValues.includes(v),
      ),
    [searchParams, availableColorValues],
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

  const [priceDraft, setPriceDraft] = useState<[number, number]>([
    urlPriceMin,
    urlPriceMax,
  ]);
  const [lastUrlBounds, setLastUrlBounds] = useState<[number, number]>([
    urlPriceMin,
    urlPriceMax,
  ]);
  if (lastUrlBounds[0] !== urlPriceMin || lastUrlBounds[1] !== urlPriceMax) {
    setLastUrlBounds([urlPriceMin, urlPriceMax]);
    setPriceDraft([urlPriceMin, urlPriceMax]);
  }

  const priceActive = urlPriceMin > priceMin || urlPriceMax < priceMax;
  const activeCount =
    selectedCapacities.length + selectedColors.length + (priceActive ? 1 : 0);

  const pushParams = (next: URLSearchParams) => {
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const commitPrice = ([min, max]: [number, number]) => {
    const next = new URLSearchParams(searchParams.toString());
    if (min > priceMin) next.set("priceMin", String(min));
    else next.delete("priceMin");
    if (max < priceMax) next.set("priceMax", String(max));
    else next.delete("priceMax");
    pushParams(next);
  };

  const toggleCapacity = (value: number) => {
    const nextValues = selectedCapacities.includes(value)
      ? selectedCapacities.filter((v) => v !== value)
      : [...selectedCapacities, value];
    nextValues.sort((a, b) => a - b);
    const next = new URLSearchParams(searchParams.toString());
    if (nextValues.length) next.set("capacity", nextValues.join(","));
    else next.delete("capacity");
    pushParams(next);
  };

  const toggleColor = (value: string) => {
    const nextValues = selectedColors.includes(value)
      ? selectedColors.filter((v) => v !== value)
      : [...selectedColors, value];
    const next = new URLSearchParams(searchParams.toString());
    if (nextValues.length) next.set("color", nextValues.join(","));
    else next.delete("color");
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

  const priceRangeBody = (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-2.5">
        <PriceReadout label={L.priceMinLabel} value={priceDraft[0]} />
        <PriceReadout label={L.priceMaxLabel} value={priceDraft[1]} />
      </div>
      <Slider
        min={priceMin}
        max={priceMax}
        step={PRICE_STEP}
        minStepsBetweenThumbs={1}
        value={priceDraft}
        onValueChange={(v) => {
          const [a = priceMin, b = priceMax] = v;
          setPriceDraft([roundStep(a, PRICE_STEP), roundStep(b, PRICE_STEP)]);
        }}
        onValueCommit={(v) => {
          const [a = priceMin, b = priceMax] = v;
          commitPrice([roundStep(a, PRICE_STEP), roundStep(b, PRICE_STEP)]);
        }}
        aria-label={L.price}
      />
    </div>
  );

  const capacityBody = (
    <div className="flex flex-wrap gap-2">
      {capacities.map((n) => {
        const checked = selectedCapacities.includes(n);
        return (
          <button
            key={n}
            type="button"
            aria-pressed={checked}
            onClick={() => toggleCapacity(n)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm tabular-nums transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              checked
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface/60",
            )}
          >
            {L.persons(n)}
          </button>
        );
      })}
    </div>
  );

  const desktopBody = (
    <div className="flex flex-col">
      <header className="flex items-baseline justify-between pb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
          {L.showFilters}
        </h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {L.clear}
          </button>
        ) : null}
      </header>

      <FilterGroup title={L.price}>{priceRangeBody}</FilterGroup>
      <FilterGroup title={L.capacity}>{capacityBody}</FilterGroup>
      <FilterGroup title={L.color} isLast>
        <ColorList
          options={colors}
          selected={selectedColors}
          onToggle={toggleColor}
        />
      </FilterGroup>
    </div>
  );

  const mobileBody = (
    <div className="flex flex-col">
      <FilterGroup title={L.price}>{priceRangeBody}</FilterGroup>
      <FilterGroup title={L.capacity}>{capacityBody}</FilterGroup>
      <FilterGroup title={L.color} isLast>
        <ColorList
          options={colors}
          selected={selectedColors}
          onToggle={toggleColor}
        />
      </FilterGroup>
      {activeCount > 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="mt-8 self-start"
        >
          <X aria-hidden="true" className="size-3.5" />
          <span>{L.clear}</span>
        </Button>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <SlidersHorizontal aria-hidden="true" className="size-4" />
              <span>{L.showFilters}</span>
              {activeCount > 0 ? (
                <span className="ml-1 inline-flex size-5 min-w-5 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-accent-foreground">
                  {activeCount}
                </span>
              ) : null}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-sm overflow-y-auto p-6"
          >
            <SheetHeader className="mb-6 p-0">
              <SheetTitle>{L.showFilters}</SheetTitle>
            </SheetHeader>
            {mobileBody}
          </SheetContent>
        </Sheet>
      </div>
      <aside className="hidden lg:sticky lg:top-28 lg:block lg:w-72 lg:shrink-0">
        {desktopBody}
      </aside>
    </>
  );
}

function FilterGroup({
  title,
  children,
  isLast,
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 border-t border-border/60 py-8",
        isLast && "pb-0",
      )}
    >
      <h3 className="font-heading text-lg font-semibold tracking-[-0.015em] text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

function PriceReadout({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-(--radius-md) border border-border bg-background px-3.5 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
        {formatPrice(value)}
      </p>
    </div>
  );
}

function ColorList({
  options,
  selected,
  onToggle,
}: {
  options: ColorOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <ul className="grid grid-cols-3 gap-x-1 gap-y-4">
      {options.map((c) => {
        const isSelected = selected.includes(c.value);
        return (
          <li key={c.value}>
            <button
              type="button"
              aria-pressed={isSelected}
              aria-label={c.label}
              onClick={() => onToggle(c.value)}
              className="group/color flex w-full flex-col items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block size-11 rounded-full transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),inset_0_2px_6px_rgba(0,0,0,0.06)]",
                  isSelected
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "group-hover/color:scale-[1.06]",
                )}
                style={{ backgroundColor: c.hex }}
              />
              <span
                className={cn(
                  "text-[11px] leading-tight tracking-wide transition-colors",
                  isSelected
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground group-hover/color:text-foreground",
                )}
              >
                {c.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
