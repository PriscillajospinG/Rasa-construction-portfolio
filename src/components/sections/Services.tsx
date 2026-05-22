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

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative overflow-hidden" style={{ backgroundColor: "#F6F1EA" }}>
      <div className="section" ref={ref}>
        <div className="container">
          {/* ── Section Header ── */}
          <div className="mb-[var(--s8)] flex flex-col gap-[var(--s2)]">
            <Reveal>
              <h2 className="t-h1 text-[var(--clr-primary)]">
                Services We Offer
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-body text-[var(--clr-text-md)] max-w-[640px] leading-[var(--lh-normal)]">
                Built for real field work, site safety, and reliable project execution.
              </p>
            </Reveal>
          </div>

          {/* ── Services Grid ── */}
          <motion.div
            className="services-grid mb-[var(--s6)]"
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
              return (
                <motion.div
                  key={id}
                  variants={itemReveal}
                  className="service-card group"
                >
                  {image && alt && (
                    <div className="service-image">
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
                  <div className="service-card-content">
                    <span className="service-number">{num}</span>
                    <h3>{title}</h3>
                    <p className="service-description">{description}</p>
                    {usedFor && (
                      <p className="used-for">
                        <strong>Used for:</strong>{" "}{usedFor}
                      </p>
                    )}
                    <div className="service-badge">
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
