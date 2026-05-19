/** Utility helpers — pure functions, no side-effects */

/**
 * Smooth-scroll to a page section by its href (e.g. "#about").
 * Safe to call from any onClick handler.
 */
export function scrollTo(href: string): void {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Clamp a number between min and max.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Build a WhatsApp deep-link with an optional pre-filled message.
 */
export function waLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Merge class strings (drops falsy values).
 */
export function cx(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
