"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// DESIGN.md §5 — Header
// Page-scroll past 80px: header shrinks from h-20 → h-16, picks up a
// --surface background, and gains a 1px bottom rule in --accent. Smooth,
// not jumpy (300ms per DESIGN.md §4.1 hover-class transitions).
//
// Implemented via an IntersectionObserver on a sentinel div rendered at
// the very top of the page. Once the sentinel leaves the viewport, the
// header is considered "scrolled."
export function ScrolledHeader({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px 0px 0px 0px", threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-20 -mb-20" />
      <header
        className={cn(
          "sticky top-0 z-40 transition-[height,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "h-16 border-b border-accent bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
            : "h-20 border-b border-transparent bg-transparent",
        )}
      >
        {children}
      </header>
    </>
  );
}
