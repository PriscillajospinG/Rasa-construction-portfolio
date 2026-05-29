"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { projects, projectCategories } from "@/data/projects";
import { scrollTo } from "@/lib/utils";
import { cardGridStagger, itemReveal, EASE_CINEMATIC } from "@/lib/animations";
import SectionWatermark from "@/components/ui/SectionWatermark";

const getProjectBentoClass = (i: number) => {
  if (i === 0) return "col-span-12 md:col-span-6";
  if (i === 1) return "col-span-12 md:col-span-3";
  if (i === 2) return "col-span-12 md:col-span-3";
  return "col-span-12 md:col-span-4";
};

export default function Projects() {
  const ref    = useRef(null);
  const [active,  setActive]  = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const displayed = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ background: "#FFFFFF" }} className="projects-section section relative overflow-hidden">
      {/* Huge background watermark */}
      <SectionWatermark text="PROJECTS" align="left" variant="light" top="40%" opacity={0.02} />

      <div className="container relative z-10" ref={ref}>

        {/* ── Header: asymmetric — number left, content right ── */}
        <div style={{ gap: "var(--s8)", alignItems: "start" }}
          className="section-header grid grid-cols-1 lg:grid-cols-[auto_1fr] projects-header-grid">
          {/* Decorative section number */}
          <Reveal direction="left">
            <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontWeight: 900, fontSize: "0.7rem", letterSpacing: "0.25em", color: "rgba(8,51,53,0.16)", userSelect: "none", textTransform: "uppercase" }}>
              Portfolio
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="section-eyebrow">SITE PHOTOS</p>
              <h2 className="section-title">
                Real work, real sites.
              </h2>
              <p className="section-lead mt-2 text-[#66706B]">
                A look at our equipment, site work, scaffolding support, and construction material movement.
              </p>
            </Reveal>
            {/* Filter pills — smooth active transition */}
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s1)", marginTop: "var(--s3)" }}>
                {projectCategories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className="t-label font-p"
                    style={{
                      padding:      "6px 18px",
                      borderRadius: "100px",
                      fontWeight:   active === cat ? 600 : 400,
                      border:       "none",
                      cursor:       "pointer",
                    }}
                    animate={{
                      background: active === cat ? "#083335" : "rgba(8,51,53,0.06)",
                      color:      active === cat ? "#FFFFFF" : "#66706B",
                    }}
                    transition={{ duration: 0.25, ease: EASE_CINEMATIC }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Bento Grid — AnimatePresence for filter transitions ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active} /* Re-mounts stagger on filter change */
            className="bento-grid"
            variants={cardGridStagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {displayed.map(({ id, image, title, category, location, duration, description }, i) => {
              const bentoClass = getProjectBentoClass(i);
              const isFeatured = i === 0;
              return (
                <motion.div
                  key={id}
                  variants={itemReveal}
                  layout
                  className={`project-card bento-card group ${bentoClass}`}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}
                >
                  {/* Media wrapper */}
                  <div className="absolute inset-0 bento-media">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-350"
                      style={{
                        background: "linear-gradient(to top, rgba(5,31,33,0.95) 0%, rgba(5,31,33,0.3) 60%, transparent 100%)",
                        opacity: hovered === id ? 1 : 0.75
                      }}
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 mt-auto flex flex-col gap-2">
                    <div style={{ alignSelf: "flex-start" }}>
                      <Badge variant="light">{category}</Badge>
                    </div>
                    <h3 className="font-m text-white" style={{ fontSize: isFeatured ? "var(--t-h1)" : "var(--t-h2)", lineHeight: 1.2 }}>
                      {title}
                    </h3>
                    {isFeatured && description && (
                      <p className="t-sm" style={{ color: "rgba(255,255,255,0.72)", maxWidth: "460px", lineHeight: 1.6 }}>
                        {description}
                      </p>
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--s2)", marginTop: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <MapPin size={12} color="rgba(255,255,255,0.6)" />
                        <span className="t-sm" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.76rem" }}>{location}</span>
                      </div>
                      {duration && (
                        <span className="t-label" style={{ color: "rgba(216,185,163,0.80)", fontSize: "0.6rem" }}>{duration}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA — editorial, left-aligned ── */}
        <Reveal>
          <div style={{ marginTop: "var(--s12)", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "var(--s4)", flexWrap: "wrap", borderTop: "1px solid rgba(8, 51, 53, 0.12)", paddingTop: "var(--s6)" }} className="projects-footer-row">
            <div>
              <p className="font-m" style={{ fontSize: "var(--t-h2)", color: "#083335", lineHeight: 1.2 }}>
                Ready to see your project here?
              </p>
              <p className="t-sm" style={{ color: "var(--clr-text-md)", marginTop: "var(--s1)" }}>
                Let&apos;s talk about what your site needs.
              </p>
            </div>
            <Button href="#contact" variant="dark" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
              Request a Quote
            </Button>
          </div>
        </Reveal>

        {/* ── Narrative cue ── */}
        <Reveal delay={0.15}>
          <a href="#equipment" className="section-cue" onClick={(e) => { e.preventDefault(); const el = document.getElementById("equipment"); el?.scrollIntoView({ behavior: "smooth" }); }}>
            Explore the equipment behind these projects
            <span className="section-cue-arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
