import { Plus } from "lucide-react";
import Link from "next/link";

import { ProductsTable } from "@/components/admin/ProductsTable";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { serializeProduct } from "@/lib/serializers";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

async function loadProducts(): Promise<Product[]> {
  try {
    await dbConnect();
    const docs = await ProductModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return docs.map((doc) => serializeProduct(doc as Record<string, unknown>));
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await loadProducts();
  const featuredCount = products.filter((p) => p.featured).length;
  const averagePrice =
    products.length > 0
      ? Math.round(
          products.reduce((sum, p) => sum + p.price, 0) / products.length,
        )
      : 0;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Catalog
          </p>
          <h1 className="mt-2 font-(family-name:--font-fraunces) text-3xl font-semibold tracking-tight">
            Produse
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Gestionați colecția dumneavoastră de jacuzzi-uri. Căutați, filtrați
            după mărime sau culoare și editați fișa fiecărui model.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="group/new inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-accent-tint hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover/new:rotate-90"
          />
          Produs nou
        </Link>
      </header>

      <ProductsTable
        products={products}
        totalCount={products.length}
        featuredCount={featuredCount}
        averagePrice={averagePrice}
      />
    </div>
  );
}
