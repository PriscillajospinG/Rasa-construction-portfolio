"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhoneCall, ArrowDown } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

/* ─── Stagger timing ─────────────────────────────────────── */
const ease   = [0.16, 1, 0.3, 1] as const;
const t      = (delay: number) => ({ duration: 0.9, delay, ease });
const tFast  = (delay: number) => ({ duration: 0.55, delay, ease });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  /* Parallax transforms — image panel drifts slower than scroll */
  const imgY      = useTransform(scrollYProgress, [0, 1], ["0%",    "18%"]);
  const imgScale  = useTransform(scrollYProgress, [0, 1], [1,       1.06]);
  const contentY  = useTransform(scrollYProgress, [0, 1], ["0%",   "-6%"]);

  const yearsSince = new Date().getFullYear() - company.founded;

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position:   "relative",
        minHeight:  "100svh",
        display:    "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow:   "hidden",
        background: "#040e0f",
      }}
      className="hero-grid"
    >
      {/* ══════════════════════════════════════════════════════
          LEFT PANEL — content, dark, architectural
      ══════════════════════════════════════════════════════ */}
      <div
        className="grain"
        style={{
          position:   "relative",
          display:    "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding:    "0 var(--s8) var(--s12)",
          paddingTop: "10rem",
          background: "linear-gradient(165deg, #030c0d 0%, #051f21 65%, #062426 100%)",
          zIndex:     2,
        }}
      >
        {/* Architectural grid overlay — left panel only */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(216,185,163,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom right, black 20%, rgba(0,0,0,0.4) 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom right, black 20%, rgba(0,0,0,0.4) 70%, transparent 100%)",
          }}
        />

        {/* Right-edge bleed — panel bleeds into image on desktop */}
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none"
          style={{
            width: "6rem",
            background:
              "linear-gradient(to right, transparent, rgba(4,14,15,0.92))",
            zIndex: 1,
          }}
        />

        {/* ── Content ── */}
        <motion.div
          style={{ y: contentY, position: "relative", zIndex: 2 }}
        >
          {/* Location eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={tFast(0.25)}
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            "10px",
              marginBottom:   "var(--s6)",
            }}
          >
            {/* Accent line */}
            <span
              style={{
                display:    "block",
                width:      "2rem",
                height:     "1px",
                background: "var(--clr-accent)",
                flexShrink: 0,
              }}
            />
            <span
              className="t-label"
              style={{ color: "var(--clr-accent)", fontSize: "0.68rem" }}
            >
              Est. {company.founded} &nbsp;·&nbsp; {company.location.label}
            </span>
          </motion.div>

          {/* Headline — line-by-line reveal */}
          <div style={{ overflow: "hidden" }}>
            {[
              { text: "Reliable Scaffolding,",  delay: 0.35 },
              { text: "Centring & Concrete",     delay: 0.47 },
            ].map(({ text, delay }) => (
              <motion.div
                key={text}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%",   opacity: 1 }}
                transition={{ ...t(delay), duration: 0.85 }}
                style={{ overflow: "hidden" }}
              >
                <h1
                  className="font-m"
                  style={{
                    fontSize:      "var(--t-hero)",
                    fontWeight:    900,
                    lineHeight:    0.95,
                    letterSpacing: "-0.03em",
                    color:         "white",
                    textShadow:    "0 4px 32px rgba(0,0,0,0.4)",
                    display:       "block",
                  }}
                >
                  {text}
                </h1>
              </motion.div>
            ))}

            {/* Gradient accent line */}
            <motion.div
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%",   opacity: 1 }}
              transition={{ ...t(0.60), duration: 0.85 }}
              style={{ overflow: "hidden" }}
            >
              <span
                className="font-m gradient-text"
                style={{
                  fontSize:      "var(--t-hero)",
                  fontWeight:    900,
                  lineHeight:    0.95,
                  letterSpacing: "-0.03em",
                  display:       "block",
                  marginBottom:  "var(--s6)",
                }}
              >
                Support for Stronger Construction.
              </span>
            </motion.div>
          </div>

          {/* Thin separator — architectural detail */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            style={{
              height:          "1px",
              background:      "linear-gradient(to right, rgba(216,185,163,0.35), transparent)",
              transformOrigin: "left",
              marginBottom:    "var(--s6)",
              width:           "80%",
            }}
          />

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tFast(0.95)}
            style={{
              fontFamily:   "'Inter', sans-serif",
              fontSize:     "1rem",
              color:        "rgba(255,255,255,0.72)",
              lineHeight:   1.75,
              maxWidth:     "420px",
              marginBottom: "var(--s8)",
            }}
          >
            Rasa Construction supports residential and commercial building works
            with quality scaffolding, centring support, vertical hoist rental,
            and concrete works across Tamil Nadu.
          </motion.p>

          {/* CTAs — asymmetric sizing */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tFast(1.08)}
            style={{
              display:      "flex",
              flexWrap:     "wrap",
              gap:          "var(--s2)",
              marginBottom: "var(--s10)",
            }}
          >
            <Button
              href="#contact"
              variant="primary"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.04em", padding: "0.875rem 2rem" }}
            >
              Get a Free Quote
            </Button>
            <Button
              href={`tel:${company.contact.primary.replace(/\s/g, "")}`}
              variant="ghost"
              style={{ fontSize: "0.875rem" }}
            >
              <PhoneCall size={14} />
              {company.contact.primary}
            </Button>
          </motion.div>

          {/* Stats strip — thin top rule, editorial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            style={{
              display:       "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap:           "var(--s3)",
              paddingTop:    "var(--s4)",
              borderTop:     "1px solid rgba(216,185,163,0.14)",
            }}
          >
            {company.stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 + i * 0.08 }}
              >
                <div
                  className="font-m"
                  style={{
                    fontSize:   "clamp(1.35rem, 2.5vw, 1.75rem)",
                    fontWeight: 900,
                    color:      "var(--clr-accent)",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  className="t-label"
                  style={{
                    color:      "rgba(255,255,255,0.52)",
                    marginTop:  "5px",
                    fontSize:   "0.6rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          RIGHT PANEL — cinematic image composition
      ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position:   "relative",
          overflow:   "hidden",
          background: "#030a0b",
        }}
      >
        {/* Main image — parallax */}
        <motion.div
          style={{
            position: "absolute",
            inset:    "-12% 0",
            y:        imgY,
            scale:    imgScale,
          }}
        >
          <Image
            src="/hero/hero.png"
            alt="Rasa Construction active construction site"
            fill
            priority
            sizes="50vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          {/* Cinematic colour grade — not a flat black overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,14,15,0.22) 0%, transparent 35%, transparent 55%, rgba(4,14,15,0.80) 100%)",
            }}
          />
          {/* Left bleed — merges panels seamlessly */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width:      "8rem",
              background: "linear-gradient(to right, #040e0f, transparent)",
            }}
          />
        </motion.div>

        {/* ── Floating service badge — editorial chip, top-right ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tFast(1.1)}
          style={{
            position:    "absolute",
            top:         "var(--s8)",
            right:       "var(--s4)",
            zIndex:      10,
            background:  "rgba(8,51,53,0.72)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border:      "1px solid rgba(216,185,163,0.20)",
            borderRadius: "var(--r-md)",
            padding:     "var(--s2) var(--s3)",
            maxWidth:    "180px",
          }}
        >
          <div
            className="t-label"
            style={{ color: "var(--clr-accent)", marginBottom: "4px", fontSize: "0.6rem" }}
          >
            ACTIVE SERVICES
          </div>
          {["Scaffolding Rental", "Concrete Works", "Vertical Hoist"].map((s) => (
            <div
              key={s}
              className="t-sm"
              style={{
                color:       "rgba(255,255,255,0.75)",
                lineHeight:  1.8,
                fontSize:    "0.75rem",
                paddingLeft: "10px",
                borderLeft:  "1.5px solid rgba(216,185,163,0.30)",
              }}
            >
              {s}
            </div>
          ))}
        </motion.div>

        {/* ── Smaller secondary image — offset, overlapping ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
          style={{
            position:     "absolute",
            bottom:       "var(--s12)",
            left:         "-2.5rem",           /* intentional bleed over panel edge */
            width:        "clamp(180px, 22vw, 280px)",
            aspectRatio:  "4/5",
            zIndex:       10,
            borderRadius: "var(--r-lg)",
            overflow:     "hidden",
            boxShadow:    "0 24px 72px rgba(0,0,0,0.55)",
            border:       "2px solid rgba(216,185,163,0.18)",
          }}
        >
          <Image
            src="/team/about-team.png"
            alt="Rasa Construction team at work"
            fill
            sizes="22vw"
            className="object-cover"
            style={{ objectPosition: "center top" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,31,33,0.85) 0%, transparent 55%)",
            }}
          />
          {/* Caption on secondary image */}
          <div
            style={{
              position:    "absolute",
              bottom:      "var(--s2)",
              left:        "var(--s2)",
              right:       "var(--s2)",
            }}
          >
            <div
              className="t-label"
              style={{ color: "var(--clr-accent)", fontSize: "0.6rem" }}
            >
              {company.owner}
            </div>
            <div
              className="t-sm"
              style={{ color: "rgba(255,255,255,0.60)", fontSize: "0.7rem" }}
            >
              Founder, {company.name}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom caption strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          style={{
            position:   "absolute",
            bottom:     "var(--s4)",
            right:      "var(--s4)",
            zIndex:     10,
            textAlign:  "right",
          }}
        >
          <div
            className="t-label"
            style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.6rem" }}
          >
            Tamil Nadu, India
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SCROLL CUE — bottom-left of left panel
      ══════════════════════════════════════════════════════ */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        aria-label="Scroll to About"
        style={{
          position:       "absolute",
          bottom:         "var(--s4)",
          left:           "50%",
          transform:      "translateX(-50%)",
          color:          "rgba(255,255,255,0.35)",
          zIndex:         20,
          background:     "none",
          border:         "none",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "6px",
        }}
      >
        <span
          className="t-label"
          style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.58rem" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      {/* ══════════════════════════════════════════════════════
          MOBILE OVERRIDE (< 768px) — stack vertically
          Handled via CSS class hero-grid below
      ══════════════════════════════════════════════════════ */}
    </section>
  );
}
