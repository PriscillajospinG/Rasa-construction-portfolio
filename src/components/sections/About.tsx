"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const val    = useMotionValue(0);
  const spring = useSpring(val, { duration: 1800, bounce: 0 });
  const inView = useInView(ref, { once: true });
  useEffect(() => { if (inView) val.set(target); }, [inView, val, target]);
  useEffect(() => spring.on("change", (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const highlights = [
  "Safety-first — all equipment load-tested before every deployment",
  "Experienced team with deep regional construction knowledge",
  "Competitive rental pricing with zero hidden fees",
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: "white" }} ref={ref}>
      {/* Curve from hero — fill matches THIS section bg (white) */}
      <div className="curve">
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,72 C360,0 1080,0 1440,72 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* ── Zone 1: Editorial header — full width, architectural ── */}
      <Container>
        <div style={{ paddingTop: "var(--s12)", paddingBottom: "var(--s8)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "end", gap: "var(--s8)" }}
            className="grid-cols-1 lg:grid-cols-2">
            {/* Left: decorative number as visual anchor */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <div className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>Our Story</div>
              {/* Oversized editorial number */}
              <div style={{ position: "relative", lineHeight: 0.85 }}>
                <span className="font-m" style={{ fontSize: "clamp(7rem, 18vw, 14rem)", fontWeight: 900, color: "rgba(8,51,53,0.07)", letterSpacing: "-0.04em", userSelect: "none", display: "block" }}>
                  15
                </span>
                {/* Overlapping label */}
                <div className="absolute" style={{ bottom: "0.5rem", left: "0.75rem" }}>
                  <div className="font-m" style={{ fontSize: "var(--t-h2)", fontWeight: 700, color: "var(--clr-primary)", letterSpacing: "-0.01em" }}>
                    Years of
                  </div>
                  <div className="t-label" style={{ color: "var(--clr-accent-dk)", letterSpacing: "0.2em" }}>
                    Field Experience
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: headline */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="t-h1" style={{ color: "var(--clr-primary)", lineHeight: 1.05 }}>
                A construction partner<br />you can genuinely<br /><em className="t-italic-dark">count on.</em>
              </h2>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* ── Dividing rule — architectural accent ── */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(8,51,53,0.12) 20%, rgba(8,51,53,0.12) 80%, transparent)" }} />

      {/* ── Zone 2: Content — 4/8 offset composition ── */}
      <Container>
        <div style={{ paddingTop: "var(--s12)", paddingBottom: "var(--s16)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "var(--s8)", alignItems: "start" }}
            className="grid-cols-1 lg:grid-cols-[4fr_8fr]">

            {/* Left: vertical stat strip */}
            <Reveal direction="left">
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s6)", paddingTop: "var(--s4)", borderLeft: "2px solid rgba(8,51,53,0.10)", paddingLeft: "var(--s4)" }}>
                {[
                  { n: "500+", l: "Completed Projects" },
                  { n: "300+", l: "Satisfied Clients" },
                  { n: "100+", l: "Equipment Units" },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <div className="font-m" style={{ fontSize: "2rem", fontWeight: 900, color: "var(--clr-primary)", lineHeight: 1 }}>{n}</div>
                    <div className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)", lineHeight: 1.4 }}>{l}</div>
                  </div>
                ))}

                <Button href="#contact" variant="dark" size="sm"
                  onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                  style={{ marginTop: "var(--s3)" }}>
                  Talk to us →
                </Button>
              </div>
            </Reveal>

            {/* Right: image + body composition */}
            <Reveal direction="right">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s4)", alignItems: "start" }}>
                {/* Image block */}
                <div style={{ position: "relative", gridColumn: "1 / -1" }}>
                  {/* Main image — wide crop, architectural */}
                  <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--sh-xl)" }}>
                    <Image src="/team/about-team.png" alt="Rasa Construction team reviewing site plans"
                      fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,31,33,0.70) 0%, transparent 55%)" }} />
                    {/* Overlapping caption — left-anchored, editorial */}
                    <div className="absolute" style={{ top: "50%", left: "var(--s4)", transform: "translateY(-50%)", maxWidth: "260px" }}>
                      <div className="t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s1)" }}>Founded by</div>
                      <div className="font-m text-white" style={{ fontSize: "var(--t-h2)", fontWeight: 800, lineHeight: 1.2 }}>
                        {company.owner}
                      </div>
                      <div className="t-sm" style={{ color: "rgba(255,255,255,0.60)", marginTop: "var(--s1)" }}>
                        {company.location.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pull quote — left col */}
                <div style={{ paddingTop: "var(--s4)", borderTop: "2px solid rgba(8,51,53,0.08)" }}>
                  <p className="font-m" style={{ fontSize: "var(--t-body)", fontStyle: "italic", fontWeight: 700, color: "var(--clr-primary)", lineHeight: 1.4, marginBottom: "var(--s3)" }}>
                    "We don't just supply equipment — we're on-site partners."
                  </p>
                  <div className="t-label" style={{ color: "var(--clr-text-lt)" }}>— Gurusamy A, Founder</div>
                </div>

                {/* Highlights — right col */}
                <div style={{ paddingTop: "var(--s4)", borderTop: "2px solid rgba(8,51,53,0.08)" }}>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--s3)" }}>
                    {highlights.map((pt) => (
                      <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "var(--s2)" }}>
                        <CheckCircle2 size={16} style={{ color: "var(--clr-primary)", flexShrink: 0, marginTop: "3px" }} />
                        <span className="t-sm" style={{ color: "var(--clr-text-md)", lineHeight: 1.65 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
