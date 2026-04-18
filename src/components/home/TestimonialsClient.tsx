"use client";

import { AnimatePresence, motion } from "framer-motion";
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

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// DESIGN.md §5 — Testimonials
// Spotlight + rail: one large review card on the left (stars, italic
// pull-quote, monogram author chip) and a vertical stack of compact review
// cards on the right. Click/tap a rail card to promote it to the spotlight.
// Cycles every 10s, pauses on hover / focus / out-of-view, respects
// prefers-reduced-motion. Star ratings come from the Mongo document and
// double as the trust signal for the section.
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
      className="grid gap-6 md:grid-cols-12 md:gap-8"
    >
      {/* Spotlight card */}
      <figure className="relative overflow-hidden rounded-(--radius-xl) bg-background p-8 shadow-md md:col-span-7 md:p-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={hero.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="flex h-full flex-col"
          >
            <Stars rating={hero.rating} size="lg" />
            <blockquote
              className="mt-8 text-h2 italic leading-snug text-foreground"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {hero.quote}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-4 pt-10">
              <Monogram initial={firstLetter(hero.author)} active />
              <div className="flex flex-col gap-0.5">
                <span className="text-small font-semibold text-foreground">
                  {hero.author}
                </span>
                <span className="text-small text-muted-foreground">
                  {hero.location}
                </span>
              </div>
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </figure>

      {/* Rail */}
      {items.length > 1 ? (
        <div
          className="md:col-span-5"
          role="group"
          aria-label="More testimonials"
        >
          <ul className="flex flex-col gap-3">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex w-full items-start gap-4 rounded-(--radius-lg) border p-4 text-left transition-all duration-200 md:p-5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                      isActive
                        ? "border-accent bg-background shadow-sm"
                        : "border-border/70 bg-background/40 hover:border-accent/50 hover:bg-background",
                    )}
                  >
                    <Monogram initial={firstLetter(item.author)} active={isActive} />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-small font-semibold text-foreground">
                          {item.author}
                        </span>
                        <Stars rating={item.rating} size="sm" />
                      </div>
                      <span className="truncate text-small text-muted-foreground">
                        {item.location}
                      </span>
                      <p className="line-clamp-2 text-small text-foreground/75">
                        {item.quote}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function firstLetter(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "·";
}

function Stars({
  rating,
  size = "md",
  className,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "lg" ? "size-5" : size === "sm" ? "size-3.5" : "size-4";
  const gapClass = size === "sm" ? "gap-0.5" : "gap-1";
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={cn("flex shrink-0", gapClass, className)}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={cn(
            sizeClass,
            i < rating ? "text-accent" : "text-muted",
          )}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.15.99 5.85L10 14.95l-5.24 2.75.99-5.85L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

function Monogram({
  initial,
  active = false,
}: {
  initial: string;
  active?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-small font-semibold transition-colors duration-200",
        active
          ? "bg-accent text-accent-foreground"
          : "bg-muted text-foreground/80 group-hover:bg-accent/15 group-hover:text-accent",
      )}
      style={{ fontFamily: "var(--font-fraunces), serif" }}
    >
      {initial}
    </span>
  );
}
