"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children:   React.ReactNode;
  delay?:     number;
  direction?: string;
  distance?:  number;
  duration?:  number;
  threshold?: string;
  className?: string;
  style?:     React.CSSProperties;
}

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Fires once when element enters the viewport.
 * Respects prefers-reduced-motion automatically.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  style,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
