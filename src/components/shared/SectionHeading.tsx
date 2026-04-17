import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
