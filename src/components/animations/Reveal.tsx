"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface RevealProps {
  children:   React.ReactNode;
  delay?:     number;
  direction?: "up" | "left" | "right";
  className?: string;
}

const directionVariants = {
  up:    fadeUp,
  left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } },
  right: { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } },
};

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Triggers once when element enters the viewport.
 */
export default function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-72px" });

  const variants = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
