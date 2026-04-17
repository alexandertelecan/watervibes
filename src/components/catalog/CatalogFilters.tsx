"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
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
import { usePathname, useRouter } from "@/i18n/navigation";
import { COLORS, SIZES, type ProductSize } from "@/lib/constants";
import { cn } from "@/lib/utils";

function parseMulti(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}

// DESIGN.md §5 — CatalogFilters
// Desktop: sticky left rail. Size becomes a labeled 0-5 slider (0 = any,
// 1-2 = 2-person, 3 = 4-person, 4-5 = 6+). Single-select on desktop —
// multi-select on mobile via the Sheet (chips). Colors are pills with a
// small color sample inside.
// URL state stays backward-compatible: ?size=CSV&color=CSV.

const SIZE_BUCKETS: { max: number; size: ProductSize }[] = [
  { max: 2, size: "2-person" },
  { max: 3, size: "4-person" },
  { max: 5, size: "6+person" },
];

function sliderToSize(value: number): ProductSize | null {
  if (value <= 0) return null;
  const bucket = SIZE_BUCKETS.find((b) => value <= b.max);
  return bucket?.size ?? null;
}

function sizeToSlider(size: ProductSize | null): number {
  if (!size) return 0;
  if (size === "2-person") return 2;
  if (size === "4-person") return 3;
  return 4;
}

export function CatalogFilters() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const selectedSizes = useMemo(
    () => parseMulti(searchParams.get("size")),
    [searchParams],
  );
  const selectedColors = useMemo(
    () => parseMulti(searchParams.get("color")),
    [searchParams],
  );
  const activeCount = selectedSizes.length + selectedColors.length;

  const pushParams = (next: URLSearchParams) => {
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const setSizeSingle = (size: ProductSize | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (size) next.set("size", size);
    else next.delete("size");
    pushParams(next);
  };

  const toggleSize = (value: string) => {
    const nextValues = selectedSizes.includes(value)
      ? selectedSizes.filter((v) => v !== value)
      : [...selectedSizes, value];
    const next = new URLSearchParams(searchParams.toString());
    if (nextValues.length) next.set("size", nextValues.join(","));
    else next.delete("size");
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
    next.delete("size");
    next.delete("color");
    pushParams(next);
  };

  const primarySize: ProductSize | null = (selectedSizes[0] as ProductSize) ?? null;
  const currentSliderValue = sizeToSlider(primarySize);
  const currentSizeLabel = primarySize
    ? t(SIZES.find((s) => s.value === primarySize)!.labelKey)
    : t("catalog.filters.sizeAny");

  // Sidebar body — desktop uses slider; Sheet body uses chips.
  const desktopBody = (
    <div className="flex flex-col gap-10">
      <FilterGroup title={t("catalog.filters.size")}>
        <div className="flex flex-col gap-4">
          <p className="text-small text-foreground">{currentSizeLabel}</p>
          <Slider
            min={0}
            max={5}
            step={1}
            value={[currentSliderValue]}
            onValueChange={([v]) => setSizeSingle(sliderToSize(v ?? 0))}
            aria-label={t("catalog.filters.size")}
          />
          <div className="flex justify-between text-eyebrow text-muted-foreground">
            <span>{t("catalog.filters.sizeMinLabel")}</span>
            <span>{t("catalog.filters.sizeMaxLabel")}</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title={t("catalog.filters.color")}>
        <ColorPills
          selected={selectedColors}
          onToggle={(v) => toggleColor(v)}
          t={t}
        />
      </FilterGroup>

      {activeCount > 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="self-start"
        >
          <X aria-hidden="true" className="size-3.5" />
          <span>{t("catalog.filters.clear")}</span>
        </Button>
      ) : null}
    </div>
  );

  const mobileBody = (
    <div className="flex flex-col gap-8">
      <FilterGroup title={t("catalog.filters.size")}>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const checked = selectedSizes.includes(s.value);
            return (
              <button
                key={s.value}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleSize(s.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-small transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  checked
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-transparent text-foreground hover:border-accent/60",
                )}
              >
                {t(s.labelKey)}
              </button>
            );
          })}
        </div>
      </FilterGroup>
      <FilterGroup title={t("catalog.filters.color")}>
        <ColorPills
          selected={selectedColors}
          onToggle={(v) => toggleColor(v)}
          t={t}
        />
      </FilterGroup>
      {activeCount > 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="self-start"
        >
          <X aria-hidden="true" className="size-3.5" />
          <span>{t("catalog.filters.clear")}</span>
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
              <span>{t("catalog.filters.showFilters")}</span>
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
              <SheetTitle>{t("catalog.filters.showFilters")}</SheetTitle>
            </SheetHeader>
            {mobileBody}
          </SheetContent>
        </Sheet>
      </div>
      <aside className="hidden lg:sticky lg:top-28 lg:block lg:w-64 lg:flex-shrink-0">
        {desktopBody}
      </aside>
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        <h3 className="text-eyebrow text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ColorPills({
  selected,
  onToggle,
  t,
}: {
  selected: string[];
  onToggle: (value: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((c) => {
        const isSelected = selected.includes(c.value);
        const label = t(c.labelKey);
        return (
          <button
            key={c.value}
            type="button"
            aria-pressed={isSelected}
            aria-label={label}
            onClick={() => onToggle(c.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-small transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isSelected
                ? "border-accent bg-surface text-foreground"
                : "border-border bg-transparent text-foreground/80 hover:border-accent/60",
            )}
          >
            <span
              aria-hidden="true"
              className="inline-block size-3.5 rounded-full border border-border/70"
              style={{ backgroundColor: c.hex }}
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
