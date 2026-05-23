"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { itemReveal } from "@/lib/animations";

const getServiceBentoClass = (id: string) => {
  if (id === "scaffolding") return "bento-card-lg md:col-span-6";
  if (id === "centring") return "bento-card-half md:col-span-6";
  if (id === "concrete") return "bento-card-sm md:col-span-3";
  if (id === "hoist") return "bento-card-sm md:col-span-3";
  return "md:col-span-12 col-span-12"; // for site support
};

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative overflow-hidden concrete-grid-bg section-transition" style={{ backgroundColor: "#F4EFE7" }}>
      <div className="section" ref={ref}>
        <div className="container">
          {/* ── Section Header ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s1)", marginBottom: "var(--s8)" }}>
            <Reveal>
              <p className="section-eyebrow">Services</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Services We Offer
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="section-lead">
                Built for real field work, site safety, and reliable project execution.
              </p>
            </Reveal>
          </div>

          {/* ── Services Grid ── */}
          <motion.div
            className="bento-grid mb-[var(--s6)]"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                }
              }
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {services.map(({ id, title, description, usedFor, tag, image, alt }, i) => {
              const num = `0${i + 1}`;
              const bentoClass = getServiceBentoClass(id);
              const isFeatured = id === "scaffolding";
              return (
                <motion.div
                  key={id}
                  variants={itemReveal}
                  className={`service-card bento-card group ${bentoClass}`}
                >
                  {image && alt && (
                    <div className="bento-media relative w-full aspect-[16/10] overflow-hidden rounded-[20px]" style={{ marginBottom: "var(--s2)", flexShrink: 0 }}>
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="service-image-overlay" />
                    </div>
                  )}
                  <div className="service-card-content" style={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: "var(--s2)", paddingTop: "var(--s1)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="service-number text-xs font-mono text-gray-400">{num}</span>
                      {isFeatured && (
                        <span className="text-[10px] font-bold text-[var(--clr-accent)] bg-[var(--clr-primary)] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Most Requested
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: isFeatured ? "1.6rem" : "var(--t-h2)", color: "var(--clr-primary)", fontWeight: 800, lineHeight: 1.2 }}>{title}</h3>
                    <p className="service-description" style={{ fontSize: "var(--t-sm)", color: "var(--clr-text-md)", lineHeight: 1.6 }}>{description}</p>
                    {usedFor && (
                      <p className="used-for" style={{ fontSize: "0.78rem", color: "var(--clr-text-lt)", marginTop: "2px", lineHeight: 1.5 }}>
                        <strong>Used for:</strong>{" "}{usedFor}
                      </p>
                    )}
                    <div className="service-badge" style={{ marginTop: "auto", paddingTop: "var(--s2)" }}>
                      <Badge variant="dark">✓ {tag}</Badge>
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
                <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)" }}>
                  Call {company.owner} — he&apos;ll tell you exactly what the project requires.
                </p>
              </div>
              <Button href={`tel:${company.contact.primary.replace(/\s/g, "")}`} variant="dark">
                Call for Advice
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
