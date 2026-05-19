"use client";

import { motion } from "framer-motion";
import { PhoneCall, ArrowDown } from "lucide-react";
import Image from "next/image";
import Parallax from "@/components/animations/Parallax";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden grain">
      {/* Parallax background */}
      <Parallax speed={0.38} className="absolute inset-0 scale-110">
        <Image src="/hero/hero.png" alt="Rasa Construction site at golden hour" fill priority sizes="100vw" quality={75} className="object-cover object-center" />
      </Parallax>

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(108deg, rgba(5,31,33,0.96) 0%, rgba(5,31,33,0.70) 42%, rgba(5,31,33,0.18) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14rem", background: "linear-gradient(to top, #F7F5F2, transparent)" }} />
      {/* Architectural grid mask */}
      <div className="absolute left-0 top-0 bottom-0 pointer-events-none" style={{ width: "60%", backgroundImage: "linear-gradient(rgba(216,185,163,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.06) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(to right, black 30%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 30%, transparent 100%)" }} />

      <Container className="relative z-10" style={{ paddingBottom: "var(--s16)", paddingTop: "11rem" }}>
        <div style={{ maxWidth: "660px" }}>
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="eyebrow t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s4)" }}>
            Est. {company.founded} · {company.location.label}
          </motion.div>

          {/* Brutalist headline */}
          <motion.h1 initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="t-hero text-white" style={{ marginBottom: "var(--s4)" }}>
            Building<br />Strength.<br />
            <span className="gradient-text">Delivering</span><br />
            <span className="gradient-text">Trust.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
            className="t-body" style={{ color: "rgba(255,255,255,0.60)", maxWidth: "480px", marginBottom: "var(--s6)" }}>
            Scaffolding rental, centring materials, concrete works &amp; vertical hoist services — backed by 15 years of field expertise across Tamil Nadu.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)" }}>
            <Button href="#contact" variant="primary" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
              Get a Free Quote
            </Button>
            <Button href={`tel:${company.contact.primary.replace(/\s/g,"")}`} variant="ghost">
              <PhoneCall size={16} /> {company.contact.primary}
            </Button>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.3 }}
          style={{ marginTop: "var(--s12)", display: "flex", gap: "var(--s8)", flexWrap: "wrap" }}>
          {company.stats.map(({ value, label }) => (
            <div key={label}>
              <div className="font-m" style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--clr-accent)", lineHeight: 1 }}>{value}</div>
              <div className="t-label" style={{ color: "rgba(255,255,255,0.36)", marginTop: "var(--s1)" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.button onClick={() => scrollTo("#about")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} aria-label="Scroll down"
        className="absolute" style={{ bottom: "2.5rem", right: "var(--container-px)", color: "rgba(255,255,255,0.28)" }}>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
