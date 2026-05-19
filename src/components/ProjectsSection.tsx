"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

const projects = [
  { img: "/images/hero.png",              title: "High-Rise Scaffolding Setup",     cat: "Scaffolding",  loc: "Tirunelveli, TN",  tall: true  },
  { img: "/images/project-concrete.png",  title: "Residential Complex – Concrete",  cat: "Concrete",     loc: "Achankuttam, TN",  tall: false },
  { img: "/images/project-scaffolding.png",title: "Commercial Building Scaffold",   cat: "Scaffolding",  loc: "Tamil Nadu",       tall: false },
  { img: "/images/project-hoist.png",     title: "Vertical Hoist – Multistorey",    cat: "Hoist Rental", loc: "Tirunelveli, TN",  tall: true  },
  { img: "/images/about-team.png",        title: "Site Support & Coordination",     cat: "Site Support", loc: "Tamil Nadu",       tall: false },
];

const cats = ["All", "Scaffolding", "Concrete", "Hoist Rental", "Site Support"];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section id="projects" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      <div className="c s" ref={ref}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)", marginBottom: "var(--s8)" }}>
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
              className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>
              Our Portfolio
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
              className="t-h1" style={{ color: "var(--clr-primary)" }}>
              Projects that<br /><em className="t-italic">speak for themselves.</em>
            </motion.h2>
          </div>

          {/* Filter pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--s1)" }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className="t-label font-p transition-all duration-200"
                style={{
                  padding: "6px 16px", borderRadius: "100px",
                  background: active === c ? "var(--clr-primary)" : "var(--clr-white)",
                  color: active === c ? "white" : "var(--clr-text-md)",
                  border: active === c ? "none" : "1px solid rgba(0,0,0,0.08)",
                  fontWeight: active === c ? 600 : 400,
                }}>
                {c}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry — columns: 3 desktop, 2 tablet, 1 mobile */}
        <div style={{ columns: "3", columnGap: "var(--s3)" }} className="columns-1 sm:columns-2 lg:columns-3">
          {filtered.map(({ img, title, cat, loc, tall }, i) => (
            <motion.div key={title + i}
              initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ breakInside: "avoid", marginBottom: "var(--s3)", display: "block" }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div style={{
                position: "relative", width: "100%", aspectRatio: tall ? "3/4" : "4/3",
                borderRadius: "var(--r-lg)", overflow: "hidden",
                boxShadow: hovered === i ? "var(--sh-xl)" : "var(--sh-md)",
                transition: "box-shadow 350ms ease",
              }}>
                <Image src={img} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700"
                  style={{ transform: hovered === i ? "scale(1.06)" : "scale(1)" }} />

                {/* Overlay */}
                <div className="absolute inset-0 transition-opacity duration-350"
                  style={{ background: "linear-gradient(to top, rgba(5,31,33,0.92) 0%, rgba(5,31,53,0.28) 55%, transparent 100%)", opacity: hovered === i ? 1 : 0.65 }} />

                {/* Info */}
                <div className="absolute" style={{ bottom: "var(--s3)", left: "var(--s3)", right: "var(--s3)" }}>
                  <span className="t-label" style={{
                    display: "inline-block", marginBottom: "var(--s1)", padding: "3px 10px", borderRadius: "100px",
                    background: "rgba(216,185,163,0.18)", border: "1px solid rgba(216,185,163,0.28)", color: "var(--clr-accent)",
                  }}>{cat}</span>
                  <h3 className="t-h2 text-white" style={{ lineHeight: 1.25, marginBottom: "4px" }}>{title}</h3>
                  <p className="t-sm" style={{ color: "rgba(255,255,255,0.55)" }}>📍 {loc}</p>
                </div>

                {/* Zoom badge */}
                <div className="transition-all duration-300"
                  style={{
                    position: "absolute", top: "var(--s2)", right: "var(--s2)",
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "rgba(216,185,163,0.90)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "scale(1)" : "scale(0.7)",
                  }}>
                  <ZoomIn size={15} color="var(--clr-primary-dark)" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: "var(--s12)", textAlign: "center" }}>
          <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginBottom: "var(--s3)" }}>Interested in our quality of work?</p>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-dark">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
