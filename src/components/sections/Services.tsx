"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { cardGridStagger, itemReveal, scaleIn, EASE_CINEMATIC } from "@/lib/animations";

function getIcon(name: string): LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.HardHat;
}

// Primary service — full-bleed photo card
const primary = services[0]; // Scaffolding

// Secondary pair — stacked right column
const secondary = services.slice(1, 3); // Centring + Concrete

// Tertiary — list treatment
const tertiary = services.slice(3); // Hoist, Support, Maintenance

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: "var(--clr-bg)" }}>
      <div className="curve">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      <div className="section" ref={ref}>
        <div className="container">
        {/* ── Header: label left, headline right — editorial split ── */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 9fr", gap: "var(--s8)", alignItems: "end", marginBottom: "var(--s12)" }}
          className="grid-cols-1 lg:grid-cols-[3fr_9fr]">
          <Reveal>
            <div className="eyebrow t-label" style={{ color: "var(--clr-primary)" }}>What We Offer</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-h1" style={{ color: "var(--clr-primary)" }}>
              Services built for<br /><em className="t-italic-dark">real field work.</em>
            </h2>
          </Reveal>
        </div>

        {/* ── Row 1: Architectural hero card + stacked pair ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "var(--s3)", marginBottom: "var(--s3)" }}
          className="grid-cols-1 lg:grid-cols-[7fr_5fr]"
        >
          {/* Primary: large featured card — scale-in entrance */}
          {(() => {
            const Icon = getIcon(primary.iconName);
            return (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group relative overflow-hidden"
                style={{ borderRadius: "var(--r-xl)", minHeight: "480px", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "var(--sh-xl)" }}
              >
                {/* Background */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: `url(${primary.image})`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform 700ms var(--ease)" }}
                />
                {/* Hover image zoom */}
                <div
                  className="absolute inset-0 group-hover:[transform:scale(1.04)] transition-transform duration-700"
                  style={{ backgroundImage: `url(${primary.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,12,13,0.99) 0%, rgba(5,31,33,0.72) 48%, rgba(5,31,33,0.22) 100%)" }} />

                {/* Large decorative service number */}
                <div className="absolute" style={{ top: "var(--s4)", right: "var(--s4)", fontFamily: "'Montserrat',sans-serif", fontSize: "7rem", fontWeight: 900, color: "rgba(216,185,163,0.08)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none" }}>01</div>

                {/* Content */}
                <div className="relative" style={{ padding: "var(--s6)" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(216,185,163,0.15)", border: "1px solid rgba(216,185,163,0.25)", marginBottom: "var(--s3)" }}>
                    <Icon size={22} color="var(--clr-accent)" />
                  </div>
                  <Badge variant="light" style={{ marginBottom: "var(--s3)" }}>✓ {primary.tag}</Badge>
                  <h3 className="font-m text-white" style={{ fontSize: "var(--t-h1)", fontWeight: 900, lineHeight: 1.1, marginBottom: "var(--s2)" }}>{primary.title}</h3>
                  <p className="t-sm" style={{ color: "rgba(255,255,255,0.70)", lineHeight: 1.75, maxWidth: "420px", marginBottom: "var(--s3)" }}>{primary.description}</p>
                  {primary.usedFor && (
                    <div style={{ borderTop: "1px solid rgba(216,185,163,0.14)", paddingTop: "var(--s3)" }}>
                      <div className="t-label" style={{ color: "rgba(216,185,163,0.55)", marginBottom: "6px", fontSize: "0.6rem" }}>USED FOR</div>
                      <div className="t-sm" style={{ color: "rgba(255,255,255,0.50)", lineHeight: 1.6, fontSize: "0.78rem" }}>{primary.usedFor}</div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })()}

          {/* Secondary pair — stagger from right */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "var(--s3)" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {secondary.map(({ id, iconName, title, description, usedFor, tag }, i) => {
              const Icon = getIcon(iconName);
              return (
                <motion.div key={id}
                  variants={itemReveal}
                  className="group card relative overflow-hidden card-hover"
                  style={{ padding: "var(--s4)", flex: i === 0 ? "1.4" : "1" }}
                >
                  {/* Top hover accent */}
                  <div className="absolute top-0 left-0 right-0 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ height: "2px", background: "linear-gradient(90deg, var(--clr-primary), var(--clr-accent))" }} />

                  {/* Decorative number */}
                  <div className="absolute" style={{ bottom: "var(--s2)", right: "var(--s3)", fontFamily: "'Montserrat',sans-serif", fontSize: "4rem", fontWeight: 900, color: "rgba(8,51,53,0.05)", lineHeight: 1 }}>
                    0{i + 2}
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--s3)", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--clr-primary), var(--clr-primary-mid))", flexShrink: 0, transition: "transform 300ms var(--ease)" }} className="group-hover:scale-110">
                      <Icon size={18} color="var(--clr-accent)" />
                    </div>
                    <div>
                      <h3 className="t-h2" style={{ color: "var(--clr-text)", marginBottom: "var(--s1)" }}>{title}</h3>
                      <p className="t-sm" style={{ color: "var(--clr-text-md)", lineHeight: 1.65, marginBottom: "var(--s2)" }}>{description}</p>
                      {usedFor && (
                        <p className="t-sm" style={{ color: "var(--clr-text-lt)", lineHeight: 1.5, fontSize: "0.78rem", marginBottom: "var(--s2)", fontStyle: "italic" }}>
                          Used for: {usedFor}
                        </p>
                      )}
                      <Badge variant="dark">✓ {tag}</Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Row 2: Tertiary services — horizontal editorial list ── */}
        <div style={{ borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s6)" }}>
          <div className="t-label" style={{ color: "var(--clr-text-md)", marginBottom: "var(--s4)", fontWeight: 600 }}>Also available</div>
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}
            className="grid-cols-1 md:grid-cols-3"
            variants={cardGridStagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {tertiary.map(({ id, iconName, title, description, tag }, i) => {
              const Icon = getIcon(iconName);
              return (
                <motion.div key={id}
                  variants={itemReveal}
                  className="group"
                  style={{ padding: "var(--s4)", borderRight: i < tertiary.length - 1 ? "1px solid rgba(8,51,53,0.07)" : "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)", marginBottom: "var(--s2)" }}>
                    <Icon size={18} color="var(--clr-primary)" />
                    <h4 className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-text)" }}>{title}</h4>
                  </div>
                  <p className="t-sm" style={{ color: "var(--clr-text-lt)", lineHeight: 1.65, marginBottom: "var(--s2)" }}>{description}</p>
                  <div className="group-hover:opacity-100 transition-opacity duration-200 t-label"
                    style={{ color: "var(--clr-primary)", opacity: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>{tag}</span> <ArrowRight size={12} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Editorial footer row ── */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: "var(--s12)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)", borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s6)" }}>
            <div>
              <p className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-primary)" }}>Not sure what you need?</p>
              <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)" }}>
                Call {company.owner} — he'll tell you exactly what the project requires.
              </p>
            </div>
            <Button href={`tel:${company.contact.primary.replace(/\s/g, "")}`} variant="dark">
              📞 Call for Advice
            </Button>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
