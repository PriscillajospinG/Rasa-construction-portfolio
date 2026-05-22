"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";
import type { Variants } from "framer-motion";

interface RevealProps {
  children:   React.ReactNode;
  delay?:     number;
  direction?: "up" | "left" | "right";
  distance?:  number;   /* y/x travel in px, default 32 */
  duration?:  number;   /* animation duration, default 0.75 */
  threshold?: string;   /* IntersectionObserver margin, default "-72px" */
  className?: string;
  style?:     React.CSSProperties;
}

function buildVariant(
  direction: "up" | "left" | "right",
  distance: number,
  duration: number
): Variants {
  const transition = { duration, ease: EASE_OUT };
  if (direction === "left")  return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0, transition } };
  if (direction === "right") return { hidden: { opacity: 0, x:  distance }, visible: { opacity: 1, x: 0, transition } };
  return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0, transition } };
}

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Fires once when element enters the viewport.
 * Respects prefers-reduced-motion automatically.
 */
export default function Reveal({
  children,
  delay     = 0,
  direction = "up",
  distance  = 32,
  duration  = 0.75,
  threshold = "-72px",
  className,
  style,
}: RevealProps) {
  const ref          = useRef(null);
  const inView       = useInView(ref, { once: true, margin: threshold as `${number}px` });
  const reducedMotion = useReducedMotion();

  /* If reduced motion is preferred, render children instantly */
  if (reducedMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  const variants = buildVariant(direction, distance, duration);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
