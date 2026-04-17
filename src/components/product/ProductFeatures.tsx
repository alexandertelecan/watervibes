import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ProductFeatures({ features }: { features: string[] }) {
  const t = await getTranslations("product.features");
  if (features.length === 0) return null;

  return (
    <section aria-labelledby="features-heading">
      <h2
        id="features-heading"
        className="mb-6 font-heading text-2xl text-foreground"
      >
        {t("title")}
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-foreground"
          >
            <Check
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
