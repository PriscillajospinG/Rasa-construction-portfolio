"use client";

import { useRef, CSSProperties } from "react";
import Image from "next/image";
import { useInView, motion } from "framer-motion";
import Reveal from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { company } from "@/data/company";
import SectionWatermark from "@/components/ui/SectionWatermark";
import BlueprintBg from "@/components/ui/BlueprintBg";

function ServiceIcon({ id }: { id: string }) {
  if (id === "centring") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#083335]">
        {/* Shuttering plates / stacked layers */}
        <path d="M6,10 L34,10 L28,16 L0,16 Z" fill="rgba(216,185,163,0.2)" />
        <path d="M6,18 L34,18 L28,24 L0,24 Z" fill="rgba(216,185,163,0.4)" />
        <path d="M6,26 L34,26 L28,32 L0,32 Z" fill="rgba(8,51,53,0.1)" />
        <line x1="6" y1="10" x2="6" y2="26" />
        <line x1="34" y1="10" x2="34" y2="26" />
        <line x1="28" y1="16" x2="28" y2="32" />
        <line x1="0" y1="16" x2="0" y2="32" />
      </svg>
    );
  }
  if (id === "concrete") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#083335]">
        {/* Concrete block / foundation structure */}
        <rect x="4" y="24" width="32" height="12" rx="1" fill="rgba(216,185,163,0.3)" />
        <line x1="4" y1="30" x2="36" y2="30" strokeDasharray="2,2" />
        <path d="M8,24 L14,6 L26,6 L32,24" />
        <circle cx="20" cy="15" r="4" fill="rgba(8,51,53,0.1)" />
      </svg>
    );
  }
  if (id === "hoist") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#083335]">
        {/* Hoist cage + vertical frame */}
        <line x1="12" y1="2" x2="12" y2="38" />
        <line x1="28" y1="2" x2="28" y2="38" />
        <path d="M12,8 L28,14 M12,20 L28,26 M12,32 L28,38" strokeDasharray="3,3" />
        <rect x="15" y="12" width="10" height="14" fill="rgba(216,185,163,0.4)" />
        <path d="M20,6 L20,12" />
        <path d="M17,19 L23,19" />
      </svg>
    );
  }
  if (id === "support") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#083335]">
        {/* Hard hat silhouette */}
        <path d="M6,22 C6,12 12,8 20,8 C28,8 34,12 34,22" fill="rgba(216,185,163,0.3)" />
        <path d="M4,22 L36,22 C38,22 38,24 36,24 L4,24 C2,24 2,22 4,22 Z" fill="#D8B9A3" />
        <path d="M20,8 L20,14" />
        <path d="M15,9 C15,9 18,12 20,12 C22,12 25,9 25,9" />
      </svg>
    );
  }
  return null;
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,  // 120ms per spec
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="services-section section relative overflow-hidden" style={{ backgroundColor: "#F4EFE7" }} ref={ref}>
      {/* Blueprint grid background */}
      <BlueprintBg variant="light" opacity={0.04} />

      {/* Large watermark text */}
      <SectionWatermark text="SERVICES" align="right" variant="light" top="40%" opacity={0.02} />

      <div className="container services-container relative z-10">
        {/* ── Section Header ── */}
        <div className="section-header">
            <Reveal>
              <p className="section-eyebrow">OUR SERVICES</p>
            </Reveal>
            <h2 className="section-title" aria-label="Services We Offer">
              Services We Offer
            </h2>
            <Reveal delay={0.1}>
              <p className="section-lead">
                Practical construction support for scaffolding, centring, concrete work, hoist rental, and site material movement.
              </p>
            </Reveal>
          </div>

          {/* ── Services Grid ── */}
          <motion.div
            className="services-grid mb-[var(--s6)]"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {services.map(({ id, title, description, usedFor, tag, image, alt }, i) => {
              const num = `0${i + 1}`;
              const isFeatured = id === "scaffolding";
              return (
                <motion.div
                  key={id}
                  variants={cardVariants}
                  className={`service-card group ${isFeatured ? "featured" : ""}`}
                >
                  {/* Accent line — grows left→right on card hover */}
                  <div className="accent-line" style={{ marginBottom: "var(--s3)" }} />

                  {isFeatured && image && alt && (
                    <div className="service-image relative w-full aspect-[16/10] overflow-hidden rounded-[20px]" style={{ marginBottom: "var(--s2)", flexShrink: 0 }}>
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        className="object-cover service-img-inner"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="service-image-overlay" />
                    </div>
                  )}

                  {!isFeatured && (
                    <div className="service-icon-wrap service-icon-hover" style={{ marginBottom: "var(--s3)", display: "inline-flex", padding: "10px", borderRadius: "12px", background: "rgba(8,51,53,0.04)", width: "fit-content" }}>
                      <ServiceIcon id={id} />
                    </div>
                  )}

                  {/* Faded background watermark number */}
                  <div className="service-card-bg-num" aria-hidden="true">
                    {num}
                  </div>

                  <div className="service-card-content">
                    <div className="service-card-number" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span className="text-xs font-mono text-[#66706B]">{num}</span>
                      {isFeatured && (
                        <span className="text-[10px] font-bold text-[#FFFFFF] bg-[#083335] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Most Requested
                        </span>
                      )}
                    </div>
                    <h3 className="service-card-title">{title}</h3>
                    <p className="service-card-description">{description}</p>
                    {usedFor && (
                      <p className="service-card-used-for text-xs text-[#66706B] mb-4">
                        <strong>Used for:</strong> {usedFor}
                      </p>
                    )}
                    <div className="service-badge mt-auto">
                      <Badge>✓ {tag}</Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Editorial footer row ── */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: "var(--s12)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)", borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s6)" }}>
              <div>
                <p className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-primary)" }}>Not sure what you need?</p>
                <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)", fontStyle: "italic" }}>
                  <em>Call {company.owner} — He&apos;ll tell you exactly what the project requires.</em>
                </p>
              </div>
              <Button href={`tel:${company.contact.primary.replace(/\s/g, "")}`} variant="dark">
                Call for Advice
              </Button>
            </div>
          </Reveal>

          {/* ── Narrative cue ── */}
          <Reveal delay={0.2}>
            <a href="#projects" className="section-cue" onClick={(e) => { e.preventDefault(); const el = document.getElementById("projects"); el?.scrollIntoView({ behavior: "smooth" }); }}>
              See the projects supported by our equipment
              <span className="section-cue-arrow" aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section>
  );
}
