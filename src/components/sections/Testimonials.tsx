"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { testimonials } from "@/data/testimonials";
import { cardGridStagger, itemReveal, EASE_CINEMATIC } from "@/lib/animations";

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <Star size={12} fill="var(--clr-accent)" color="var(--clr-accent)" />
        </div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="section relative overflow-hidden dark-section section-transition"
      style={{ background: "#06282A" }}
    >

      <div className="container" ref={ref}>
        {/* ── Section Header ── */}
        <Reveal className="section-header">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)" }}>
            <div>
              <p className="section-eyebrow">Client Testimonials</p>
              <h2 className="section-title">What our clients say</h2>
            </div>
            {/* Aggregate score — top right */}
            <motion.div
              style={{ textAlign: "right" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_CINEMATIC }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "3px", marginBottom: "var(--s1)" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i}>
                    <Star size={16} fill="var(--clr-accent)" color="var(--clr-accent)" />
                  </div>
                ))}
              </div>
              <div className="font-m text-white" style={{ fontSize: "var(--t-h2)" }}>4.9 / 5.0</div>
              <div className="t-sm" style={{ color: "rgba(255,255,255,0.38)", marginTop: "2px" }}>Across 300+ completed projects</div>
            </motion.div>
          </div>
        </Reveal>

        {/* ── Testimonials Bento Grid ── */}
        <motion.div
          className="bento-grid"
          variants={cardGridStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.slice(0, 3).map(({ id, name, role, location, project, rating, text, initials }, idx) => {
            // Bento sizing strategy:
            // 1st is featured large (span 8)
            // 2nd is standard (span 4)
            // 3rd is wide at bottom (span 12)
            const spanClass = idx === 0 
              ? "bento-card-wide md:col-span-8 col-span-12" 
              : idx === 1 
                ? "bento-card-md md:col-span-4 col-span-12" 
                : "md:col-span-12 col-span-12";
            
            const isLarge = idx === 0 || idx === 2;

            return (
              <motion.div
                key={id}
                variants={itemReveal}
                className={`bento-card bento-card-dark testimonial-card group ${spanClass}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "var(--s6)",
                  position: "relative"
                }}
              >
                {/* Background quote decoration for featured cards */}
                {isLarge && (
                  <div
                    className="absolute"
                    style={{
                      top: "-0.5rem",
                      right: "var(--s4)",
                      fontSize: "10rem",
                      fontFamily: "var(--font-heading), serif",
                      color: "rgba(216,185,163,0.03)",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none"
                    }}
                  >
                    &ldquo;
                  </div>
                )}

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--s3)" }}>
                    <Stars count={rating} />
                    <Quote size={20} style={{ color: "rgba(216,185,163,0.15)", flexShrink: 0 }} />
                  </div>

                  <p 
                    className="font-p text-white leading-relaxed italic"
                    style={{
                      fontSize: isLarge ? "clamp(1.1rem, 1.8vw, 1.35rem)" : "0.95rem",
                      marginBottom: "var(--s4)",
                      color: "rgba(255,255,255,0.92)"
                    }}
                  >
                    &ldquo;{text}&rdquo;
                  </p>
                </div>

                <div 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--s3)",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: "var(--s3)",
                    marginTop: "var(--s2)"
                  }}
                  className="testimonial-author-row"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--clr-primary-mid), var(--clr-accent))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        color: "white",
                        flexShrink: 0
                      }}
                    >
                      {initials}
                    </div>
                    <div>
                      <div className="font-p text-white" style={{ fontWeight: 650, fontSize: "0.88rem" }}>{name}</div>
                      <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {role}{location ? ` · ${location}` : ""}
                      </div>
                    </div>
                  </div>

                  {project && (
                    <div 
                      className="text-[10px] text-right hidden sm:block italic font-medium"
                      style={{ color: "rgba(216,185,163,0.65)", maxWidth: "240px", lineHeight: 1.3 }}
                    >
                      Project: {project}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
