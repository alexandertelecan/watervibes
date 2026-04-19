import { ProductCardSkeleton } from "@/components/catalog/ProductCardSkeleton";
import { Container } from "@/components/shared/Container";

export default function CatalogLoading() {
  return (
    <>
      <section className="border-b border-border/80 bg-surface/60 pt-16 pb-14 md:pt-24 md:pb-16">
        <Container>
          <div aria-hidden="true" className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent/40" />
                <div className="h-3 w-20 rounded bg-muted/40 animate-pulse" />
              </div>
              <div className="mt-5 h-12 w-72 max-w-full rounded bg-muted/40 animate-pulse" />
            </div>
            <div className="h-5 w-full max-w-md rounded bg-muted/30 animate-pulse md:col-span-5 md:col-start-8 md:self-end" />
          </div>
          <div
            aria-hidden="true"
            className="mt-10 flex gap-2 overflow-hidden md:mt-12"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="h-10 w-28 shrink-0 rounded-full border border-border/70 bg-background/60 animate-pulse"
              />
            ))}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-12 md:py-16">
        <div
          role="status"
          aria-busy="true"
          aria-live="polite"
          className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16"
        >
          <div
            aria-hidden="true"
            className="hidden h-80 w-64 shrink-0 rounded-xl bg-muted/20 lg:block animate-pulse"
          />
          <div className="min-w-0 flex-1">
            <div
              aria-hidden="true"
              className="flex items-center justify-between gap-4"
            >
              <div className="h-6 w-32 rounded bg-muted/40 animate-pulse" />
              <div className="h-10 w-44 rounded-full bg-muted/30 animate-pulse" />
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 md:mt-12">
              {Array.from({ length: 9 }).map((_, i) => (
                <li key={i}>
                  <ProductCardSkeleton index={i} />
                </li>
              ))}
            </ul>
          </div>
          <span className="sr-only">Loading catalog…</span>
        </div>
      </Container>
    </>
  );
}
