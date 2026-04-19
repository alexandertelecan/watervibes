import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/types/product";

export function SimilarProducts({
  products,
  capacity,
  colorLabel,
}: {
  products: Product[];
  capacity: number;
  colorLabel: string;
}) {
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="similar-heading"
      className="flex flex-col gap-10"
    >
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6">
        <h2
          id="similar-heading"
          className="text-h2 font-heading text-foreground"
        >
          Modele similare
        </h2>
        <p className="text-small text-muted-foreground">
          Alte modele pentru {capacity} persoane sau în {colorLabel.toLowerCase()}.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {products.map((product) => (
          <li key={product._id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
