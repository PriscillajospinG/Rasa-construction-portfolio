"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { projects, projectCategories } from "@/data/projects";
import { scrollTo } from "@/lib/utils";
import { stagger } from "@/lib/animations";

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active,  setActive]  = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      <Container section>
        {/* Header + filter row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)", marginBottom: "var(--s8)" }}>
          <Reveal>
            <SectionTitle eyebrow="Our Portfolio"
              heading={<>Projects that<br /><em className="t-italic">speak for themselves.</em></>} />
          </Reveal>

          <Reveal delay={0.1} direction="right">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s1)" }}>
              {projectCategories.map((cat) => (
                <button key={cat} onClick={() => setActive(cat)} className="t-label font-p transition-all duration-200"
                  style={{ padding: "6px 16px", borderRadius: "100px", background: active === cat ? "var(--clr-primary)" : "var(--clr-white)", color: active === cat ? "white" : "var(--clr-text-md)", border: active === cat ? "none" : "1px solid rgba(0,0,0,0.08)", fontWeight: active === cat ? 600 : 400 }}>
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Masonry */}
        <motion.div ref={ref} variants={stagger()} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ columns: "3", columnGap: "var(--s3)" }} className="columns-1 sm:columns-2 lg:columns-3">
          {filtered.map(({ id, image, title, category, location, tall }) => (
            <motion.div key={id} variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
              style={{ breakInside: "avoid", marginBottom: "var(--s3)", display: "block" }}
              onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}>
              <div style={{ position: "relative", width: "100%", aspectRatio: tall ? "3/4" : "4/3", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: hovered === id ? "var(--sh-xl)" : "var(--sh-md)", transition: "box-shadow 350ms ease" }}>
                <Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700"
                  style={{ transform: hovered === id ? "scale(1.06)" : "scale(1)" }} />
                <div className="absolute inset-0 transition-opacity duration-350"
                  style={{ background: "linear-gradient(to top, rgba(5,31,33,0.92) 0%, rgba(5,31,33,0.28) 55%, transparent 100%)", opacity: hovered === id ? 1 : 0.65 }} />
                <div className="absolute" style={{ bottom: "var(--s3)", left: "var(--s3)", right: "var(--s3)" }}>
                  <Badge variant="light" style={{ marginBottom: "var(--s1)" }}>{category}</Badge>
                  <h3 className="t-h2 text-white" style={{ lineHeight: 1.25, marginBottom: "4px" }}>{title}</h3>
                  <p className="t-sm" style={{ color: "rgba(255,255,255,0.55)" }}>📍 {location}</p>
                </div>
                <div className="transition-all duration-300"
                  style={{ position: "absolute", top: "var(--s2)", right: "var(--s2)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(216,185,163,0.90)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered === id ? 1 : 0, transform: hovered === id ? "scale(1)" : "scale(0.7)" }}>
                  <ZoomIn size={15} color="var(--clr-primary-dark)" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <div style={{ marginTop: "var(--s12)", textAlign: "center" }}>
            <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginBottom: "var(--s3)" }}>Interested in our quality of work?</p>
            <Button href="#contact" variant="dark" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>Start Your Project</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
