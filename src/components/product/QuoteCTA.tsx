"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/shared/Button";

export function QuoteCTA({ slug }: { slug: string }) {
  const handleScroll = () => {
    document
      .getElementById("specs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-eyebrow text-accent">Suntem gata când sunteți</span>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="accent" size="lg">
          <Link href={`/contact?product=${encodeURIComponent(slug)}`}>
            <span>Cereți o ofertă</span>
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
            />
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleScroll}
        >
          Vedeți specificațiile
        </Button>
      </div>
      <p className="text-small text-muted-foreground">
        Răspundem într-o zi lucrătoare · Fără obligații
      </p>
    </div>
  );
}
