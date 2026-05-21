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

/* ─── Easing curves ──────────────────────────────────────── */
export const EASE_OUT      = [0.16, 1, 0.3, 1]  as const;
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_GENTLE   = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── Base variants ──────────────────────────────────────── */

/** Fade up from below — universal scroll reveal */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

/** Fade in place — overlays, subtle reveals */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: "easeOut" } },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** Slide in from right */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** Scale in — no bounce, architectural */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_CINEMATIC } },
};

/** Soft scale from slightly below — for cards */
export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE_CINEMATIC } },
};

/** Hero-scale cinematic entrance — tall y travel, slow */
export const heroReveal: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE_CINEMATIC } },
};

/* ─── Stagger containers ─────────────────────────────────── */

/**
 * Stagger container variant.
 * Apply to the parent `motion.div`, then apply an item variant to each child.
 */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Standard stagger container for card grids */
export const cardGridStagger = stagger(0.09, 0.05);

/** Faster stagger for small items (timeline steps, list items) */
export const listStagger = stagger(0.07, 0);

/** Slow cinematic stagger for large feature reveals */
export const featureStagger = stagger(0.12, 0.1);

/* ─── Item variants (used inside stagger containers) ────── */

/** Universal stagger child — combines fadeUp with cardReveal feel */
export const itemReveal: Variants = {
  hidden:  { opacity: 0, y: 22, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_CINEMATIC } },
};

/** Stagger child from left */
export const itemLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/** Stagger child from right */
export const itemRight: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/* ─── Special effects ────────────────────────────────────── */

/** Architectural line grow from left (accent separators) */
export const lineGrow: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: EASE_CINEMATIC } },
};

/** Vertical connector line grow from top (timeline) */
export const lineGrowVertical: Variants = {
  hidden:  { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease: EASE_GENTLE } },
};

/** Stat/number reveal — slightly more dramatic upward travel */
export const statReveal: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_CINEMATIC } },
};

/** Quote mark large fade — for testimonial decorative marks */
export const quoteFade: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.0, ease: EASE_GENTLE, delay: 0.3 } },
};
