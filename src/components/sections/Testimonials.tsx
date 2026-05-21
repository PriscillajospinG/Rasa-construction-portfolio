"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Container from "@/components/layout/Container";
import { testimonials } from "@/data/testimonials";
import { cardGridStagger, itemReveal, quoteFade, heroReveal, EASE_CINEMATIC } from "@/lib/animations";

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.06, ease: EASE_CINEMATIC }}
        >
          <Star size={12} fill="var(--clr-accent)" color="var(--clr-accent)" />
        </motion.div>
      ))}
    </div>
  );
}

// Split testimonials into three tiers for visual variety
const featured   = testimonials[0]; // Full-width, large type
const prominent  = testimonials.slice(1, 3); // Mid-size, 2-col
const compact    = testimonials.slice(3); // Minimal list treatment

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="relative overflow-hidden grain"
      style={{ background: "linear-gradient(160deg, var(--clr-primary-dark) 0%, var(--clr-primary) 60%, var(--clr-primary-dark) 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(216,185,163,0.06) 0%, transparent 60%)" }} />

      <Container section ref={ref}>
        {/* ── Header ── */}
        <Reveal style={{ marginBottom: "var(--s12)" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)" }}>
            <div>
              <div className="eyebrow t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s3)" }}>Client Testimonials</div>
              <h2 className="t-h1 text-white">What our clients say</h2>
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
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.35 + i * 0.07, ease: EASE_CINEMATIC }}
                  >
                    <Star size={16} fill="var(--clr-accent)" color="var(--clr-accent)" />
                  </motion.div>
                ))}
              </div>
              <div className="font-m text-white" style={{ fontWeight: 900, fontSize: "var(--t-h2)" }}>4.9 / 5.0</div>
              <div className="t-sm" style={{ color: "rgba(255,255,255,0.38)", marginTop: "2px" }}>Across 300+ completed projects</div>
            </motion.div>
          </div>
        </Reveal>

        {/* ── Tier 1: Featured testimonial — full width, cinematic ── */}
        <motion.div
          variants={heroReveal}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            position:     "relative",
            borderRadius: "var(--r-xl)",
            padding:      "var(--s8)",
            background:   "rgba(216,185,163,0.06)",
            border:       "1px solid rgba(216,185,163,0.15)",
            marginBottom: "var(--s4)",
            overflow:     "hidden",
          }}
        >
          {/* Giant background quote mark — fades in after card */}
          <motion.div
            className="absolute"
            style={{ top: "-1rem", right: "var(--s4)", fontSize: "18rem", fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: "rgba(216,185,163,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}
            variants={quoteFade}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            &ldquo;
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--s8)", alignItems: "end" }}
            className="grid-cols-1 lg:grid-cols-[1fr_auto]">
            <div>
              <Stars count={featured.rating} />
              <p className="font-m text-white"
                style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)", fontWeight: 600, lineHeight: 1.6, marginTop: "var(--s4)", marginBottom: "var(--s6)", fontStyle: "italic" }}>
                &ldquo;{featured.text}&rdquo;
              </p>
            </div>
            {/* Author — pulled to bottom-right */}
            <div style={{ flexShrink: 0, borderLeft: "1px solid rgba(216,185,163,0.20)", paddingLeft: "var(--s6)", minWidth: "200px" }}>
              <motion.div
                style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, var(--clr-primary-mid), var(--clr-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "white", marginBottom: "var(--s2)" }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.4, ease: EASE_CINEMATIC }}
              >
                {featured.initials}
              </motion.div>
              <div className="font-p text-white" style={{ fontWeight: 700, fontSize: "var(--t-sm)" }}>{featured.name}</div>
              <div className="t-sm" style={{ color: "rgba(255,255,255,0.50)", marginTop: "2px" }}>{featured.role}</div>
              {featured.location && (
                <div className="t-label" style={{ color: "rgba(216,185,163,0.50)", marginTop: "4px", fontSize: "0.6rem" }}>{featured.location}</div>
              )}
              {featured.project && (
                <div className="t-sm" style={{ color: "rgba(216,185,163,0.40)", marginTop: "var(--s2)", fontSize: "0.72rem", fontStyle: "italic", borderTop: "1px solid rgba(216,185,163,0.12)", paddingTop: "var(--s2)" }}>
                  Project: {featured.project}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Tier 2: Prominent pair — stagger ── */}
        <motion.div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s3)", marginBottom: "var(--s4)" }}
          className="grid-cols-1 md:grid-cols-2"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {prominent.map(({ id, name, role, location, project, rating, text, initials }) => (
            <motion.div key={id}
              variants={itemReveal}
              className="card-dark group"
              style={{ padding: "var(--s4)", borderLeft: "2px solid rgba(216,185,163,0.22)" }}>
              <Quote size={28} style={{ color: "rgba(216,185,163,0.10)", marginBottom: "var(--s3)" }} />
              <Stars count={rating} />
              <p className="t-sm" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.78, margin: "var(--s3) 0" }}>
                &ldquo;{text}&rdquo;
              </p>
              {project && (
                <div className="t-label" style={{ color: "rgba(216,185,163,0.40)", fontSize: "0.58rem", marginBottom: "var(--s3)", fontStyle: "italic" }}>
                  {project}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, var(--clr-primary-mid), var(--clr-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "white", flexShrink: 0 }}>{initials}</div>
                <div>
                  <div className="font-p text-white" style={{ fontWeight: 600, fontSize: "var(--t-sm)" }}>{name}</div>
                  <div className="t-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{role}{location ? ` · ${location}` : ""}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tier 3: Compact — stagger fade ── */}
        <div style={{ borderTop: "1px solid rgba(216,185,163,0.10)", paddingTop: "var(--s4)" }}>
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}
            className="grid-cols-1 md:grid-cols-3"
            variants={cardGridStagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {compact.map(({ id, name, role, location, rating, text, initials }) => (
              <motion.div key={id}
                variants={itemReveal}
                style={{ padding: "var(--s4)", borderRight: "1px solid rgba(216,185,163,0.08)" }}
              >
                <Stars count={rating} />
                <p className="t-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "var(--s2) 0 var(--s3)" }}>
                  &ldquo;{text.slice(0, 160)}{text.length > 160 ? "…" : ""}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(216,185,163,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "var(--clr-accent)" }}>{initials}</div>
                  <div>
                    <div className="font-p" style={{ fontWeight: 600, fontSize: "0.75rem", color: "rgba(255,255,255,0.70)" }}>{name}</div>
                    <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.32)", fontFamily: "'Inter',sans-serif" }}>{role}{location ? ` · ${location}` : ""}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
