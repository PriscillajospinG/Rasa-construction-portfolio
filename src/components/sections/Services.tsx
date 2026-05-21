"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { cardGridStagger, itemReveal } from "@/lib/animations";

function getIcon(name: string): LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.HardHat;
}

// Tertiary — list treatment
const tertiary = services.slice(3);

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative overflow-hidden bg-[var(--clr-bg)]">
      <div className="curve">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      <div className="section" ref={ref}>
        <div className="container">
        {/* ── Section Header ── */}
        <div className="mb-[var(--s8)] flex flex-col">
          <Reveal>
            <div className="eyebrow t-label mb-[var(--s2)] text-[var(--clr-primary)]">
              What We Offer
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-h1 text-[var(--clr-primary)]">
              Services built for<br /><em className="t-italic-dark">real field work.</em>
            </h2>
          </Reveal>
        </div>

        {/* ── Services Grid ── */}
        <motion.div
          className="services-grid mb-[var(--s3)]"
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
          {services.slice(0, 3).map(({ id, title, description, usedFor, tag, image, alt }, i) => {
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

        {/* ── Row 2: Tertiary services — horizontal editorial list ── */}
        <div style={{ borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s6)" }}>
          <div className="t-label" style={{ color: "var(--clr-text-md)", marginBottom: "var(--s4)", fontWeight: 600 }}>Also available</div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--s3)] lg:gap-[var(--s4)]"
            variants={cardGridStagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {tertiary.map(({ id, iconName, title, description, tag }, i) => {
              const Icon = getIcon(iconName);
              return (
                <motion.div key={id}
                  variants={itemReveal}
                  className="group"
                  style={{ padding: "var(--s3) 0" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)", marginBottom: "var(--s2)" }}>
                    <Icon size={18} color="var(--clr-primary)" />
                    <h4 className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-text)" }}>{title}</h4>
                  </div>
                  <p className="t-sm" style={{ color: "var(--clr-text-lt)", lineHeight: 1.65, marginBottom: "var(--s2)" }}>{description}</p>
                  <div className="group-hover:opacity-100 transition-opacity duration-200 t-label"
                    style={{ color: "var(--clr-primary)", opacity: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>{tag}</span> <ArrowRight size={12} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Editorial footer row ── */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: "var(--s12)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)", borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s6)" }}>
            <div>
              <p className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-primary)" }}>Not sure what you need?</p>
              <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)" }}>
                Call {company.owner} — he'll tell you exactly what the project requires.
              </p>
            </div>
            <Button href={`tel:${company.contact.primary.replace(/\s/g, "")}`} variant="dark">
              📞 Call for Advice
            </Button>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
