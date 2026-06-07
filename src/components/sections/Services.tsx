"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView, motion } from "framer-motion";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { company } from "@/data/company";
import SectionWatermark from "@/components/ui/SectionWatermark";
import BlueprintBg from "@/components/ui/BlueprintBg";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
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
  const ref = useRef(null);

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
          <Reveal delay={0.05}>
            <h2 className="section-title" aria-label="Services We Offer">
              Services We Offer
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead">
              Reliable equipment, scaffolding systems, hoist rentals and construction support trusted across South Tamil Nadu.
            </p>
          </Reveal>
        </div>

        {/* ── Services Grid ── */}
        <motion.div
          className="services-showcase-grid mb-[var(--s6)]"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map(({ id, title, description, tag, image, alt }, i) => {
            return (
              <motion.div
                key={id}
                variants={cardVariants}
                className="service-showcase-card group"
              >
                {/* Large Service Image */}
                <div className="service-showcase-image-wrapper">
                  {image && (
                    <Image
                      src={image}
                      alt={alt || title}
                      fill
                      className="object-cover service-showcase-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="service-showcase-image-overlay" />
                </div>

                {/* Service Card Content */}
                <div className="service-showcase-content">
                  <h3 className="service-showcase-title">{title}</h3>
                  <p className="service-showcase-description">{description}</p>
                  <div className="service-showcase-tag-wrapper">
                    <span className="service-showcase-tag">{tag}</span>
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
