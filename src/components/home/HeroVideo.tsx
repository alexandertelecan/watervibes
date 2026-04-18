"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

// Hero background video with scroll-driven parallax.
// Tracks scroll progress across the Hero section (ref-bound via useScroll
// offset ["start start", "end start"]) and translates the video ~60px down
// as the user scrolls through. A 1.15x scale gives the overhang needed so
// the translate never reveals the section's bg behind the video.
// Respects prefers-reduced-motion — parallax disables when set, video
// still plays (decorative, muted).
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 80],
  );

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ y, scale: 1.15 }}
      className="absolute inset-0 -z-20 will-change-transform"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover opacity-55"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
