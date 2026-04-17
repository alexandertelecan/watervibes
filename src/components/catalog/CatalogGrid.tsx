import { EmptyState } from "@/components/catalog/EmptyState";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Locale, Product } from "@/types/product";

export function CatalogGrid({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} locale={locale} />
      ))}
    </div>
  );
}
