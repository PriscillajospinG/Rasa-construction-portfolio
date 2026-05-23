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

export default function Projects() {
  const ref    = useRef(null);
  const [active,  setActive]  = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const displayed = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ background: "#083335" }} className="section relative overflow-hidden dark-section section-transition">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(8,51,53,0.86), rgba(8,51,53,0.74))",
          zIndex: 1,
        }}
      />
      <div className="container relative z-10" ref={ref}>

        {/* ── Header: asymmetric — number left, content right ── */}
        <div style={{ gap: "var(--s8)", alignItems: "start", marginBottom: "var(--s12)" }}
          className="grid grid-cols-1 lg:grid-cols-[auto_1fr] projects-header-grid">
          {/* Decorative section number */}
          <Reveal direction="left">
            <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontWeight: 900, fontSize: "0.7rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.16)", userSelect: "none", textTransform: "uppercase" }}>
              Portfolio
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="section-eyebrow">Our Work</p>
              <h2 className="section-title">
                Projects that<br /><em className="text-[var(--clr-accent)]">speak for themselves.</em>
              </h2>
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
                      background: active === cat ? "#D8B9A3" : "rgba(255,255,255,0.08)",
                      color:      active === cat ? "#083335" : "rgba(255,255,255,0.72)",
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
              const isFeatured = i === 0; // First item in filtered results is featured large bento
              return (
                <motion.div
                  key={id}
                  variants={itemReveal}
                  layout
                  className={`project-card bento-card bento-card-dark group ${isFeatured ? "md:col-span-8 md:row-span-2" : "md:col-span-4"} col-span-12`}
                  style={{ position: "relative", minHeight: isFeatured ? "380px" : "280px" }}
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
          <div style={{ marginTop: "var(--s12)", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "var(--s4)", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "var(--s6)" }} className="projects-footer-row">
            <div>
              <p className="font-m" style={{ fontSize: "var(--t-h2)", color: "#FFFFFF", lineHeight: 1.2 }}>
                Ready to see your project here?
              </p>
              <p className="t-sm" style={{ color: "rgba(255,255,255,0.72)", marginTop: "var(--s1)" }}>
                Let&apos;s talk about what your site needs.
              </p>
            </div>
            <Button href="#contact" variant="primary" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
              Request a Quote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
