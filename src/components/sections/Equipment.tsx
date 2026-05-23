"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import { equipment } from "@/data/equipment";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";
import { cardGridStagger, itemReveal } from "@/lib/animations";

function getIcon(name: string): LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.Package;
}

export default function Equipment() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="equipment"
      ref={ref}
      className="section section-transition"
      style={{ background: "#F4EFE7", position: "relative", overflow: "hidden" }}
    >
      {/* Faint diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(8,51,53,0.018) 0px, rgba(8,51,53,0.018) 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="container">
        {/* ── Header ── */}
        <Reveal>
          <div
            style={{ gap: "var(--s8)", alignItems: "end" }}
            className="section-header grid grid-cols-1 lg:grid-cols-2 equipment-header-grid"
          >
            <div>
              <p className="section-eyebrow">Rental Inventory</p>
              <h2 className="section-title">
                Equipment &<br />
                <em className="t-italic-dark">materials we supply.</em>
              </h2>
            </div>
            <div>
              <p className="section-lead">
                All inventory is maintained in-house, inspected between rentals, and delivered to your site.
                Items are available individually or as combined packages based on your project requirement.
              </p>
              <div
                className="t-label"
                style={{ color: "var(--clr-primary)", marginTop: "var(--s4)", fontWeight: 700 }}
              >
                Call to check current availability →&nbsp;
                <a href={`tel:${company.contact.primary.replace(/\s/g, "")}`} style={{ color: "inherit", textDecoration: "underline" }}>
                  {company.contact.primary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Equipment grid — bento layout ── */}
        <motion.div
          className="bento-grid"
          variants={cardGridStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {equipment.map(({ id, name, description, variants, iconName, image }) => {
            const Icon = getIcon(iconName);
            const isFeatured = id === "scaffold-tubes";
            return (
              <motion.div
                key={id}
                variants={itemReveal}
                className={`group bento-card equipment-card ${isFeatured ? "bento-card-wide md:col-span-8" : "bento-card-md md:col-span-4"} col-span-12`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image block at the top */}
                {image && (
                  <div className="bento-media relative w-full aspect-[16/10] overflow-hidden rounded-[12px] mb-4" style={{ flexShrink: 0 }}>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Content underneath */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--s2)", flexGrow: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--s2)", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "28px", height: "28px",
                          borderRadius: "50%",
                          background: "rgba(8,51,53,0.06)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={12} style={{ color: "var(--clr-primary)" }} />
                      </div>
                      <h3
                        className="font-p font-extrabold"
                        style={{ fontSize: "1.1rem", color: "var(--clr-primary)", lineHeight: 1.2 }}
                      >
                        {name}
                      </h3>
                    </div>
                    {variants && (
                      <span className="text-[10px] font-bold text-[var(--clr-primary)] uppercase tracking-wider bg-[var(--clr-accent)] px-2 py-0.5 rounded-full ml-auto">
                        {variants}
                      </span>
                    )}
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: "0.85rem", color: "var(--clr-text-md)", marginTop: "2px" }}
                  >
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Note strip ── */}
        <Reveal delay={0.15}>
          <div className="package-strip">
            <div>
              <div
                className="font-m text-white"
                style={{ fontWeight: 800, fontSize: "var(--t-body)", marginBottom: "var(--s1)" }}
              >
                Need a custom equipment package?
              </div>
              <p
                className="t-sm"
                style={{ color: "rgba(255,255,255,0.58)", lineHeight: 1.6 }}
              >
                We build combined scaffold + centring + hoist packages for single billing convenience.
                Mention your project floor count and structure type when you call.
              </p>
            </div>
            <Button
              href="#contact"
              variant="primary"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              style={{ fontWeight: 700 }}
            >
              Get a Package Quote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
