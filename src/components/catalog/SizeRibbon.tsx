"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { type ProductSize } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Item = {
  value: ProductSize | null;
  label: string;
  dots: number;
};

const ITEMS: readonly Item[] = [
  { value: null, label: "Toate dimensiunile", dots: 0 },
  { value: "2-person", label: "2 persoane", dots: 1 },
  { value: "4-person", label: "4 persoane", dots: 2 },
  { value: "6+person", label: "6+ persoane", dots: 3 },
] as const;

function Dots({ filled, active }: { filled: number; active: boolean }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <span
            key={i}
            className={cn(
              "block size-1.5 rounded-full transition-colors duration-200",
              isFilled
                ? active
                  ? "bg-background"
                  : "bg-foreground/70"
                : "bg-transparent ring-1 ring-inset",
              !isFilled && (active ? "ring-background/50" : "ring-foreground/25"),
            )}
          />
        );
      })}
    </span>
  );
}

export function SizeRibbon() {
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
      aria-label="Dimensiune"
      className="-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0"
    >
      <ul className="flex items-center gap-2.5 whitespace-nowrap md:flex-wrap">
        {ITEMS.map((item) => {
          const selected =
            (item.value === null && active === null) ||
            (item.value !== null && active === item.value);
          const canDeselect = item.value !== null && selected;
          return (
            <li key={item.value ?? "all"}>
              <button
                type="button"
                onClick={() => setSize(canDeselect ? null : item.value)}
                aria-pressed={selected}
                className={cn(
                  "inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-small font-medium transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground/80 hover:border-foreground hover:text-foreground",
                )}
              >
                <Dots filled={item.dots} active={selected} />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
