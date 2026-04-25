import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-7xl">
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

        <div className="mt-6 flex flex-col gap-2">
          <span className="inline-flex items-center gap-2 text-eyebrow text-accent">
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            Builder
          </span>
          <h1 className="font-(family-name:--font-fraunces) text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Adăugați un jacuzzi în catalog
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Completați identitatea, aspectul, prețul, specificațiile și
            galeria. Previzualizarea din dreapta arată cum va apărea fișa
            publică pe măsură ce scrieți.
          </p>
        </div>
      </header>

      <ProductForm mode="create" />
    </div>
  );
}
