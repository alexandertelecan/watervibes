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

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-fraunces)] text-3xl font-semibold tracking-tight">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          New product
        </Link>
      </header>

      <ProductsTable products={products} />
    </div>
  );
}
