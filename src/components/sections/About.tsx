"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef   = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start end", "end start"],
  });

  /* Emerging scroll transforms for the floating card */
  const cardY       = useTransform(scrollYProgress, [0.08, 0.35], [140, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.08, 0.32], [0, 1]);
  const cardScale   = useTransform(scrollYProgress, [0.08, 0.35], [0.95, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative overflow-visible concrete-grid-bg"
    >
      {/* ── 1. BACKGROUND LAYER ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "transparent",
          zIndex: 1,
        }}
        aria-hidden
      />

      {/* ── 2. GRAIN TEXTURE CONTINUITY ── */}
      <div
        className="absolute inset-0 grain pointer-events-none"
        style={{
          zIndex: 2,
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.15) 25%, transparent 50%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.15) 25%, transparent 50%)",
        }}
        aria-hidden
      />

      {/* ── 3. ARCHITECTURAL GRID CONTINUITY ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,185,163,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          zIndex: 2,
          maskImage:
            "linear-gradient(to bottom right, black 0%, rgba(0,0,0,0.2) 20%, transparent 45%)",
          WebkitMaskImage:
            "linear-gradient(to bottom right, black 0%, rgba(0,0,0,0.2) 20%, transparent 45%)",
        }}
        aria-hidden
      />

      {/* ── Zone 1: Editorial Header ── */}
      <div className="container relative z-10 py-[var(--s6)]">
        <motion.div
          style={{
            y:              cardY,
            opacity:        cardOpacity,
            scale:          cardScale,
            background:     "rgba(8, 51, 53, 0.95)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border:         "1px solid rgba(216, 185, 163, 0.22)",
            borderRadius:   "var(--r-xl)",
            padding:        "var(--s8) var(--s8)",
            boxShadow:      "0 40px 110px rgba(0, 0, 0, 0.55)",
            position:       "relative",
            zIndex:         10,
            marginTop:      "0rem",
          }}
          className="about-story-card p-6 md:p-12"
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1.1fr 1.9fr", alignItems: "center", gap: "var(--s8)" }}
            className="grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] about-hero-grid"
          >
            {/* Left: stats / number */}
            <div>
              <div className="eyebrow t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s3)" }}>Our Story</div>
              <div style={{ position: "relative", lineHeight: 0.85 }}>
                <span className="font-m" style={{ fontSize: "clamp(6rem, 15vw, 11rem)", fontWeight: 900, color: "rgba(216, 185, 163, 0.08)", letterSpacing: "-0.04em", userSelect: "none", display: "block" }}>
                  25
                </span>
                <div className="absolute" style={{ bottom: "0.5rem", left: "0.75rem" }}>
                  <div className="font-m text-white" style={{ fontSize: "var(--t-h2)", fontWeight: 700, letterSpacing: "-0.01em" }}>
                    25+ Years of
                  </div>
                  <div className="t-label" style={{ color: "var(--clr-accent)", letterSpacing: "0.2em" }}>
                    Field Experience
                  </div>
                </div>
              </div>
            </div>

            {/* Right: story intro text */}
            <div>
              <h2 className="t-h1 text-white" style={{ lineHeight: 1.08, marginBottom: "var(--s4)" }}>
                {company.story.headline.split(".")[0]}.<br />
                <span style={{ color: "var(--clr-accent)" }}>{company.story.headline.split(".")[1]?.trim()}</span>
              </h2>
              <p className="t-body" style={{ color: "rgba(255, 255, 255, 0.72)", lineHeight: 1.75 }}>
                {company.story.paragraphs[0]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spacing trigger for Zone 2 fade in */}
      <div ref={triggerRef} style={{ height: "1px" }} />

      {/* Architectural divider — inside the light/white area */}
      <div
        className="relative z-10"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(8,51,53,0.10) 20%, rgba(8,51,53,0.10) 80%, transparent)",
          marginTop: "var(--s12)",
        }}
      />

      {/* ── Zone 2: Content (Light background, details) ── */}
      <div className="container relative z-10">
        <div style={{ paddingTop: "var(--s10)", paddingBottom: "var(--s16)" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "var(--s8)", alignItems: "start" }}
            className="grid-cols-1 lg:grid-cols-[4fr_8fr] about-info-grid"
          >
            {/* Left Column: Core Stats (Industrial Timeline) */}
            <Reveal direction="left">
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s6)", paddingTop: "var(--s4)", borderLeft: "2px solid #D8B9A3", paddingLeft: "var(--s6)", position: "relative" }}>
                {[
                  { n: "25+",  l: "Years Field Experience" },
                  { n: "500+", l: "Completed Projects" },
                  { n: "100+", l: "Equipment Units" },
                  { n: "300+", l: "Satisfied Clients" },
                ].map(({ n, l }) => (
                  <div key={l} style={{ position: "relative" }}>
                    {/* Timeline bullet */}
                    <div style={{
                      position: "absolute",
                      left: "-55px",
                      top: "22px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#D8B9A3",
                      border: "3px solid #083335",
                      zIndex: 5,
                    }} />
                    <div className="card" style={{ padding: "16px 20px", background: "#FFFFFF", border: "1px solid rgba(8,51,53,0.08)" }}>
                      <div className="font-m" style={{ fontSize: "1.75rem", fontWeight: 900, color: "#083335", lineHeight: 1 }}>{n}</div>
                      <div className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "4px", lineHeight: 1.4 }}>{l}</div>
                    </div>
                  </div>
                ))}

                <Button href="#contact" variant="dark" size="sm"
                  onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                  style={{ marginTop: "var(--s1)" }}>
                  Request a Quote
                </Button>
              </div>
            </Reveal>

            {/* Right Column: Founder Quote, Images, Differentiators */}
            <Reveal direction="right">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s4)", alignItems: "start" }} className="about-details-grid">

                {/* Team Image Banner with Editorial Overlap */}
                <div style={{ gridColumn: "1 / -1", position: "relative", marginBottom: "var(--s8)" }}>
                  {/* Main Large Image */}
                  <div className="about-owner-image-wrapper" style={{ position: "relative", aspectRatio: "16/9", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--sh-xl)" }}>
                    <Image
                      src="/about/about-owner-site.jpg"
                      alt="Rasa Construction site photo showing the team and Rasa Name Board"
                      fill sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,31,33,0.75) 0%, transparent 55%)" }} />
                    
                    {/* Overlapping Caption */}
                    <div className="absolute about-owner-caption" style={{ top: "50%", left: "var(--s4)", transform: "translateY(-50%)", maxWidth: "260px" }}>
                      <div className="t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s1)" }}>Founded by</div>
                      <div className="font-m text-white" style={{ fontSize: "var(--t-h2)", fontWeight: 800, lineHeight: 1.2 }}>
                        {company.owner}
                      </div>
                      <div className="t-sm" style={{ color: "rgba(255,255,255,0.65)", marginTop: "var(--s1)" }}>
                        {company.location.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder Quote Block */}
                <div style={{ gridColumn: "1 / -1", paddingTop: "var(--s4)", borderTop: "2px solid rgba(8,51,53,0.08)" }}>
                  <p className="font-m" style={{ fontSize: "var(--t-body)", fontStyle: "italic", fontWeight: 700, color: "var(--clr-primary)", lineHeight: 1.5, marginBottom: "var(--s3)" }}>
                    &ldquo;{company.story.ownerQuote}&rdquo;
                  </p>
                  <div className="t-label" style={{ color: "var(--clr-text-lt)" }}>— {company.owner}, Founder</div>
                </div>

                {/* Differentiators Check List */}
                <div style={{ gridColumn: "1 / -1", paddingTop: "var(--s4)", borderTop: "2px solid rgba(8,51,53,0.08)" }}>
                  <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s3)" }} className="about-checklist-grid">
                    {company.differentiators.slice(0, 4).map(({ title, description }) => (
                      <li key={title} style={{ display: "flex", alignItems: "flex-start", gap: "var(--s2)" }}>
                        <CheckCircle2 size={15} style={{ color: "var(--clr-primary)", flexShrink: 0, marginTop: "3px" }} />
                        <div>
                          <div className="t-sm" style={{ color: "var(--clr-text)", fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
                          <div className="t-sm" style={{ color: "var(--clr-text-md)", lineHeight: 1.6, fontSize: "0.82rem" }}>{description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Narrative Paragraph */}
                <div style={{ gridColumn: "1 / -1", paddingTop: "var(--s4)", borderTop: "1px solid rgba(8,51,53,0.06)" }}>
                  <p className="t-body" style={{ color: "var(--clr-text-md)", lineHeight: 1.75 }}>
                    {company.story.paragraphs[1]}
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
