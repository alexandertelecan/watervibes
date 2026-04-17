import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** @deprecated use `lede`. kept as alias for legacy call sites. */
  description?: string;
  align?: "asymmetric" | "center";
  className?: string;
  titleAs?: "h1" | "h2";
};

// DESIGN.md §5 — SectionHeading: asymmetric by default. Eyebrow + h2 on the
// left rail (cols 1–7); lede floats right (cols 8–12), bottom-aligned so it
// hangs off the h2 baseline. "center" kept for the rare context where the
// asymmetric stack breaks layout (narrow single-column panels).
export function SectionHeading({
  eyebrow,
  title,
  lede,
  description,
  align = "asymmetric",
  className,
  titleAs = "h2",
}: SectionHeadingProps) {
  const Heading = titleAs;
  const body = lede ?? description;

  if (align === "center") {
    return (
      <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-6 text-center", className)}>
        {eyebrow ? (
          <span className="text-eyebrow text-accent">{eyebrow}</span>
        ) : null}
        <Heading className="text-h2 text-foreground">{title}</Heading>
        {body ? (
          <p className="text-lede text-muted-foreground">{body}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:gap-10", className)}>
      <div className="md:col-span-7">
        {eyebrow ? (
          <span className="text-eyebrow text-accent">{eyebrow}</span>
        ) : null}
        <Heading className={cn("text-h2 text-foreground", eyebrow && "mt-4")}>{title}</Heading>
      </div>
      {body ? (
        <p className="text-lede text-muted-foreground md:col-span-5 md:col-start-8 md:self-end">
          {body}
        </p>
      ) : null}
    </div>
  );
}
