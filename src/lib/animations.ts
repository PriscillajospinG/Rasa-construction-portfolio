/**
 * Framer Motion animation variants — shared across all components.
 * Import from here; never define inline variants in components.
 *
 * Philosophy (per HANDOVER.md §7):
 * - Slow, architectural, never bouncy
 * - Only transform + opacity (GPU-composited)
 * - Triggered by scroll, not on-load loops
 *
 * Easing: cubic-bezier(0.22, 1, 0.36, 1) — the premium standard
 * Duration: 600–1000ms
 */
import type { Variants } from "framer-motion";

export const EASE_OUT       = [0.16, 1, 0.3, 1]  as const;
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_GENTLE    = [0.25, 0.46, 0.45, 0.94] as const;

/** Standard scroll-reveal: fade + rise + scale */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_CINEMATIC },
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.75, ease: EASE_CINEMATIC },
  },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: EASE_CINEMATIC },
  },
};

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: EASE_CINEMATIC },
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: EASE_CINEMATIC },
  },
};

/** Card entrance: fade + rise + subtle scale */
export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE_CINEMATIC },
  },
};

export const heroReveal: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_CINEMATIC },
  },
};

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Card grids: 120ms stagger between cards (per spec) */
export const cardGridStagger = stagger(0.12, 0.05);
export const listStagger     = stagger(0.08, 0);
export const featureStagger  = stagger(0.13, 0.1);

/** Individual item in a staggered grid */
export const itemReveal: Variants = {
  hidden:  { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_CINEMATIC },
  },
};

export const itemLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_CINEMATIC },
  },
};

export const itemRight: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_CINEMATIC },
  },
};

export const lineGrow: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_CINEMATIC },
  },
};

export const lineGrowVertical: Variants = {
  hidden:  { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.9, ease: EASE_CINEMATIC },
  },
};

export const statReveal: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_CINEMATIC },
  },
};

export const quoteFade: Variants = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};
