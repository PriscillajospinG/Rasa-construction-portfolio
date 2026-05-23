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
      style={{ background: "#FBF7F1", position: "relative", overflow: "hidden" }}
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
            style={{ gap: "var(--s8)", alignItems: "end", marginBottom: "var(--s12)" }}
            className="grid grid-cols-1 lg:grid-cols-2 equipment-header-grid"
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
                className={`group bento-card bento-card-dark equipment-card ${isFeatured ? "bento-card-wide md:col-span-8" : "bento-card-md md:col-span-4"} col-span-12`}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "var(--s6)",
                  minHeight: isFeatured ? "320px" : "280px",
                }}
              >
                {/* Background image & gradient overlay */}
                {image && (
                  <div className="absolute inset-0 bento-media">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-350"
                      style={{
                        background: "linear-gradient(to top, rgba(5,31,33,0.95) 0%, rgba(5,31,33,0.3) 60%, transparent 100%)",
                      }}
                    />
                  </div>
                )}

                {/* Content Overlay */}
                <div className="relative z-10 mt-auto flex flex-col gap-2">
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                    <div
                      style={{
                        width: "32px", height: "32px",
                        borderRadius: "50%",
                        background: "rgba(216,185,163,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Icon size={14} className="text-[var(--clr-accent)]" />
                    </div>
                    {variants && (
                      <span className="text-[10px] font-bold text-[var(--clr-accent)] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full">
                        {variants}
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-p text-white font-extrabold"
                    style={{ fontSize: isFeatured ? "1.45rem" : "1.1rem", lineHeight: 1.2 }}
                  >
                    {name}
                  </h3>
                  <p
                    className="text-gray-300 leading-relaxed"
                    style={{ fontSize: "0.78rem", maxWidth: isFeatured ? "520px" : "100%" }}
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
