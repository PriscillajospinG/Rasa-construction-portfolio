"use client";

import { useEffect, useRef } from "react";

interface ParallaxProps {
  children:  React.ReactNode;
  /** Parallax speed factor: 0 = none, 0.5 = half speed (default 0.35) */
  speed?:    number;
  className?: string;
}

/**
 * Applies a CSS translateY parallax to its children based on scroll position.
 * Uses a ref to avoid React re-renders on every scroll tick.
 */
export default function Parallax({ children, speed = 0.35, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * speed}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
