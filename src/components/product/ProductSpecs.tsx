import { cn } from "@/lib/utils";
import type { ProductSpecs as Specs } from "@/types/product";

type StatSize = "display" | "large" | "medium";

type StatEntry = {
  index: string;
  value: string;
  label: string;
  size: StatSize;
};

const VALUE_SIZE: Record<StatSize, string> = {
  display:
    "text-[clamp(4rem,3rem+4vw,6rem)] leading-[0.9] font-bold tracking-[-0.04em]",
  large:
    "text-[clamp(2.25rem,1.8rem+1.6vw,3rem)] leading-[1] font-bold tracking-[-0.03em]",
  medium:
    "text-[clamp(1.5rem,1.2rem+0.8vw,2rem)] leading-[1.05] font-bold tracking-[-0.025em]",
};

const UNIT_LABELS = {
  jets: "duze inox",
  seats: "locuri",
  power: "consum maxim",
  footprint: "amprentă",
  weightEmpty: "greutate carcasă",
  weightFull: "greutate cu apă",
} as const;

export function ProductSpecs({ specs }: { specs: Specs }) {
  const stats: StatEntry[] = [
    {
      index: "01",
      value: String(specs.jets),
      label: UNIT_LABELS.jets,
      size: "display",
    },
    {
      index: "02",
      value: String(specs.capacity),
      label: UNIT_LABELS.seats,
      size: "display",
    },
    {
      index: "03",
      value: specs.power,
      label: UNIT_LABELS.power,
      size: "large",
    },
    {
      index: "04",
      value: specs.dimensions,
      label: UNIT_LABELS.footprint,
      size: "medium",
    },
    {
      index: "05",
      value: specs.weightEmpty,
      label: UNIT_LABELS.weightEmpty,
      size: "large",
    },
    {
      index: "06",
      value: specs.weightFull,
      label: UNIT_LABELS.weightFull,
      size: "large",
    },
  ];

  return (
    <section aria-labelledby="specs-heading" className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-eyebrow text-accent">Pe scurt</span>
        <h2 id="specs-heading" className="text-h2 text-foreground font-heading">
          Specificații
        </h2>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-14">
        {stats.map((stat) => (
          <div
            key={stat.index}
            className="flex flex-col gap-4 border-t border-foreground/15 pt-5"
          >
            <div className="flex items-center gap-3">
              <span className="text-eyebrow tabular-nums text-accent">
                {stat.index}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <dd
              className={cn(
                "font-heading text-foreground tabular-nums",
                VALUE_SIZE[stat.size],
              )}
            >
              {stat.value}
            </dd>
            <dt className="text-eyebrow text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
