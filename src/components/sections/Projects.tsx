"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ZoomIn, MapPin } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { projects, projectCategories } from "@/data/projects";
import { scrollTo } from "@/lib/utils";

// Hero project — always the first, spans 2 columns wide
const heroProject = projects[0];
// Gallery row — everything else
const galleryProjects = projects.slice(1);

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active,  setActive]  = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const displayed = active === "All"
    ? galleryProjects
    : galleryProjects.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      <Container section ref={ref}>

        {/* ── Header: asymmetric — number left, content right ── */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--s8)", alignItems: "start", marginBottom: "var(--s12)" }}
          className="grid-cols-1 lg:grid-cols-[auto_1fr]">
          {/* Decorative section number */}
          <Reveal direction="left">
            <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "0.7rem", letterSpacing: "0.25em", color: "rgba(8,51,53,0.25)", userSelect: "none", textTransform: "uppercase" }}>
              Portfolio
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>Our Work</div>
              <h2 className="t-h1" style={{ color: "var(--clr-primary)", marginBottom: "var(--s4)" }}>
                Projects that<br /><em className="t-italic">speak for themselves.</em>
              </h2>
            </Reveal>
            {/* Filter pills — aligned with heading, not centered */}
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s1)" }}>
                {projectCategories.map((cat) => (
                  <button key={cat} onClick={() => setActive(cat)}
                    className="t-label font-p transition-all duration-200"
                    style={{ padding: "6px 18px", borderRadius: "100px", fontWeight: active === cat ? 600 : 400, background: active === cat ? "var(--clr-primary)" : "rgba(8,51,53,0.06)", color: active === cat ? "white" : "var(--clr-text-md)", border: "none" }}>
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Hero project — full-width cinematic banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ marginBottom: "var(--s3)", borderRadius: "var(--r-xl)", overflow: "hidden", position: "relative", aspectRatio: "21/9", boxShadow: "var(--sh-xl)" }}
          onMouseEnter={() => setHovered("hero")} onMouseLeave={() => setHovered(null)}>
          <Image src={heroProject.image} alt={heroProject.title}
            fill sizes="100vw" className="object-cover transition-transform duration-700"
            style={{ transform: hovered === "hero" ? "scale(1.04)" : "scale(1)" }} />
          <div className="absolute inset-0 transition-opacity duration-400"
            style={{ background: "linear-gradient(to right, rgba(5,31,33,0.92) 0%, rgba(5,31,33,0.45) 50%, rgba(5,31,33,0.15) 100%)", opacity: hovered === "hero" ? 1 : 0.8 }} />
          {/* Editorial content — left-anchored */}
          <div className="absolute" style={{ top: "50%", left: "var(--s8)", transform: "translateY(-50%)", maxWidth: "440px" }}>
            <Badge variant="light" style={{ marginBottom: "var(--s3)" }}>{heroProject.category}</Badge>
            <h3 className="font-m text-white" style={{ fontSize: "var(--t-h1)", fontWeight: 900, lineHeight: 1.1, marginBottom: "var(--s2)" }}>
              {heroProject.title}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s1)" }}>
              <MapPin size={13} color="rgba(255,255,255,0.50)" />
              <span className="t-sm" style={{ color: "rgba(255,255,255,0.50)" }}>{heroProject.location}</span>
            </div>
          </div>
          {/* Hover zoom icon */}
          <div className="absolute transition-all duration-300"
            style={{ bottom: "var(--s4)", right: "var(--s4)", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(216,185,163,0.90)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered === "hero" ? 1 : 0, transform: hovered === "hero" ? "scale(1)" : "scale(0.7)" }}>
            <ZoomIn size={16} color="var(--clr-primary-dark)" />
          </div>
        </motion.div>

        {/* ── Gallery grid — 3 col with mixed aspect ratios ── */}
        <div style={{ columns: "3", columnGap: "var(--s3)" }} className="columns-1 sm:columns-2 lg:columns-3">
          {displayed.map(({ id, image, title, category, location, tall }, i) => (
            <motion.div key={id + active}
              initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ breakInside: "avoid", marginBottom: "var(--s3)" }}
              onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}>
              <div style={{ position: "relative", width: "100%", aspectRatio: tall ? "3/4" : "4/3", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: hovered === id ? "var(--sh-xl)" : "var(--sh-md)", transition: "box-shadow 350ms ease" }}>
                <Image src={image} alt={title} fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700"
                  style={{ transform: hovered === id ? "scale(1.06)" : "scale(1)" }} />
                <div className="absolute inset-0 transition-opacity duration-350"
                  style={{ background: "linear-gradient(to top, rgba(5,31,33,0.92) 0%, rgba(5,31,33,0.28) 55%, transparent 100%)", opacity: hovered === id ? 1 : 0.65 }} />
                {/* Info */}
                <div className="absolute transition-transform duration-350"
                  style={{ bottom: "var(--s3)", left: "var(--s3)", right: "var(--s3)", transform: hovered === id ? "translateY(0)" : "translateY(4px)" }}>
                  <Badge variant="light" style={{ marginBottom: "var(--s1)" }}>{category}</Badge>
                  <h3 className="font-m text-white" style={{ fontSize: "var(--t-h2)", fontWeight: 700, lineHeight: 1.2, marginBottom: "3px" }}>{title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={11} color="rgba(255,255,255,0.45)" />
                    <span className="t-sm" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>{location}</span>
                  </div>
                </div>
                {/* Zoom badge */}
                <div className="transition-all duration-300"
                  style={{ position: "absolute", top: "var(--s2)", right: "var(--s2)", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(216,185,163,0.90)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered === id ? 1 : 0, transform: hovered === id ? "scale(1)" : "scale(0.7)" }}>
                  <ZoomIn size={14} color="var(--clr-primary-dark)" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA — editorial, left-aligned (not centered) ── */}
        <Reveal>
          <div style={{ marginTop: "var(--s12)", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "var(--s4)", flexWrap: "wrap", borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s6)" }}>
            <div>
              <p className="font-m" style={{ fontWeight: 700, fontSize: "var(--t-h2)", color: "var(--clr-primary)", lineHeight: 1.2 }}>
                Ready to see your project here?
              </p>
              <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)" }}>
                Let's talk about what your site needs.
              </p>
            </div>
            <Button href="#contact" variant="dark" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
              Start Your Project
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
