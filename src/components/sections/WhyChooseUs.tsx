"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Container from "@/components/layout/Container";
import { whyChooseUs } from "@/data/whyChooseUs";

function getIcon(name: string): LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.CheckCircle2;
}

export default function WhyChooseUs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      ref={ref}
      style={{ background: "var(--clr-bg)", borderTop: "1px solid rgba(8,51,53,0.06)" }}
      className="relative overflow-hidden"
    >
      {/* Faint radial glow — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%", left: "-10%",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,51,53,0.05) 0%, transparent 70%)",
        }}
      />

      <Container section>
        {/* ── Header ── */}
        <Reveal>
          <div style={{ maxWidth: "560px", marginBottom: "var(--s12)" }}>
            <div className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>
              Why Contractors Choose Rasa
            </div>
            <h2 className="t-h1" style={{ color: "var(--clr-primary)", lineHeight: 1.05 }}>
              Not just rental.<br />
              <em className="t-italic-dark">Dependable site support.</em>
            </h2>
            <p className="t-body" style={{ color: "var(--clr-text-md)", marginTop: "var(--s4)", lineHeight: 1.75, maxWidth: "480px" }}>
              Rasa Construction has been the first call for contractors across South Tamil Nadu because we treat each project
              as if our reputation depends on it — because it does.
            </p>
          </div>
        </Reveal>

        {/* ── 3×2 card grid ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s4)" }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {whyChooseUs.map(({ id, title, description, stat, iconName }, i) => {
            const Icon = getIcon(iconName);
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group"
                style={{
                  padding:      "var(--s5)",
                  borderRadius: "var(--r-lg)",
                  background:   "white",
                  border:       "1px solid rgba(8,51,53,0.07)",
                  boxShadow:    "var(--sh-card)",
                  transition:   "box-shadow 300ms ease, transform 300ms ease",
                  cursor:       "default",
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                {/* Icon + stat row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--s4)" }}>
                  <div
                    style={{
                      width: "44px", height: "44px",
                      borderRadius: "var(--r-md)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "linear-gradient(135deg, var(--clr-primary), var(--clr-primary-mid))",
                    }}
                  >
                    <Icon size={20} color="var(--clr-accent)" />
                  </div>
                  {stat && (
                    <span
                      className="t-label"
                      style={{
                        color:           "var(--clr-primary)",
                        background:      "rgba(8,51,53,0.06)",
                        padding:         "4px 10px",
                        borderRadius:    "100px",
                        fontSize:        "0.62rem",
                        fontWeight:      700,
                        letterSpacing:   "0.05em",
                      }}
                    >
                      {stat}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3
                  className="font-p"
                  style={{ fontWeight: 700, fontSize: "var(--t-body)", color: "var(--clr-text)", marginBottom: "var(--s2)", lineHeight: 1.35 }}
                >
                  {title}
                </h3>
                <p
                  className="t-sm"
                  style={{ color: "var(--clr-text-md)", lineHeight: 1.7 }}
                >
                  {description}
                </p>

                {/* Bottom accent line — appears on hover */}
                <div
                  className="group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    height: "2px",
                    marginTop: "var(--s4)",
                    background: "linear-gradient(90deg, var(--clr-primary), var(--clr-accent))",
                    borderRadius: "1px",
                    opacity: 0,
                    transformOrigin: "left",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
