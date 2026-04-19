import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceTagProps = {
  price: number;
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
  size = "md",
  weight = "medium",
  className,
}: PriceTagProps) {
  return (
    <span
      className={cn(
        "text-foreground tabular-nums",
        sizeClass[size],
        weightClass[weight],
        className,
      )}
    >
      {formatPrice(price)}
    </span>
  );
}
