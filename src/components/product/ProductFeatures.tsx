import { Check } from "lucide-react";

export function ProductFeatures({ features }: { features: string[] }) {
  if (features.length === 0) return null;

  return (
    <section
      aria-labelledby="features-heading"
      className="flex flex-col gap-8"
    >
      <h2
        id="features-heading"
        className="text-h2 font-heading text-foreground"
      >
        Ce este inclus
      </h2>

      <ul className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-background"
            >
              <Check className="size-4" strokeWidth={2.5} />
            </span>
            <span className="text-[1.0625rem] leading-[1.6] text-foreground">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
