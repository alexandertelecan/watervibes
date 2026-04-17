import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Brief description of what photo should go here (shown as a small label — dev only UX, not user copy). */
  role?: string;
  /** Aspect ratio utility class (e.g. "aspect-video", "aspect-4/5"). Omit if caller wraps with fixed dims. */
  aspect?: string;
  className?: string;
  children?: React.ReactNode;
};

// Placeholder container for the 5 Unsplash roles catalogued in docs/IMAGERY.md.
// Warm surface fill + a subtle repeating hairline pattern so it doesn't read as
// a broken empty box. Caller swaps this out for <Image src={...} /> once a
// canonical CDN URL is provided (per IMAGERY.md §0).
export function ImagePlaceholder({
  role,
  aspect,
  className,
  children,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={role ? `Placeholder: ${role}` : "Image placeholder"}
      className={cn(
        "relative isolate overflow-hidden bg-surface",
        // Diagonal cross-hatch of border-color hairlines — reads as "linen"
        // without pulling in an extra SVG. Purely decorative.
        "bg-[repeating-linear-gradient(45deg,transparent_0_18px,color-mix(in_oklab,var(--border)_60%,transparent)_18px_19px)]",
        aspect,
        className,
      )}
    >
      {role ? (
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-eyebrow text-muted-foreground shadow-sm backdrop-blur-sm"
        >
          <span className="inline-block size-1.5 rounded-full bg-accent" />
          {role}
        </span>
      ) : null}
      {children}
    </div>
  );
}
