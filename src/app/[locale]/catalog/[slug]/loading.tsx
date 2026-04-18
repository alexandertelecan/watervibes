import { Container } from "@/components/shared/Container";

// Matches the product detail page skeleton: breadcrumb rail, masthead,
// stats strip, gallery panel, description + sticky aside, specs + features.
export default function ProductLoading() {
  return (
    <article
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="pb-28"
    >
      {/* Breadcrumb rail */}
      <Container size="wide" className="pt-6 md:pt-10">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="h-3 w-32 animate-pulse rounded bg-muted/60" />
          <div className="h-3 w-40 animate-pulse rounded bg-muted/60" />
        </div>
      </Container>

      {/* Masthead */}
      <Container size="wide" className="pt-12 md:pt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <div className="h-3 w-48 animate-pulse rounded bg-muted/60" />
            <div className="mt-6 h-16 w-4/5 animate-pulse rounded-md bg-muted/50" />
          </div>
          <div className="self-end md:col-span-4 md:col-start-9">
            <div className="h-5 w-full animate-pulse rounded bg-muted/50" />
            <div className="mt-2 h-5 w-3/4 animate-pulse rounded bg-muted/50" />
          </div>
        </div>
      </Container>

      {/* Stats rail */}
      <Container size="wide" className="pt-10 md:pt-14">
        <div className="grid grid-cols-2 divide-x divide-border border-y border-border md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 px-5 py-7 md:px-8 md:py-9"
            >
              <div className="h-10 w-20 animate-pulse rounded bg-muted/50" />
              <div className="h-3 w-24 animate-pulse rounded bg-muted/50" />
            </div>
          ))}
        </div>
      </Container>

      {/* Gallery */}
      <Container size="wide" className="pt-12 md:pt-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="flex-1 animate-pulse rounded-xl bg-surface px-6 py-12 shadow-lg md:px-14 md:py-20 lg:py-24">
            <div className="mx-auto aspect-4/5 w-full rounded bg-muted/50" />
          </div>
          <div className="flex flex-row gap-3 md:w-20 md:flex-col">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square w-20 animate-pulse rounded-sm bg-muted/60"
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Description + aside */}
      <Container size="wide" className="pt-20 md:pt-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="h-3 w-32 animate-pulse rounded bg-muted/60" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full animate-pulse rounded bg-muted/40"
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <div className="rounded-xl border border-border bg-surface p-8">
              <div className="h-3 w-16 animate-pulse rounded bg-muted/60" />
              <div className="mt-3 h-10 w-32 animate-pulse rounded bg-muted/50" />
              <div className="mt-3 h-3 w-full animate-pulse rounded bg-muted/60" />
              <div className="mt-8 h-14 w-full animate-pulse rounded-full bg-muted/60" />
              <div className="mt-3 h-12 w-full animate-pulse rounded-full bg-muted/50" />
            </div>
          </div>
        </div>
      </Container>

      <span className="sr-only">Loading product…</span>
    </article>
  );
}
