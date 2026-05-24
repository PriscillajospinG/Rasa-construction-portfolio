"use client";

import { useRef, CSSProperties } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import Reveal from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { company } from "@/data/company";

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="services-section section relative overflow-hidden concrete-grid-bg section-with-bridge bridge-dark-to-cream" style={{ backgroundColor: "#F4EFE7" }} ref={ref}>
      <div className="container services-container">
        {/* ── Section Header ── */}
        <div className="section-header">
            <Reveal>
              <p className="section-eyebrow">OUR SERVICES</p>
            </Reveal>
            <h2 className={`section-title services-title-animated ${inView ? "run-letter-animation" : ""}`} aria-label="Services We Offer">
              {"Services We Offer".split("").map((char, index) => (
                <span
                  key={index}
                  className="services-title-letter"
                  style={{ "--i": index } as CSSProperties}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
            <Reveal delay={0.1}>
              <p className="section-lead">
                Practical construction support for scaffolding, centring, concrete work, hoist rental, and site material movement.
              </p>
            </Reveal>
          </div>

          {/* ── Services Grid ── */}
          <div
            className={`services-grid mb-[var(--s6)] ${inView ? "run-card-animation" : ""}`}
          >
            {services.map(({ id, title, description, usedFor, tag, image, alt }, i) => {
              const num = `0${i + 1}`;
              const isFeatured = id === "scaffolding";
              return (
                <div
                  key={id}
                  className={`service-card group ${isFeatured ? "featured" : ""}`}
                >
                  {image && alt && (
                    <div className="service-image relative w-full aspect-[16/10] overflow-hidden rounded-[20px]" style={{ marginBottom: "var(--s2)", flexShrink: 0 }}>
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
                    <div className="service-card-number" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span className="text-xs font-mono text-[#66706B]">{num}</span>
                      {isFeatured && (
                        <span className="text-[10px] font-bold text-[#FFFFFF] bg-[#083335] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Most Requested
                        </span>
                      )}
                    </div>
                    <h3 className="service-card-title">{title}</h3>
                    <p className="service-card-description">{description}</p>
                    {usedFor && (
                      <p className="service-card-used-for text-xs text-[#66706B] mb-4">
                        <strong>Used for:</strong> {usedFor}
                      </p>
                    )}
                    <div className="service-badge mt-auto">
                      <Badge>✓ {tag}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Editorial footer row ── */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: "var(--s12)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)", borderTop: "1px solid rgba(8,51,53,0.08)", paddingTop: "var(--s6)" }}>
              <div>
                <p className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-body)", color: "var(--clr-primary)" }}>Not sure what you need?</p>
                <p className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "var(--s1)", fontStyle: "italic" }}>
                  <em>Call {company.owner} — He&apos;ll tell you exactly what the project requires.</em>
                </p>
              </div>
              <Button href={`tel:${company.contact.primary.replace(/\s/g, "")}`} variant="dark">
                Call for Advice
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
  );
}
