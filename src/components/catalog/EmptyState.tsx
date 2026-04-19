import { SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/shared/Button";

export function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-20 text-center shadow-sm md:px-10 md:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative flex flex-col items-center gap-5">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-background text-accent shadow-sm ring-1 ring-border/70">
          <SearchX className="size-6" aria-hidden="true" strokeWidth={1.75} />
        </span>
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-h2 text-foreground">Niciun jacuzzi nu se potrivește. Încă.</h3>
          <p className="max-w-md text-lede text-muted-foreground">
            Nimic din colecție nu corespunde filtrelor selectate. Slăbiți o
            condiție de dimensiune sau culoare, sau ștergeți tot și luați-o de
            la zero.
          </p>
        </div>
        <Button asChild variant="primary" size="md" arrow>
          <Link href="/catalog">Ștergeți toate filtrele</Link>
        </Button>
      </div>
    </div>
  );
}
