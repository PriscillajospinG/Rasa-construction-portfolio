"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/animations/Reveal";
import Container from "@/components/layout/Container";
import { processSteps } from "@/data/process";

export default function Process() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={ref}
      style={{ background: "var(--clr-primary-dark)", position: "relative", overflow: "hidden" }}
      className="grain"
    >
      {/* Architectural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,185,163,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Radial glow — right side */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", right: "-5%",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,51,53,0.60) 0%, transparent 70%)",
        }}
      />

      <Container section>
        {/* ── Header ── */}
        <Reveal>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s8)", alignItems: "end", marginBottom: "var(--s12)" }}
            className="grid-cols-1 lg:grid-cols-2"
          >
            <div>
              <div className="eyebrow t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s3)" }}>How We Work</div>
              <h2 className="t-h1 text-white" style={{ lineHeight: 1.05 }}>
                From enquiry<br />
                <span className="gradient-text">to completion.</span>
              </h2>
            </div>
            <p className="t-body" style={{ color: "rgba(255,255,255,0.52)", lineHeight: 1.75 }}>
              Every Rasa project follows the same disciplined sequence — so your timeline stays intact
              and nothing is left to chance on site.
            </p>
          </div>
        </Reveal>

        {/* ── Step timeline ── */}
        <div style={{ position: "relative" }}>
          {/* Connecting line */}
          <div
            className="absolute"
            style={{
              top: "28px",
              left: "calc(var(--s4) + 14px)",
              bottom: "28px",
              width: "1px",
              background: "linear-gradient(to bottom, rgba(216,185,163,0.18), rgba(216,185,163,0.04) 90%)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s6)" }}>
            {processSteps.map(({ step, label, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "grid", gridTemplateColumns: "var(--s8) 1fr", gap: "var(--s6)", alignItems: "start" }}
              >
                {/* Step circle */}
                <div
                  style={{
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    background: i === 0
                      ? "var(--clr-accent)"
                      : "rgba(216,185,163,0.12)",
                    border: "1px solid rgba(216,185,163,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  <span
                    className="font-m"
                    style={{
                      fontSize:   "0.65rem",
                      fontWeight: 800,
                      color:      i === 0 ? "var(--clr-primary-dark)" : "rgba(216,185,163,0.60)",
                    }}
                  >
                    {step}
                  </span>
                </div>

                {/* Step content */}
                <div style={{ paddingTop: "2px" }}>
                  <h3
                    className="font-p"
                    style={{
                      fontWeight:   700,
                      fontSize:     "var(--t-body)",
                      color:        "white",
                      marginBottom: "var(--s1)",
                      lineHeight:   1.3,
                    }}
                  >
                    {label}
                  </h3>
                  <p
                    className="t-sm"
                    style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}
                  >
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
