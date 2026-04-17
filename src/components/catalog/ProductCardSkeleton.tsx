import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ index = 0 }: { index?: number }) {
  const aspect = index % 2 === 0 ? "aspect-4/5" : "aspect-5/6";
  return (
    <div aria-hidden="true" className="block">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted/50 animate-pulse",
          aspect,
        )}
      />
      <div className="mt-5 flex flex-col gap-2">
        <div className="h-6 w-40 rounded bg-muted/50 animate-pulse" />
        <div className="h-4 w-24 rounded bg-muted/40 animate-pulse" />
      </div>
    </div>
  );
}
