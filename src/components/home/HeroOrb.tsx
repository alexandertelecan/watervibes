"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroOrb() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -top-48 -left-64 -z-10 h-192 w-3xl rounded-full bg-accent/25 blur-[140px]"
      initial={{ x: 0, y: 0 }}
      animate={
        shouldReduceMotion
          ? { x: 0, y: 0 }
          : { x: [0, 120, 60, 0], y: [0, -30, 20, 0] }
      }
      transition={{
        duration: 22,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
}
