export default function AdminProductsLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="mx-auto max-w-6xl"
    >
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="h-3 w-20 animate-pulse rounded-full bg-muted/50" />
          <div className="h-9 w-48 animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-80 animate-pulse rounded bg-muted/30" />
        </div>
        <div className="h-11 w-36 animate-pulse rounded-full bg-muted/40" />
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-border bg-background"
          />
        ))}
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
        <div className="border-b border-border bg-surface/60 px-6 py-3">
          <div className="h-3 w-32 animate-pulse rounded bg-muted/40" />
        </div>
        <ul>
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center gap-4 border-b border-border/60 px-6 py-4 last:border-b-0"
            >
              <div className="h-16 w-20 animate-pulse rounded-lg bg-muted/40" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-60 animate-pulse rounded bg-muted/40" />
                <div className="h-3 w-32 animate-pulse rounded bg-muted/30" />
              </div>
              <div className="h-4 w-16 animate-pulse rounded bg-muted/30" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted/30" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted/30" />
              <div className="flex gap-2">
                <div className="size-9 animate-pulse rounded-full bg-muted/40" />
                <div className="size-9 animate-pulse rounded-full bg-muted/40" />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <span className="sr-only">Se încarcă produsele…</span>
    </div>
  );
}
