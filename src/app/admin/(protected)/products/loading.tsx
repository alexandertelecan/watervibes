export default function AdminProductsLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 rounded bg-muted/40 animate-pulse" />
        <div className="h-9 w-28 rounded-xl bg-muted/40 animate-pulse" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="border-b border-border bg-accent/40 px-4 py-3">
          <div className="h-3 w-32 rounded bg-muted/40 animate-pulse" />
        </div>
        <ul>
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between border-b border-border/60 px-4 py-4 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-muted/40 animate-pulse" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-40 rounded bg-muted/40 animate-pulse" />
                  <div className="h-3 w-24 rounded bg-muted/30 animate-pulse" />
                </div>
              </div>
              <div className="h-8 w-24 rounded bg-muted/40 animate-pulse" />
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">Loading products…</span>
    </div>
  );
}
