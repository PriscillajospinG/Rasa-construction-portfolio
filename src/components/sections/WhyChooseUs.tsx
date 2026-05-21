"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/animations/Reveal";
import { whyChooseUs } from "@/data/whyChooseUs";
import { cardGridStagger, itemReveal } from "@/lib/animations";

export default function WhyChooseUs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      ref={ref}
      style={{ background: "var(--clr-bg)", borderTop: "1px solid rgba(8,51,53,0.06)" }}
      className="section relative overflow-hidden"
    >
      {/* Faint radial glow — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%", left: "-10%",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,51,53,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container">
        {/* ── Header ── */}
        <Reveal threshold="-80px">
          <div style={{ maxWidth: "560px", marginBottom: "var(--s12)" }}>
            <div className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>
              Why Contractors Choose Rasa
            </div>
            <h2 className="t-h1" style={{ color: "var(--clr-primary)", lineHeight: 1.05 }}>
              Not just rental.<br />
              <em className="t-italic-dark">Dependable site support.</em>
            </h2>
            <p className="t-body" style={{ color: "var(--clr-text-md)", marginTop: "var(--s4)", lineHeight: 1.75, maxWidth: "480px" }}>
              Rasa Construction has been the first call for contractors across South Tamil Nadu because we treat each project
              as if our reputation depends on it — because it does.
            </p>
          </div>
        </Reveal>

        {/* ── 3×2 card grid — stagger container ── */}
        <motion.div
          className="why-us-grid"
          variants={cardGridStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {whyChooseUs.map(({ id, title, description, stat }) => {
            return (
              <motion.div
                key={id}
                variants={itemReveal}
                className="group why-us-card card-hover"
              >
                {/* 1. Metric / small label */}
                {stat && (
                  <span
                    className="t-label"
                    style={{
                      color:         "var(--clr-accent-dk)",
                      display:       "block",
                      marginBottom:  "var(--s2)",
                    }}
                  >
                    {stat}
                  </span>
                )}

                {/* 2. Main title */}
                <h3
                  className="font-p"
                  style={{
                    fontWeight:    700,
                    fontSize:      "var(--t-body)",
                    color:         "var(--clr-text)",
                    marginBottom:  "var(--s2)",
                    lineHeight:    1.35,
                  }}
                >
                  {title}
                </h3>

                {/* 3. Description */}
                <p
                  className="t-sm"
                  style={{
                    color:         "var(--clr-text-md)",
                    lineHeight:    1.7,
                  }}
                >
                  {description}
                </p>

                {/* Spacer that pushes the accent line to the bottom */}
                <div style={{ flexGrow: 1, minHeight: "var(--s4)" }} />

                {/* Bottom accent line — slides in on hover */}
                <div
                  className="group-hover:opacity-100 group-hover:[transform:scaleX(1)] transition-all duration-500"
                  style={{
                    height:          "2px",
                    background:      "linear-gradient(90deg, var(--clr-primary), var(--clr-accent))",
                    borderRadius:    "1px",
                    opacity:         0,
                    transform:       "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
