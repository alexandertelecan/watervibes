import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

// DESIGN.md §5 — our brand button. Same Radix Slot pattern as the shadcn
// primitive (src/components/ui/button.tsx) but restyled to our tokens:
// pill-shaped (rounded-full), Airbnb-commercial, with charcoal primary,
// aqua accent, and a 2px aqua focus ring. Trailing ArrowRight slides 2px
// on hover for variant="primary|accent". Never uppercase — that register
// is reserved for .text-eyebrow.
const buttonStyles = cva(
  [
    "group/btn inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-full font-semibold tracking-[-0.005em]",
    "transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-200",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-foreground/90 active:translate-y-px",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent-tint active:translate-y-px",
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface",
        ghost:
          "bg-transparent text-foreground hover:bg-surface",
      },
      size: {
        sm: "h-9 px-5 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-[15px] [&_svg]:size-4",
        lg: "h-14 px-8 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
    arrow?: boolean;
  };

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  arrow = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="brand-button"
      data-variant={variant}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          {arrow ? (
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
            />
          ) : null}
        </>
      )}
    </Comp>
  );
}

export { buttonStyles };
