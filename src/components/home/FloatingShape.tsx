"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type FloatingShapeProps = {
  children: React.ReactNode;
  className?: string;
  /** Total vertical excursion in px tied to scroll (default 140). */
  range?: number;
  /** Baseline y offset in px, shifts the float midpoint (default 0). */
  offset?: number;
  /** Degrees of rotation across the full scroll range (default 0). */
  rotate?: number;
  /** Amplitude in px of the continuous bob loop (default 10). */
  bob?: number;
  /** Seconds for one bob cycle (default 4). */
  bobDuration?: number;
};

export function FloatingShape({
  children,
  className,
  range = 140,
  offset = 0,
  rotate = 0,
  bob = 10,
  bobDuration = 4,
}: FloatingShapeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [offset - range / 2, offset + range / 2],
  );
  const r = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, rotate],
  );

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ y, rotate: r, zIndex: -1 }}
      className={className}
    >
      <motion.div
        className="h-full w-full"
        animate={prefersReducedMotion ? undefined : { y: [0, -bob, 0] }}
        transition={{
          duration: bobDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
