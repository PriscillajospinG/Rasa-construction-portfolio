"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Container from "@/components/layout/Container";
import { testimonials } from "@/data/testimonials";

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="var(--clr-accent)" color="var(--clr-accent)" />
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
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "3px", marginBottom: "var(--s1)" }}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="var(--clr-accent)" color="var(--clr-accent)" />)}
              </div>
              <div className="font-m text-white" style={{ fontWeight: 900, fontSize: "var(--t-h2)" }}>4.9 / 5.0</div>
              <div className="t-sm" style={{ color: "rgba(255,255,255,0.38)", marginTop: "2px" }}>300+ client reviews</div>
            </div>
          </div>
        </Reveal>

        {/* ── Tier 1: Featured testimonial — full width, cinematic ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{
            position: "relative",
            borderRadius: "var(--r-xl)",
            padding: "var(--s8)",
            background: "rgba(216,185,163,0.06)",
            border: "1px solid rgba(216,185,163,0.15)",
            marginBottom: "var(--s4)",
            overflow: "hidden",
          }}>
          {/* Giant background quote mark */}
          <div className="absolute" style={{ top: "-1rem", right: "var(--s4)", fontSize: "18rem", fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: "rgba(216,185,163,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>"</div>

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
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, var(--clr-primary-mid), var(--clr-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "white", marginBottom: "var(--s2)" }}>
                {featured.initials}
              </div>
              <div className="font-p text-white" style={{ fontWeight: 700, fontSize: "var(--t-sm)" }}>{featured.name}</div>
              <div className="t-sm" style={{ color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>{featured.role}</div>
            </div>
          </div>
        </motion.div>

        {/* ── Tier 2: Prominent pair — 2-col, medium weight ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s3)", marginBottom: "var(--s4)" }}
          className="grid-cols-1 md:grid-cols-2">
          {prominent.map(({ id, name, role, rating, text, initials }, i) => (
            <motion.div key={id}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-dark"
              style={{ padding: "var(--s4)", borderLeft: "2px solid rgba(216,185,163,0.22)" }}>
              <Quote size={28} style={{ color: "rgba(216,185,163,0.10)", marginBottom: "var(--s3)" }} />
              <Stars count={rating} />
              <p className="t-sm" style={{ color: "rgba(255,255,255,0.68)", lineHeight: 1.78, margin: "var(--s3) 0" }}>
                &ldquo;{text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, var(--clr-primary-mid), var(--clr-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "white", flexShrink: 0 }}>{initials}</div>
                <div>
                  <div className="font-p text-white" style={{ fontWeight: 600, fontSize: "var(--t-sm)" }}>{name}</div>
                  <div className="t-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tier 3: Compact — minimal list, separated by thin rules ── */}
        <div style={{ borderTop: "1px solid rgba(216,185,163,0.10)", paddingTop: "var(--s4)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}
            className="grid-cols-1 md:grid-cols-3">
            {compact.map(({ id, name, role, rating, text, initials }, i) => (
              <motion.div key={id}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                style={{ padding: "var(--s4)", borderRight: i < compact.length - 1 ? "1px solid rgba(216,185,163,0.08)" : "none" }}>
                <Stars count={rating} />
                {/* Just the quote — no box, minimal treatment */}
                <p className="t-sm" style={{ color: "rgba(255,255,255,0.50)", lineHeight: 1.75, margin: "var(--s2) 0 var(--s3)" }}>
                  &ldquo;{text.slice(0, 120)}{text.length > 120 ? "…" : ""}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(216,185,163,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "var(--clr-accent)" }}>{initials}</div>
                  <div>
                    <div className="font-p" style={{ fontWeight: 600, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)" }}>{name}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.30)", fontFamily: "'Inter',sans-serif" }}>{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
