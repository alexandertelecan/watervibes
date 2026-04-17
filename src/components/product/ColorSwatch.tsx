import { cn } from "@/lib/utils";

type ColorSwatchProps = {
  hex: string;
  label: string;
  size?: "sm" | "md";
  className?: string;
};

const sizeClass = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
} as const;

export function ColorSwatch({
  hex,
  label,
  size = "md",
  className,
}: ColorSwatchProps) {
  return (
    <span
      className={cn(
        "inline-block flex-shrink-0 rounded-full ring-1 ring-border",
        sizeClass[size],
        className,
      )}
      style={{ backgroundColor: hex }}
      title={label}
      role="img"
      aria-label={label}
    />
  );
}
