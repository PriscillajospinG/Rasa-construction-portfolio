"use client";

import { motion } from "framer-motion";
import { PhoneCall, ArrowDown, Shield, Clock, Award } from "lucide-react";
import Image from "next/image";
import Parallax from "@/components/animations/Parallax";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

const trustBadges = [
  { Icon: Shield, label: "Safety Certified" },
  { Icon: Clock,  label: "15+ Years Active" },
  { Icon: Award,  label: "500+ Projects" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end overflow-hidden grain">
      {/* ── Parallax background image ── */}
      <Parallax speed={0.35} className="absolute inset-0" style={{ scale: "1.12", transformOrigin: "center" }}>
        <Image
          src="/hero/hero.png"
          alt="Rasa Construction active site at golden hour"
          fill priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
      </Parallax>

      {/* ── Layered overlays: directional + depth ── */}
      {/* Primary: heavy left-side darkness for text legibility */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(105deg, rgba(3,15,16,0.97) 0%, rgba(5,25,26,0.88) 35%, rgba(5,31,33,0.55) 62%, rgba(5,31,33,0.12) 100%)"
      }} />
      {/* Bottom: transition to next section bg */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "10rem", background: "linear-gradient(to top, #F7F5F2 0%, transparent 100%)" }} />
      {/* Top: subtle vignette */}
      <div className="absolute top-0 left-0 right-0" style={{ height: "8rem", background: "linear-gradient(to bottom, rgba(3,15,16,0.55) 0%, transparent 100%)" }} />

      {/* ── Architectural grid — restricted to left column only ── */}
      <div className="absolute left-0 top-0 bottom-0 pointer-events-none" style={{
        width: "55%",
        backgroundImage: "linear-gradient(rgba(216,185,163,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.07) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "linear-gradient(to right, black 20%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, black 20%, transparent 100%)",
      }} />

      {/* ── Content ── */}
      <Container className="relative z-10 flex-1 flex flex-col justify-end" style={{ paddingBottom: "var(--s16)", paddingTop: "9rem" }}>

        {/* Flex column: grows to fill, content anchored to bottom */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="eyebrow t-label"
            style={{ color: "var(--clr-accent)", marginBottom: "var(--s4)", opacity: 1 }}>
            Est. {company.founded} · {company.location.label}
          </motion.div>

          {/* Brutalist headline — left-offset, high contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="t-hero"
            style={{ color: "white", marginBottom: "var(--s4)", maxWidth: "640px", textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
            Building<br />
            Strength.<br />
            <span className="gradient-text">Delivering</span><br />
            <span className="gradient-text">Trust.</span>
          </motion.h1>

          {/* Sub-copy — kept short, legible */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.72 }}
            className="t-body"
            style={{ color: "rgba(255,255,255,0.75)", maxWidth: "460px", marginBottom: "var(--s6)", lineHeight: 1.65 }}>
            Scaffolding, centring materials, concrete works &amp; vertical hoist services — backed by {new Date().getFullYear() - company.founded} years of field expertise across Tamil Nadu.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.96 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)", marginBottom: "var(--s10)" }}>
            <Button
              href="#contact" variant="primary"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              style={{ fontWeight: 700, letterSpacing: "0.03em" }}>
              Get a Free Quote
            </Button>
            <Button href={`tel:${company.contact.primary.replace(/\s/g,"")}`} variant="ghost">
              <PhoneCall size={15} /> {company.contact.primary}
            </Button>
          </motion.div>

          {/* ── Trust badges row ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.15 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)", marginBottom: "var(--s8)" }}>
            {trustBadges.map(({ Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "rgba(216,185,163,0.10)", border: "1px solid rgba(216,185,163,0.20)", borderRadius: "100px" }}>
                <Icon size={13} color="var(--clr-accent)" />
                <span className="t-label" style={{ color: "rgba(255,255,255,0.80)", fontSize: "0.65rem" }}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── Stats strip — clearly above the fade zone ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.35 }}
            style={{
              display: "flex", gap: "var(--s8)", flexWrap: "wrap",
              paddingTop: "var(--s4)", borderTop: "1px solid rgba(216,185,163,0.16)"
            }}>
            {company.stats.map(({ value, label }) => (
              <div key={label}>
                <div className="font-m" style={{ fontSize: "2rem", fontWeight: 900, color: "var(--clr-accent)", lineHeight: 1 }}>
                  {value}
                </div>
                {/* Raised contrast: white at 70% vs previous 36% */}
                <div className="t-label" style={{ color: "rgba(255,255,255,0.70)", marginTop: "var(--s1)", fontSize: "0.62rem" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        aria-label="Scroll to About"
        className="absolute"
        style={{ bottom: "var(--s6)", right: "var(--container-px)", color: "rgba(255,255,255,0.45)", zIndex: 10 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
