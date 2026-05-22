"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import RasaLogo from "@/components/ui/Logo";
import { company } from "@/data/company";

const MIN_DURATION = 2600; // ms — feel intentional, not instant
const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
  const [loaded,    setLoaded]    = useState(false);
  const [minPassed, setMinPassed] = useState(false);

  // Progress value 0 → 1 over MIN_DURATION
  const rawProgress = useMotionValue(0);
  const progress    = useSpring(rawProgress, { stiffness: 40, damping: 18 });

  useEffect(() => {
    // Lock scroll during loading
    document.body.classList.add("page-loading");

    // Drive progress bar animation
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      rawProgress.set(Math.min(elapsed / MIN_DURATION, 1));
      if (elapsed < MIN_DURATION) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    // Minimum duration gate
    const minTimer = setTimeout(() => setMinPassed(true), MIN_DURATION);

    // Natural "page ready" trigger — fires when JS hydration + fonts loaded
    const onReady = () => setLoaded(true);
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", onReady);
    };
  }, [rawProgress]);

  // Show loading until BOTH: page ready AND min duration elapsed
  const showLoading = !(loaded && minPassed);

  // Unlock scroll once loading exits
  useEffect(() => {
    if (!showLoading) {
      // Small delay lets the exit animation start before unlocking
      const t = setTimeout(() => document.body.classList.remove("page-loading"), 600);
      return () => clearTimeout(t);
    }
  }, [showLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && (
          <motion.div
            key="loading"
            className="loading-overlay"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.75, ease: EASE },
            }}
          >
            {/* ── Corner marks — architectural detail ── */}
            {[
              { top: "2rem", left: "2rem",   borderTop: "1px solid", borderLeft: "1px solid" },
              { top: "2rem", right: "2rem",  borderTop: "1px solid", borderRight: "1px solid" },
              { bottom: "2rem", left: "2rem",  borderBottom: "1px solid", borderLeft: "1px solid" },
              { bottom: "2rem", right: "2rem", borderBottom: "1px solid", borderRight: "1px solid" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE }}
                style={{
                  position:   "absolute",
                  width:      "28px",
                  height:     "28px",
                  borderColor: "rgba(216,185,163,0.22)",
                  ...s,
                }}
              />
            ))}

            {/* ── Main content — centered, architectural ── */}
            <div
              style={{
                position:      "relative",
                zIndex:        10,
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                gap:           "var(--s4)",
              }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.88 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              >
                <RasaLogo size="xl" variant="light" className="loading-logo" />
              </motion.div>

              {/* Thin separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                style={{
                  width:           "48px",
                  height:          "1px",
                  background:      "rgba(216,185,163,0.30)",
                  transformOrigin: "center",
                }}
              />

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="t-label"
                style={{
                  color:         "rgba(255,255,255,0.25)",
                  letterSpacing: "0.18em",
                  fontSize:      "0.58rem",
                }}
              >
                EST. {company.founded} &nbsp;·&nbsp; TAMIL NADU
              </motion.div>

              {/* ── Progress line ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                style={{ marginTop: "var(--s3)" }}
              >
                <div className="loading-progress-track">
                  <motion.div
                    className="loading-progress-fill"
                    style={{ scaleX: progress }}
                  />
                </div>
              </motion.div>
            </div>

            {/* ── Bottom tagline ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{
                position:  "absolute",
                bottom:    "2.5rem",
                left:      "50%",
                transform: "translateX(-50%)",
                zIndex:    10,
                textAlign: "center",
              }}
            >
              <div
                className="t-label"
                style={{
                  color:         "rgba(255,255,255,0.18)",
                  letterSpacing: "0.22em",
                  fontSize:      "0.55rem",
                }}
              >
                BUILDING STRENGTH · DELIVERING TRUST
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — fades in after loading exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        {children}
      </motion.div>
    </>
  );
}
