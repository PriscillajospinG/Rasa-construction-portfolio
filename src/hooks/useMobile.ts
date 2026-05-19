"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants";

/**
 * Returns true when viewport width is below the given breakpoint.
 * @param breakpoint - key from BREAKPOINTS (default "lg")
 */
export function useMobile(breakpoint: keyof typeof BREAKPOINTS = "lg"): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`);
    setIsMobile(query.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
