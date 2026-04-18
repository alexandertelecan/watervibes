import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ index = 0 }: { index?: number }) {
  const aspect = index % 2 === 0 ? "aspect-[4/5]" : "aspect-[5/6]";
  return (
    <div aria-hidden="true" className="block">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-muted/50 ring-1 ring-border/80 animate-pulse",
          aspect,
        )}
      >
        <span className="absolute left-3 top-3 h-6 w-20 rounded-full bg-background/70" />
        <span className="absolute right-3 top-3 size-9 rounded-full bg-background/70" />
      </div>
      <div className="mt-5 flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-4">
          <div className="h-6 w-2/3 rounded bg-muted/60 animate-pulse" />
          <div className="h-4 w-14 rounded bg-muted/40 animate-pulse" />
        </div>
        <div className="h-3.5 w-4/5 rounded bg-muted/40 animate-pulse" />
        <div className="mt-1 h-5 w-28 rounded bg-muted/50 animate-pulse" />
      </div>
    </div>
  );
}
