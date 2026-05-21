"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stagger, itemReveal } from "@/lib/animations";
import type { Variants } from "framer-motion";

interface StaggerRevealProps {
  children:       React.ReactNode;
  /** Delay between each child appearing (seconds) */
  staggerDelay?:  number;
  /** Initial delay before first child animates (seconds) */
  delayChildren?: number;
  /** Intersection observer margin before triggering */
  threshold?:     string;
  className?:     string;
  style?:         React.CSSProperties;
  /** Override the child animation variant */
  itemVariant?:   Variants;
}

/**
 * Stagger reveal container — each direct `<StaggerReveal.Item>` child
 * animates in sequentially as the container enters the viewport.
 *
 * Usage:
 *   <StaggerReveal staggerDelay={0.09}>
 *     <StaggerReveal.Item>Card 1</StaggerReveal.Item>
 *     <StaggerReveal.Item>Card 2</StaggerReveal.Item>
 *   </StaggerReveal>
 *
 * Or wrap raw motion.div children that have variants set:
 *   <StaggerReveal staggerDelay={0.1}>
 *     {items.map(i => (
 *       <motion.div key={i.id} variants={itemReveal}>...</motion.div>
 *     ))}
 *   </StaggerReveal>
 */
export default function StaggerReveal({
  children,
  staggerDelay  = 0.09,
  delayChildren = 0,
  threshold     = "-60px",
  className,
  style,
}: StaggerRevealProps) {
  const ref           = useRef(null);
  const inView        = useInView(ref, { once: true, margin: threshold as `${number}px` });
  const reducedMotion = useReducedMotion();

  const containerVariants = stagger(
    reducedMotion ? 0 : staggerDelay,
    reducedMotion ? 0 : delayChildren
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggerReveal.Item — convenience sub-component ── */
function StaggerItem({
  children,
  className,
  style,
}: {
  children:   React.ReactNode;
  className?: string;
  style?:     React.CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={itemReveal}>
      {children}
    </motion.div>
  );
}

StaggerReveal.Item = StaggerItem;
