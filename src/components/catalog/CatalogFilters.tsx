"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "@/i18n/navigation";
import { COLORS, SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function parseMulti(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
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

  const toggle = (key: "size" | "color", value: string) => {
    const current = key === "size" ? selectedSizes : selectedColors;
    const nextValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    const next = new URLSearchParams(searchParams.toString());
    if (nextValues.length) {
      next.set(key, nextValues.join(","));
    } else {
      next.delete(key);
    }
    pushParams(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("size");
    next.delete("color");
    pushParams(next);
  };

  const body = (
    <div className="flex flex-col gap-8">
      <FilterGroup title={t("catalog.filters.size")}>
        <div className="flex flex-col gap-2.5">
          {SIZES.map((s) => {
            const checked = selectedSizes.includes(s.value);
            return (
              <label
                key={s.value}
                className="group flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle("size", s.value)}
                  className="h-4 w-4 cursor-pointer rounded border-border text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                <span>{t(s.labelKey)}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title={t("catalog.filters.color")}>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => {
            const selected = selectedColors.includes(c.value);
            const label = t(c.labelKey);
            return (
              <button
                key={c.value}
                type="button"
                aria-pressed={selected}
                aria-label={label}
                title={label}
                onClick={() => toggle("color", c.value)}
                className={cn(
                  "h-8 w-8 rounded-full ring-1 ring-border transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-background",
                )}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterGroup>

      {activeCount > 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="self-start"
        >
          <X aria-hidden="true" />
          {t("catalog.filters.clear")}
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
              <SlidersHorizontal aria-hidden="true" />
              <span>{t("catalog.filters.showFilters")}</span>
              {activeCount > 0 ? (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-medium text-primary-foreground">
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
            {body}
          </SheetContent>
        </Sheet>
      </div>
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:w-64 lg:flex-shrink-0">
        {body}
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
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}
