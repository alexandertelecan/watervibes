import { cn } from "@/lib/utils";
import type { Locale } from "@/types/product";

type PriceTagProps = {
  price: number;
  locale: Locale;
  size?: "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold";
  className?: string;
};

const sizeClass = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl md:text-3xl",
} as const;

const weightClass = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
} as const;

export function PriceTag({
  price,
  locale,
  size = "md",
  weight = "medium",
  className,
}: PriceTagProps) {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <span
      className={cn(
        "text-foreground tabular-nums",
        sizeClass[size],
        weightClass[weight],
        className,
      )}
    >
      {formatted}
    </span>
  );
}
