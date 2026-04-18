"use client";

import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { SIZES, type ProductSize } from "@/lib/constants";
import { cn } from "@/lib/utils";

// DESIGN.md §5 / §7 — the Airbnb-style "category ribbon" move. A horizontal
// row of size pills under the intro that acts as a quick single-select
// filter. Multi-select and nuance still live in the sidebar; this is the
// "just tap a size" shortcut. Horizontally scrollable on mobile.
//
// URL state stays CSV to match the sidebar: `size=2-person,4-person`. This
// ribbon writes a *single* value, which is how most people will use it.

const DOT_COUNTS: Record<ProductSize, number> = {
  "2-person": 1,
  "4-person": 2,
  "6+person": 3,
};

function SizeDots({ size }: { size: ProductSize }) {
  const count = DOT_COUNTS[size];
  return (
    <span aria-hidden="true" className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block size-1.5 rounded-full bg-current opacity-70"
        />
      ))}
    </span>
  );
}

export function SizeRibbon() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const active = useMemo(() => {
    const raw = searchParams.get("size");
    if (!raw) return null;
    const first = raw.split(",")[0]?.trim();
    return first ?? null;
  }, [searchParams]);

  const setSize = (size: ProductSize | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (size) next.set("size", size);
    else next.delete("size");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <nav
      aria-label={t("catalog.filters.size")}
      className="-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0"
    >
      <ul className="flex items-center gap-2 whitespace-nowrap md:flex-wrap">
        <li>
          <button
            type="button"
            onClick={() => setSize(null)}
            aria-pressed={active === null}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active === null
                ? "border-foreground bg-foreground text-background shadow-sm"
                : "border-border bg-background text-foreground hover:border-foreground",
            )}
          >
            <Users aria-hidden="true" className="size-3.5" />
            {t("catalog.allSizes")}
          </button>
        </li>
        {SIZES.map((s) => {
          const selected = active === s.value;
          return (
            <li key={s.value}>
              <button
                type="button"
                onClick={() => setSize(selected ? null : (s.value as ProductSize))}
                aria-pressed={selected}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected
                    ? "border-foreground bg-foreground text-background shadow-sm"
                    : "border-border bg-background text-foreground hover:border-foreground",
                )}
              >
                <SizeDots size={s.value as ProductSize} />
                {t(s.labelKey)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
