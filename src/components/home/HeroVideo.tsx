"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export function HeroVideo() {
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const y = useTransform(
    scrollY,
    [0, 800],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "45%"],
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{ y, scale: 1.9 }}
      className="absolute inset-0 -z-20 will-change-transform"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg"
        className="h-full w-full -scale-x-100 object-cover opacity-55"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
