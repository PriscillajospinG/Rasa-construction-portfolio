"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import { equipment } from "@/data/equipment";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";
import { cardGridStagger, itemReveal, EASE_CINEMATIC } from "@/lib/animations";

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
      className="section"
      style={{ background: "white", position: "relative", overflow: "hidden" }}
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
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s8)", alignItems: "end", marginBottom: "var(--s12)" }}
            className="grid-cols-1 lg:grid-cols-2"
          >
            <div>
              <div className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>
                Rental Inventory
              </div>
              <h2 className="t-h1" style={{ color: "var(--clr-primary)", lineHeight: 1.05 }}>
                Equipment &<br />
                <em className="t-italic-dark">materials we supply.</em>
              </h2>
            </div>
            <div>
              <p className="t-body" style={{ color: "var(--clr-text-md)", lineHeight: 1.75 }}>
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

        {/* ── Equipment grid — stagger container ── */}
        <motion.div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s3)" }}
          className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={cardGridStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {equipment.map(({ id, name, description, variants, iconName }) => {
            const Icon = getIcon(iconName);
            return (
              <motion.div
                key={id}
                variants={itemReveal}
                className="group card-hover"
                style={{
                  padding:       "var(--s4)",
                  borderRadius:  "var(--r-lg)",
                  background:    "var(--clr-bg)",
                  border:        "1px solid rgba(8,51,53,0.07)",
                  boxShadow:     "var(--sh-card)",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "var(--s2)",
                }}
              >
                {/* Icon — scale on reveal */}
                <motion.div
                  style={{
                    width: "38px", height: "38px",
                    borderRadius: "var(--r-md)",
                    background: "linear-gradient(135deg, var(--clr-primary), var(--clr-primary-mid))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "var(--s1)",
                    flexShrink: 0,
                    transition: "transform 300ms ease",
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.25, ease: EASE_CINEMATIC } }}
                >
                  <Icon size={17} color="var(--clr-accent)" />
                </motion.div>

                {/* Name */}
                <h3
                  className="font-p"
                  style={{ fontWeight: 700, fontSize: "var(--t-sm)", color: "var(--clr-text)", lineHeight: 1.3 }}
                >
                  {name}
                </h3>

                {/* Description */}
                <p
                  className="t-sm"
                  style={{ color: "var(--clr-text-md)", lineHeight: 1.65, fontSize: "0.78rem", flex: 1 }}
                >
                  {description}
                </p>

                {/* Variants chip */}
                {variants && (
                  <div
                    className="t-label"
                    style={{
                      color:        "var(--clr-primary)",
                      background:   "rgba(8,51,53,0.06)",
                      padding:      "3px 10px",
                      borderRadius: "100px",
                      fontSize:     "0.6rem",
                      fontWeight:   700,
                      alignSelf:    "flex-start",
                      marginTop:    "var(--s1)",
                    }}
                  >
                    {variants}
                  </div>
                )}
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
