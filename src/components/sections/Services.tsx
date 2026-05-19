"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { stagger } from "@/lib/animations";

function getIcon(name: string): LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.HardHat;
}

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      <div className="curve">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      <Container section ref={ref}>
        {/* Split header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s8)", alignItems: "end", marginBottom: "var(--s12)" }}
          className="grid-cols-1 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="What We Offer"
              heading={<>Services built for<br />real <em className="t-italic">field work.</em></>} />
          </Reveal>
          <Reveal delay={0.1} direction="right">
            <p className="t-body" style={{ color: "var(--clr-text-lt)" }}>
              From a single-floor scaffold to full multi-storey hoist setups, we cover the complete range of construction rental and support needs — backed by {new Date().getFullYear() - company.founded} years of expertise.
            </p>
          </Reveal>
        </div>

        {/* Card grid — 3 equal columns */}
        <motion.div ref={ref} variants={stagger()} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s3)" }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, iconName, title, description, tag, image }) => {
            const Icon = getIcon(iconName);
            return (
              <motion.div key={id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
                className="group card relative overflow-hidden"
                style={image ? { minHeight: "300px", border: "none" } : {}}>
                {image && (
                  <>
                    <div className="absolute inset-0" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,31,33,0.96) 45%, rgba(5,31,33,0.45) 100%)" }} />
                  </>
                )}
                <div className="absolute top-0 left-0 right-0 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ height: "2px", background: "linear-gradient(90deg, var(--clr-primary), var(--clr-accent))" }} />

                <div className="relative z-10 flex flex-col h-full" style={{ padding: "var(--s4)" }}>
                  {image && <div style={{ flex: 1 }} />}
                  <div style={{ width: "44px", height: "44px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", background: image ? "rgba(216,185,163,0.15)" : "linear-gradient(135deg, var(--clr-primary), var(--clr-primary-mid))", border: image ? "1px solid rgba(216,185,163,0.2)" : "none", marginBottom: "var(--s3)", transition: "transform 300ms var(--ease)" }} className="group-hover:scale-110">
                    <Icon size={20} color="var(--clr-accent)" />
                  </div>
                  <h3 className="t-h2" style={{ color: image ? "white" : "var(--clr-text)", marginBottom: "var(--s2)" }}>{title}</h3>
                  <p className="t-sm" style={{ color: image ? "rgba(255,255,255,0.62)" : "var(--clr-text-lt)", lineHeight: 1.7, marginBottom: "var(--s3)", flex: 1 }}>{description}</p>
                  <Badge variant={image ? "light" : "dark"}>✓ {tag}</Badge>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Editorial CTA row */}
        <Reveal>
          <div style={{ marginTop: "var(--s12)", display: "flex", alignItems: "center", gap: "var(--s8)", flexWrap: "wrap", borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s8)" }}>
            <div>
              <p className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-primary)" }}>Not sure what you need?</p>
              <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)" }}>Call {company.owner} — he'll tell you exactly what the project requires.</p>
            </div>
            <Button href={`tel:${company.contact.primary.replace(/\s/g,"")}`} variant="dark" style={{ flexShrink: 0 }}>
              📞 Call for Advice
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
