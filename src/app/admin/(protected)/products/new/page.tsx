import Link from "next/link";

import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link href="/admin/products" className="hover:text-foreground">
            Products
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">New</span>
        </div>
        <h1 className="mt-2 font-[var(--font-fraunces)] text-3xl font-semibold tracking-tight">
          New product
        </h1>
      </header>

      <ProductForm mode="create" />
    </div>
  );
}
