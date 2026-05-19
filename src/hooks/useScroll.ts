"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollState {
  /** Pixels scrolled from top */
  scrollY:     number;
  /** True when scrolled past `threshold` */
  isScrolled:  boolean;
  /** Scroll direction since last movement */
  direction:   "up" | "down" | null;
}

/**
 * Tracks window scroll position.
 * @param threshold - pixels before `isScrolled` becomes true (default 50)
 */
export function useScroll(threshold = 50): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY:    0,
    isScrolled: false,
    direction:  null,
  });

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setState((prev) => ({
      scrollY:    y,
      isScrolled: y > threshold,
      direction:  y > prev.scrollY ? "down" : "up",
    }));
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return state;
}
