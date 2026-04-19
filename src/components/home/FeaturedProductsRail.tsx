"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type FeaturedRailItem = {
  id: string;
  href: string;
  name: string;
  capacity: number;
  image?: string;
  imageAlt: string;
  priceLabel: string;
};

type Props = {
  items: FeaturedRailItem[];
};

const EDGE_ZONE = 0.14;
const EDGE_MAX_SPEED = 14;

export function FeaturedProductsRail({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const speedRef = useRef(0);
  const [canNext, setCanNext] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const stopAutoScroll = useCallback(() => {
    speedRef.current = 0;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || speedRef.current === 0) {
      rafRef.current = null;
      return;
    }
    el.scrollLeft += speedRef.current;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || e.pointerType === "touch") return;
      const el = scrollerRef.current;
      if (!el) return;
      if (el.scrollWidth <= el.clientWidth + 1) return;
      const rect = el.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const edge = EDGE_ZONE;
      let speed = 0;
      if (ratio < edge) {
        speed = -EDGE_MAX_SPEED * (1 - ratio / edge);
      } else if (ratio > 1 - edge) {
        speed = EDGE_MAX_SPEED * ((ratio - (1 - edge)) / edge);
      }
      speedRef.current = speed;
      if (speed !== 0 && rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [reducedMotion, tick],
  );

  useEffect(() => () => stopAutoScroll(), [stopAutoScroll]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const elLeft = el.getBoundingClientRect().left;
    const padLeft = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const snapAnchor = elLeft + padLeft;
    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-rail-card]"),
    );
    const epsilon = 8;
    const target =
      direction === 1
        ? cards.find((c) => c.getBoundingClientRect().left > snapAnchor + epsilon)
        : [...cards]
            .reverse()
            .find((c) => c.getBoundingClientRect().left < snapAnchor - epsilon);
    if (!target) return;
    const delta = target.getBoundingClientRect().left - snapAnchor;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className="relative"
      onPointerLeave={stopAutoScroll}
      onPointerMove={handlePointerMove}
    >
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Jacuzzi cele mai vândute"
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-visible pb-4 md:gap-7",
          "scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-(--radius-lg)",
          "pl-6 md:pl-8 xl:pl-[calc((100vw-80rem)/2+2rem)]",
          "scroll-pl-6 md:scroll-pl-8 xl:scroll-pl-[calc((100vw-80rem)/2+2rem)]",
        )}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCard(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCard(-1);
          }
        }}
      >
        {items.map((item) => (
          <RailCard key={item.id} item={item} />
        ))}
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent transition-opacity duration-300",
          canNext ? "opacity-100" : "opacity-0",
        )}
      />

      <RailButton
        visible={canNext}
        onClick={() => scrollByCard(1)}
      />
    </div>
  );
}

function RailCard({ item }: { item: FeaturedRailItem }) {
  const capacityLabel = `${item.capacity} persoane`;

  return (
    <Link
      data-rail-card
      href={item.href}
      aria-label={`${item.name}, ${capacityLabel}, ${item.priceLabel}`}
      className={cn(
        "group/card block shrink-0 snap-start rounded-(--radius-lg)",
        "w-[min(22rem,78vw)] md:w-[min(24rem,40vw)] lg:w-[min(26rem,30vw)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
      )}
    >
      <div className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-y-1">
        <div className="relative aspect-square overflow-hidden rounded-(--radius-lg) bg-surface">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 78vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-eyebrow text-muted-foreground">
              {item.name}
            </div>
          )}
        </div>

        <div className="mt-6 px-1">
          <h3 className="text-h3 text-foreground">{item.name}</h3>
          <p className="mt-1 text-small text-muted-foreground">
            {capacityLabel}
          </p>
          <p className="mt-3 text-body font-semibold text-foreground tabular-nums">
            {item.priceLabel}
          </p>
        </div>
      </div>
    </Link>
  );
}

function RailButton({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Card următor"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "absolute right-4 top-[38%] hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition-all duration-200 md:flex",
        "hover:border-accent hover:text-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
        <path
          d="M1 8h12M9 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
