import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

// DESIGN.md §5 (Admin) — FormSection header uses .text-eyebrow + a 40px
// terracotta hairline rule, matching how SectionHeading renders on the
// public side. Keeps admin visually coherent with the brand without
// dragging the heavy section rhythm into the working room.
export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="border-b border-border pb-8 last:border-b-0 last:pb-0">
      <header className="mb-6 flex flex-col gap-3">
        <span aria-hidden="true" className="h-px w-10 bg-accent" />
        <h2 className="text-eyebrow text-foreground">{title}</h2>
        {description ? (
          <p className="text-small text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
