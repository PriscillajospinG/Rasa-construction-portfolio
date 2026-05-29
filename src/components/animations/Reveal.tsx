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
  className,
  style,
}: RevealProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
