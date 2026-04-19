import { ArrowUpRight, ChevronRight } from "lucide-react";
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
    <div className="mx-auto max-w-5xl">
      <header className="mb-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
        >
          <Link
            href="/admin"
            className="transition-colors hover:text-foreground"
          >
            Panou
          </Link>
          <ChevronRight aria-hidden="true" className="size-3 opacity-60" />
          <Link
            href="/admin/products"
            className="transition-colors hover:text-foreground"
          >
            Produse
          </Link>
          <ChevronRight aria-hidden="true" className="size-3 opacity-60" />
          <span className="text-foreground">Editare</span>
        </nav>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-(family-name:--font-fraunces) text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              /{product.slug}
            </p>
          </div>
          <Link
            href={`/catalog/${product.slug}`}
            target="_blank"
            rel="noreferrer"
            className="group/view inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-surface"
          >
            <span>Vedeți pe site</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5"
            />
          </Link>
        </div>
      </header>

      <ProductForm mode="edit" initialData={product} />
    </div>
  );
}
