"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

// DESIGN.md §4.1–4.2 — the "settling" reveal.
// Fade-up over 500ms with out-expo easing. Optional terracotta hairline
// that draws left-to-right over 600ms at +100ms delay — the signature
// motion that pairs with SectionHeading. Reduced-motion fallback is
// covered in globals.css via prefers-reduced-motion, which clamps all
// transition-duration to 200ms.

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** When true, renders an animated terracotta hairline above children. */
  underline?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  className,
  underline = false,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay }}
    >
      {underline ? (
        <motion.span
          aria-hidden="true"
          className={cn("mb-6 block h-px w-10 origin-left bg-accent")}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: delay + 0.1 }}
        />
      ) : null}
      {children}
    </motion.div>
  );
}
