import { getTranslations } from "next-intl/server";

import type { ProductSpecs as Specs } from "@/types/product";

export async function ProductSpecs({ specs }: { specs: Specs }) {
  const t = await getTranslations("product.specs");

  const rows: { label: string; value: string | number }[] = [
    { label: t("dimensions"), value: specs.dimensions },
    { label: t("jets"), value: specs.jets },
    { label: t("capacity"), value: specs.capacity },
    { label: t("power"), value: specs.power },
    { label: t("weightEmpty"), value: specs.weightEmpty },
    { label: t("weightFull"), value: specs.weightFull },
  ];

  return (
    <section aria-labelledby="specs-heading">
      <h2
        id="specs-heading"
        className="mb-6 font-heading text-2xl text-foreground"
      >
        {t("title")}
      </h2>
      <dl className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 border-t border-border pt-3"
          >
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-sm text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
