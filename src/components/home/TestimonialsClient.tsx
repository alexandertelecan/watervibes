"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
};

type Props = {
  items: TestimonialItem[];
  interval?: number;
};

// DESIGN.md §5 — Testimonials
// Auto-advancing hero quote with filmstrip below. Cycles every 10s, pauses
// on hover, and only ticks while the section is in the viewport (via
// IntersectionObserver). prefers-reduced-motion disables auto-advance —
// users can still click filmstrip items to advance manually.
export function TestimonialsClient({ items, interval = 10_000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || !visible || items.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [items.length, interval, paused, visible, reducedMotion]);

  if (items.length === 0) return null;
  const hero = items[active];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figure className="relative">
        <span
          aria-hidden="true"
          className="absolute -top-16 -left-2 font-heading text-[11rem] leading-none text-accent-tint md:-top-24 md:-left-4 md:text-[14rem]"
          style={{ fontStyle: "italic" }}
        >
          &ldquo;
        </span>
        <blockquote
          key={hero.id}
          className="relative z-10 max-w-4xl text-h1 italic text-foreground"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {hero.quote}
        </blockquote>
        <figcaption className="mt-10 flex items-baseline gap-4">
          <span className="text-eyebrow text-foreground">{hero.author}</span>
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          <span className="text-eyebrow text-muted-foreground">
            {hero.location}
          </span>
        </figcaption>
      </figure>

      {items.length > 1 ? (
        <ul
          role="tablist"
          className="mt-16 flex gap-4 overflow-x-auto pb-4 md:gap-6"
          aria-label="Other testimonials"
        >
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <li key={item.id} className="flex-shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-64 flex-col gap-3 rounded-md border p-5 text-left transition-colors duration-200 md:w-72",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-accent bg-background"
                      : "border-border bg-background/60 hover:border-accent/60",
                  )}
                >
                  <span className="text-small italic text-foreground/80 line-clamp-3">
                    {item.quote}
                  </span>
                  <span className="mt-auto flex flex-col gap-0.5">
                    <span className="text-eyebrow text-foreground">
                      {item.author}
                    </span>
                    <span className="text-eyebrow text-muted-foreground">
                      {item.location}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
