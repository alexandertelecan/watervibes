export function ProductFeatures({ features }: { features: string[] }) {
  if (features.length === 0) return null;

  return (
    <section
      aria-labelledby="features-heading"
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col gap-2">
        <span className="text-eyebrow text-accent">Incluse</span>
        <h2
          id="features-heading"
          className="text-h2 text-foreground font-heading"
        >
          Ce este inclus
        </h2>
      </div>

      <ol className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        {features.map((feature, i) => {
          const ordinal = String(i + 1).padStart(2, "0");
          return (
            <li
              key={feature}
              className="flex items-baseline gap-5 border-t border-foreground/15 pt-4"
            >
              <span className="font-heading text-[1.625rem] leading-none font-bold tabular-nums text-accent shrink-0">
                {ordinal}
              </span>
              <span className="text-base text-foreground">{feature}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
