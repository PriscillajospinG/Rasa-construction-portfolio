"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, Layers, Blocks, ArrowUpDown, HardHat, Wrench } from "lucide-react";

const services = [
  { icon: LayoutGrid, title: "Scaffolding Rental",   desc: "Premium steel scaffolding — inspected, certified, configured to your project. We handle full setup, safety checks, and takedown.",              tag: "Most Popular",  img: "/images/project-scaffolding.png" },
  { icon: Layers,     title: "Centring Materials",   desc: "Steel props, plates, and beams for slab formwork and beam casting. Well-maintained, well-stocked, and ready when you need them.",         tag: "100+ Varieties", img: null },
  { icon: Blocks,     title: "Concrete Works",       desc: "Expert execution of column casting, slab work, and structural concrete. Precision at every pour.",                                         tag: "Expert Crew",   img: null },
  { icon: ArrowUpDown,title: "Vertical Hoist Rental","desc": "Industrial material hoists that slash vertical transport time. Daily and monthly rental options available.",                               tag: "Daily Rental",  img: "/images/project-hoist.png" },
  { icon: HardHat,    title: "Site Support",         desc: "On-call supervision, safety guidance, and equipment coordination — so you focus on building, not logistics.",                              tag: "Full Coverage", img: null },
  { icon: Wrench,     title: "Equipment Upkeep",     desc: "All rented equipment is regularly serviced. Fast-response technicians keep your project timeline intact.",                                 tag: "24/7 Response", img: null },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      {/* Curve from above */}
      <div className="curve">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      <div className="c s" ref={ref}>

        {/* Header — editorial split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s8)", alignItems: "end", marginBottom: "var(--s12)" }}
          className="grid-cols-1 lg:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
              className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>
              What We Offer
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
              className="t-h1" style={{ color: "var(--clr-primary)" }}>
              Services built for<br />real{" "}<em className="t-italic">field work.</em>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="t-body" style={{ color: "var(--clr-text-lt)", alignSelf: "end" }}>
            From a single-floor scaffold to full multi-storey hoist setups, we cover the complete range of construction rental and support needs — backed by 15 years of field expertise.
          </motion.p>
        </div>

        {/* Card grid — 3 equal columns, consistent gaps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s3)" }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, tag, img }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group card relative overflow-hidden"
              style={img ? { minHeight: "320px", border: "none" } : {}}>

              {/* Image bg cards */}
              {img && (
                <>
                  <div className="absolute inset-0" style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,31,33,0.96) 45%, rgba(5,31,33,0.45) 100%)" }} />
                </>
              )}

              {/* Top hover line */}
              <div className="absolute top-0 left-0 right-0 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ height: "2px", background: "linear-gradient(90deg, var(--clr-primary), var(--clr-accent))" }} />

              <div className="relative z-10 flex flex-col h-full" style={{ padding: "var(--s4)" }}>
                {img && <div style={{ flex: 1 }} />}

                <div style={{
                  width: "44px", height: "44px", borderRadius: "var(--r-md)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: img ? "rgba(216,185,163,0.15)" : "linear-gradient(135deg, var(--clr-primary), var(--clr-primary-mid))",
                  border: img ? "1px solid rgba(216,185,163,0.2)" : "none",
                  marginBottom: "var(--s3)",
                  transition: "transform 300ms var(--ease)"
                }}
                  className="group-hover:scale-110">
                  <Icon size={20} color="var(--clr-accent)" />
                </div>

                <h3 className="t-h2" style={{ color: img ? "white" : "var(--clr-text)", marginBottom: "var(--s2)" }}>{title}</h3>
                <p className="t-sm" style={{ color: img ? "rgba(255,255,255,0.62)" : "var(--clr-text-lt)", lineHeight: 1.7, marginBottom: "var(--s3)", flex: 1 }}>{desc}</p>

                <span className="t-label" style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  background: img ? "rgba(216,185,163,0.15)" : "rgba(8,51,53,0.07)",
                  border: img ? "1px solid rgba(216,185,163,0.22)" : "none",
                  color: img ? "var(--clr-accent)" : "var(--clr-primary)",
                }}>✓ {tag}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom editorial CTA row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: "var(--s12)", display: "flex", alignItems: "center", gap: "var(--s8)", flexWrap: "wrap",
            borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s8)" }}>
          <div>
            <p className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-primary)" }}>Not sure what you need?</p>
            <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)" }}>Call Gurusamy sir — he'll tell you exactly what the project requires.</p>
          </div>
          <a href="tel:+919842766379" className="btn btn-dark" style={{ flexShrink: 0 }}>📞 Call for Advice</a>
        </motion.div>
      </div>
    </section>
  );
}
