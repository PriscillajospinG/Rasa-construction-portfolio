"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children:   React.ReactNode;
  delay?:     number;
  direction?: "up" | "left" | "right" | "down";
  distance?:  number;
  duration?:  number;
  scale?:     boolean;
  threshold?: string;
  className?: string;
  style?:     React.CSSProperties;
}

/**
 * Premium scroll-triggered reveal animation.
 * Fires once when element enters the viewport.
 * Respects prefers-reduced-motion automatically.
 *
 * Default: fade + translateY(40px → 0) + scale(0.98 → 1), 850ms
 * Pass direction="left" | "right" for horizontal slides.
 */
export default function Reveal({
  children,
  delay     = 0,
  direction = "up",
  distance  = 40,
  duration  = 0.85,
  scale     = true,
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

  const getInitial = () => {
    const base = {
      opacity: 0,
      ...(scale ? { scale: 0.98 } : {}),
    };
    switch (direction) {
      case "left":  return { ...base, x: -distance, y: 0 };
      case "right": return { ...base, x:  distance, y: 0 };
      case "down":  return { ...base, x: 0, y: -distance };
      default:      return { ...base, x: 0, y:  distance };
    }
  };

  const getAnimate = () => {
    const base = {
      opacity: 1,
      ...(scale ? { scale: 1 } : {}),
      x: 0,
      y: 0,
    };
    return base;
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
