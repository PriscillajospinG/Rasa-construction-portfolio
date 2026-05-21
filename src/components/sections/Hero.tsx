"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhoneCall, ChevronDown } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

/* ─── ease ─────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;



export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end start"],
  });

  /* Photo drifts slightly slower than scroll — cinematic parallax */
  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%",  "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1,     1.05]);

  /* Hero content fades out and lifts up dynamically as the user scrolls */
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Hero — Rasa Construction"
      className="hero-section"
    >
      {/* ══ STICKY BACKGROUND LAYER ══════════════════════ */}
      <div className="hero-sticky-bg">
        {/* Background photo */}
        <motion.div
          style={{
            position: "absolute",
            inset:    "-10% 0",
            y:        imgY,
            scale:    imgScale,
          }}
          aria-hidden
        >
          <Image
            src="/hero/hero-site.jpg"
            alt="Rasa Construction active worksite in Tamil Nadu"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </motion.div>

        {/* Overlays */}
        <div className="hero-overlay" aria-hidden />

        {/* Top vignette — navbar legibility */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "10rem", background: "linear-gradient(to bottom, rgba(3,15,16,0.70) 0%, transparent 100%)", zIndex: 1 }}
          aria-hidden
        />

        {/* Soft bottom dark gradient — transitions photo into dark green */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "18rem",
            background: "linear-gradient(to top, rgba(3,15,16,1) 0%, rgba(3,15,16,0.6) 45%, transparent 100%)",
            zIndex: 1,
          }}
          aria-hidden
        />

        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none" style={{ zIndex: 1 }} aria-hidden />

        {/* Architectural grid — left third only */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(216,185,163,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.055) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "linear-gradient(to right, black 0%, rgba(0,0,0,0.5) 28%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, rgba(0,0,0,0.5) 28%, transparent 55%)",
            zIndex: 1,
          }}
          aria-hidden
        />

        {/* ══ CONTENT (Inside Sticky Wrapper) ══════════════ */}
        <motion.div
          className="container hero-content-container hero-inner"
          style={{
            y:        contentY,
            opacity:  contentOpacity,
          }}
        >
          {/* 12-Column Grid */}
          <div className="hero-content-grid">
            <div className="hero-content-col">
              
              {/* ── Eyebrow ── */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "var(--s2)",
                  marginBottom: "var(--hero-eyebrow-mb, var(--s2))",
                }}
              >
                <span
                  className="t-label"
                  style={{ color: "var(--clr-accent)", letterSpacing: "0.22em", fontSize: "0.62rem" }}
                >
                  RASA CONSTRUCTION&nbsp;&nbsp;·&nbsp;&nbsp;ACHANKUTTAM
                </span>
                <span
                  style={{
                    display:    "block",
                    width:      "2.5rem",
                    height:     "1px",
                    background: "var(--clr-accent)",
                    flexShrink: 0,
                  }}
                />
              </motion.div>

              {/* ── Headline ── */}
              <motion.h1
                initial={{ y: 24, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="font-m hero-title"
                style={{
                  fontSize:      "var(--hero-title-size, var(--t-hero))",
                  fontWeight:    900,
                  lineHeight:    "var(--hero-title-lh, 1.05)",
                  letterSpacing: "-0.03em",
                  color:         "white",
                  textShadow:    "0 2px 20px rgba(0,0,0,0.30)",
                  marginBottom:  "var(--hero-title-mb, var(--s2))",
                }}
              >
                Scaffolding, Centring <br className="hidden sm:inline" />
                &amp; Concrete Support <br className="hidden sm:inline" />
                Built for Real <span className="t-italic">Site Work.</span>
              </motion.h1>

              {/* ── Thin architectural separator ── */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease }}
                className="hero-separator"
                style={{
                  height:          "1px",
                  width:           "60%",
                  maxWidth:        "380px",
                  background:      "linear-gradient(to right, rgba(216,185,163,0.40), transparent)",
                  transformOrigin: "left",
                  marginBottom:    "var(--hero-sep-mb, var(--s2))",
                }}
                aria-hidden
              />

              {/* ── Subtext ── */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease }}
                className="hero-description"
                style={{
                  fontFamily:   "'Inter', sans-serif",
                  fontSize:     "var(--hero-desc-size, var(--t-sm))",
                  color:        "rgba(255,255,255,0.65)",
                  lineHeight:   1.78,
                  maxWidth:     "var(--hero-desc-max-w, 420px)",
                  marginBottom: "var(--hero-desc-mb, var(--s2))",
                }}
              >
                Rasa Construction provides dependable scaffolding materials, centring support,
                vertical hoist rental, and concrete work services for residential and commercial
                building sites across Tamil Nadu.
              </motion.p>

              {/* ── Trust line ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="hero-meta hero-trust"
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "var(--s2)",
                  marginBottom: "var(--hero-meta-mb, var(--s2))",
                }}
              >
                <span
                  className="t-label"
                  style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.62rem", letterSpacing: "0.12em" }}
                >
                  Led by {company.owner}&nbsp;&nbsp;·&nbsp;&nbsp;Direct site support&nbsp;&nbsp;·&nbsp;&nbsp;Tamil Nadu
                </span>
                <span
                  style={{
                    display:    "block",
                    width:      "1.25rem",
                    height:     "1px",
                    background: "rgba(216,185,163,0.40)",
                  }}
                  aria-hidden
                />
              </motion.div>

              {/* ── CTAs ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease }}
                className="hero-cta-wrapper hero-cta"
                style={{
                  display:      "flex",
                  flexWrap:     "wrap",
                  gap:          "var(--s2)",
                  marginBottom: "var(--hero-cta-mb, var(--s2))",
                }}
              >
                <button
                  onClick={() => scrollTo("#services")}
                  className="btn btn-primary"
                  style={{
                    padding:       "var(--s2) var(--s4)",
                    fontSize:      "var(--t-sm)",
                    fontWeight:    700,
                    letterSpacing: "0.02em",
                  }}
                >
                  View Services
                </button>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn btn-ghost"
                  style={{
                    padding:   "var(--s2) var(--s4)",
                    fontSize:  "var(--t-sm)",
                  }}
                >
                  Get a Quote
                </button>
              </motion.div>

              {/* ── Contact Phone Numbers ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="hero-phone"
                style={{
                  display:      "flex",
                  flexWrap:     "wrap",
                  alignItems:   "center",
                  gap:          "var(--s4)",
                  marginBottom: "var(--hero-phone-mb, var(--s2))",
                }}
              >
                {[company.contact.primary, company.contact.secondary].filter(Boolean).map((num) => (
                  <a
                    key={num}
                    href={`tel:${String(num).replace(/\s/g, "")}`}
                    className="link-underline"
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      gap:            "var(--s1)",
                      fontFamily:     "'Poppins', sans-serif",
                      fontWeight:     600,
                      fontSize:       "var(--t-sm)",
                      color:          "rgba(255,255,255,0.70)",
                      textDecoration: "none",
                      transition:     "color 220ms ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.70)"; }}
                  >
                    <PhoneCall size={13} style={{ color: "var(--clr-accent)", flexShrink: 0 }} />
                    {num}
                  </a>
                ))}
              </motion.div>

              {/* ── Stats / Service Highlights Strip ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="hero-stats-grid hero-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "var(--s4)",
                  borderTop: "1px solid rgba(216,185,163,0.13)",
                  paddingTop: "var(--hero-stats-pt, var(--s4))",
                  width: "100%",
                }}
              >
                {[
                  { num: "25+ Years", title: "Field Experience" },
                  { num: "Scaffolding", title: "& Centring Materials" },
                  { num: "Concrete", title: "Works & Support" },
                  { num: "Vertical", title: "Hoist Rental" },
                ].map(({ num, title }, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span className="font-m" style={{ color: "var(--clr-accent)", fontWeight: 900, fontSize: "1.05rem", lineHeight: 1.1 }}>
                      {num}
                    </span>
                    <span className="t-label" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {title}
                    </span>
                  </div>
                ))}
              </motion.div>

            </div>
            
            <div className="hidden lg:block" />
          </div>

          {/* ══ SCROLL CUE ════════════════════════════════════ */}
          <motion.button
            onClick={() => scrollTo("#about")}
            className="hero-scroll-cue"
            style={{
              opacity:       cueOpacity,
              position:      "absolute",
              bottom:        "var(--s8)",
              right:         0,
              zIndex:        10,
              background:    "none",
              border:        "none",
              cursor:        "pointer",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           "4px",
              color:         "rgba(255,255,255,0.30)",
            }}
            aria-label="Scroll down to About"
          >
            <span
              className="t-label"
              style={{ fontSize: "0.55rem", letterSpacing: "0.20em", writingMode: "vertical-rl" }}
            >
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
