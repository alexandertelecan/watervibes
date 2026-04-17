import Image from "next/image";
import { useTranslations } from "next-intl";

import { ColorSwatch } from "@/components/product/ColorSwatch";
import { PriceTag } from "@/components/shared/PriceTag";
import { Link } from "@/i18n/navigation";
import { SIZES } from "@/lib/constants";
import type { Locale, Product } from "@/types/product";

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useTranslations();
  const sizeEntry = SIZES.find((s) => s.value === product.size);
  const sizeLabel = sizeEntry ? t(sizeEntry.labelKey) : product.size;
  const colorLabel = t(`common.colors.${product.color}`);
  const name = product.name[locale];

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link
      href={`/catalog/${product.slug}`}
      aria-label={`${name} — ${sizeLabel} — ${formattedPrice}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-accent/40">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ColorSwatch hex={product.colorHex} label={colorLabel} size="sm" />
          <span>{sizeLabel}</span>
        </div>
        <h3 className="font-heading text-xl text-foreground">{name}</h3>
        <PriceTag price={product.price} locale={locale} />
      </div>
    </Link>
  );
}
