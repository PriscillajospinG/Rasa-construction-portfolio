"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhoneCall, ChevronDown } from "lucide-react";
import Image from "next/image";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

/* ─── ease ─────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── service tags shown in the bottom strip ───── */
const serviceTags = [
  "Scaffolding Rental",
  "Centring Materials",
  "Concrete Works",
  "Vertical Hoist Rental",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end start"],
  });

  /* Photo drifts slightly slower than scroll — cinematic */
  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%",  "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1,     1.06]);
  /* Content lifts with scroll */
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Hero — Rasa Construction"
      style={{
        position:        "relative",
        minHeight:       "100svh",
        display:         "flex",
        flexDirection:   "column",
        justifyContent:  "flex-end",
        overflow:        "hidden",
        background:      "#030f10",   /* shows while image loads */
      }}
    >
      {/* ══ BACKGROUND PHOTO ══════════════════════════════ */}
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
          src="/hero/hero.png"
          alt="Rasa Construction active worksite in Tamil Nadu"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
        />
      </motion.div>

      {/* ══ OVERLAYS ══════════════════════════════════════ */}
      {/* Primary — strong left darkness where text lives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(3,15,16,0.97) 0%, rgba(3,15,16,0.92) 28%, rgba(5,25,26,0.72) 52%, rgba(5,31,33,0.28) 75%, rgba(5,31,33,0.04) 100%)",
        }}
        aria-hidden
      />
      {/* Top vignette — navbar legibility */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "10rem", background: "linear-gradient(to bottom, rgba(3,15,16,0.70) 0%, transparent 100%)" }}
        aria-hidden
      />
      {/* Bottom fade — blends with next section */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "8rem", background: "linear-gradient(to top, #F7F5F2 0%, transparent 100%)" }}
        aria-hidden
      />

      {/* ══ GRAIN ═════════════════════════════════════════ */}
      <div className="absolute inset-0 grain pointer-events-none" aria-hidden />

      {/* ══ ARCHITECTURAL GRID — left third only ══════════ */}
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
        }}
        aria-hidden
      />

      {/* ══ CONTENT ═══════════════════════════════════════ */}
      <motion.div
        style={{
          y:        contentY,
          position: "relative",
          zIndex:   10,
          /* Container — left-anchored, not centered */
          maxWidth: "var(--container-max)",
          width:    "100%",
          margin:   "0 auto",
          padding:  "0 var(--container-px) var(--s12)",
        }}
      >
        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          "12px",
            marginBottom: "var(--s5)",
          }}
        >
          <span
            style={{
              display:    "block",
              width:      "2.5rem",
              height:     "1px",
              background: "var(--clr-accent)",
              flexShrink: 0,
            }}
          />
          <span
            className="t-label"
            style={{ color: "var(--clr-accent)", letterSpacing: "0.22em", fontSize: "0.62rem" }}
          >
            RASA CONSTRUCTION&nbsp;&nbsp;·&nbsp;&nbsp;ACHANKUTTAM
          </span>
        </motion.div>

        {/* ── Headline ── */}
        {/* Each line is independently animated for editorial feel */}
        <div style={{ marginBottom: "var(--s5)", overflow: "hidden" }}>
          {[
            { text: "Scaffolding, Centring",          delay: 0.30 },
            { text: "& Concrete Support",              delay: 0.42 },
            { text: "Built for Real",                  delay: 0.54 },
            { text: "Site\u00a0Work.",                 delay: 0.66, warm: true },
          ].map(({ text, delay, warm }) => (
            <div key={text} style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%",   opacity: 1 }}
                transition={{ duration: 0.9, delay, ease }}
                className="font-m"
                style={{
                  fontSize:      "var(--t-hero)",
                  fontWeight:    900,
                  lineHeight:    0.96,
                  letterSpacing: "-0.03em",
                  color:         warm ? "var(--clr-accent)" : "white",
                  display:       "block",
                  textShadow:    "0 2px 20px rgba(0,0,0,0.30)",
                }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* ── Thin architectural separator ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.80, ease }}
          style={{
            height:          "1px",
            width:           "60%",
            maxWidth:        "380px",
            background:      "linear-gradient(to right, rgba(216,185,163,0.40), transparent)",
            transformOrigin: "left",
            marginBottom:    "var(--s5)",
          }}
          aria-hidden
        />

        {/* ── Subtext ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88, ease }}
          style={{
            fontFamily:   "'Inter', sans-serif",
            fontSize:     "0.975rem",
            color:        "rgba(255,255,255,0.65)",
            lineHeight:   1.78,
            maxWidth:     "420px",
            marginBottom: "var(--s7)",
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
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          "10px",
            marginBottom: "var(--s7)",
          }}
        >
          <span
            style={{
              display:    "block",
              width:      "1.25rem",
              height:     "1px",
              background: "rgba(216,185,163,0.40)",
            }}
            aria-hidden
          />
          <span
            className="t-label"
            style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.62rem", letterSpacing: "0.12em" }}
          >
            Led by {company.owner}&nbsp;&nbsp;·&nbsp;&nbsp;Direct site support&nbsp;&nbsp;·&nbsp;&nbsp;Tamil Nadu
          </span>
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.08, ease }}
          style={{
            display:      "flex",
            flexWrap:     "wrap",
            gap:          "var(--s2)",
            marginBottom: "var(--s10)",
          }}
        >
          {/* Primary */}
          <a
            href={`tel:${company.contact.primary.replace(/\s/g, "")}`}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              padding:       "0.875rem 1.75rem",
              background:    "var(--clr-accent)",
              color:         "var(--clr-primary-dark)",
              borderRadius:  "var(--r-sm)",
              fontFamily:    "'Poppins', sans-serif",
              fontWeight:    700,
              fontSize:      "0.875rem",
              letterSpacing: "0.02em",
              textDecoration: "none",
              transition:    "background 220ms ease, transform 220ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e8c9af"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--clr-accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <PhoneCall size={15} />
            Call for Site Support
          </a>

          {/* Secondary */}
          <button
            onClick={() => scrollTo("#services")}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              padding:       "0.875rem 1.75rem",
              background:    "transparent",
              color:         "rgba(255,255,255,0.80)",
              border:        "1px solid rgba(255,255,255,0.22)",
              borderRadius:  "var(--r-sm)",
              fontFamily:    "'Poppins', sans-serif",
              fontWeight:    600,
              fontSize:      "0.875rem",
              cursor:        "pointer",
              transition:    "border-color 220ms ease, color 220ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(216,185,163,0.50)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.80)"; }}
          >
            View Services
          </button>
        </motion.div>

        {/* ══ BOTTOM STRIP — contact + service tags ════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{
            borderTop:  "1px solid rgba(216,185,163,0.13)",
            paddingTop: "var(--s4)",
            display:    "flex",
            flexWrap:   "wrap",
            alignItems: "center",
            gap:        "var(--s4)",
            justifyContent: "space-between",
          }}
        >
          {/* Phone numbers */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s4)" }}>
            {[company.contact.primary, company.contact.secondary].map((num) => (
              <a
                key={num}
                href={`tel:${num.replace(/\s/g, "")}`}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "7px",
                  fontFamily:     "'Poppins', sans-serif",
                  fontWeight:     600,
                  fontSize:       "0.875rem",
                  color:          "rgba(255,255,255,0.70)",
                  textDecoration: "none",
                  transition:     "color 200ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.70)"; }}
              >
                <PhoneCall size={13} style={{ color: "var(--clr-accent)" }} />
                {num}
              </a>
            ))}
          </div>

          {/* Service tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s1)" }}>
            {serviceTags.map((tag) => (
              <span
                key={tag}
                className="t-label"
                style={{
                  padding:       "4px 12px",
                  background:    "rgba(216,185,163,0.08)",
                  border:        "1px solid rgba(216,185,163,0.16)",
                  borderRadius:  "100px",
                  color:         "rgba(255,255,255,0.52)",
                  fontSize:      "0.62rem",
                  letterSpacing: "0.06em",
                  whiteSpace:    "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ══ SCROLL CUE ════════════════════════════════════ */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        aria-label="Scroll down to About"
        style={{
          position:      "absolute",
          bottom:        "var(--s8)",
          right:         "var(--container-px)",
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
    </section>
  );
}
