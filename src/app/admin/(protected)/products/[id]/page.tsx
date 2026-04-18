import Link from "next/link";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/ProductForm";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { serializeProduct } from "@/lib/serializers";
import type { Product } from "@/types/product";

async function loadProduct(id: string): Promise<Product | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await dbConnect();
  const doc = await ProductModel.findById(id).lean();
  if (!doc) return null;
  return serializeProduct(doc as Record<string, unknown>);
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link href="/admin/products" className="hover:text-foreground">
            Products
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">Edit</span>
        </div>
        <h1 className="mt-2 font-[var(--font-fraunces)] text-3xl font-semibold tracking-tight">
          {product.name.en}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">/{product.slug}</p>
      </header>

      <ProductForm mode="edit" initialData={product} />
    </div>
  );
}
