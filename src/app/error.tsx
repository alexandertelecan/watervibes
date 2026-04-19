"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/shared/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container
      as="section"
      className="flex flex-col items-center gap-6 py-24 text-center md:py-32"
    >
      <h1 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
        Ceva nu a mers
      </h1>
      <p className="max-w-md text-base text-muted-foreground md:text-lg">
        A apărut o eroare neașteptată de partea noastră. Încercați din nou sau
        întoarceți-vă la pagina principală.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Încercați din nou
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Înapoi la pagina principală
        </Link>
      </div>
    </Container>
  );
}
