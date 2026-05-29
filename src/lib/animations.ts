/**
 * Framer Motion animation variants — shared across all components.
 * Import from here; never define inline variants in components.
 *
 * Philosophy (per HANDOVER.md §7):
 * - Slow, architectural, never bouncy
 * - Only transform + opacity (GPU-composited)
 * - Triggered by scroll, not on-load loops
 */
import type { Variants } from "framer-motion";

export const EASE_OUT      = [0.16, 1, 0.3, 1]  as const;
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_GENTLE   = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUp: Variants = {
  hidden:  { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1 },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const slideRight: Variants = {
  hidden:  { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
};

export const cardReveal: Variants = {
  hidden:  { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const heroReveal: Variants = {
  hidden:  { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const cardGridStagger = stagger(0.09, 0.05);
export const listStagger = stagger(0.07, 0);
export const featureStagger = stagger(0.12, 0.1);

export const itemReveal: Variants = {
  hidden:  { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const itemLeft: Variants = {
  hidden:  { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const itemRight: Variants = {
  hidden:  { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const lineGrow: Variants = {
  hidden:  { scaleX: 1, opacity: 1 },
  visible: { scaleX: 1, opacity: 1 },
};

export const lineGrowVertical: Variants = {
  hidden:  { scaleY: 1 },
  visible: { scaleY: 1 },
};

export const statReveal: Variants = {
  hidden:  { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const quoteFade: Variants = {
  hidden:  { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
};
