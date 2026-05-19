"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animateRing);

    // Scale ring on interactive elements
    const handleEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "60px";
        ringRef.current.style.height = "60px";
        ringRef.current.style.borderColor = "rgba(216,185,163,0.8)";
        ringRef.current.style.transform = `translate(${ringX - 30}px, ${ringY - 30}px)`;
      }
    };
    const handleLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = "#D8B9A3";
      }
    };

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ display: "none" }} />
      <div ref={ringRef} className="cursor-ring" style={{ display: "none" }} />
      <style>{`
        @media (pointer: fine) {
          .cursor-dot, .cursor-ring { display: block !important; }
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
