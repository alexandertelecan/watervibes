import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
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
          <span className="text-foreground">Produs nou</span>
        </nav>

        <div className="mt-5">
          <h1 className="font-(family-name:--font-fraunces) text-3xl font-semibold tracking-tight sm:text-4xl">
            Adăugați un jacuzzi în catalog
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Completați identitatea, varianta, specificațiile și galeria.
            Câmpurile marcate cu asterisc sunt obligatorii.
          </p>
        </div>
      </header>

      <ProductForm mode="create" />
    </div>
  );
}
