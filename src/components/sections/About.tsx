"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";
import { itemReveal } from "@/lib/animations";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden section-transition"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* ── 1. GRAIN TEXTURE ── */}
      <div
        className="absolute inset-0 grain pointer-events-none"
        style={{
          zIndex: 2,
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.15) 25%, transparent 50%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.15) 25%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <Reveal>
            <p className="section-eyebrow">About Us</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Our Story & Standards
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead">
              A solid foundation built on 25+ years of experience, safety, and operational excellence in Tamil Nadu.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="bento-grid"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              }
            }
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Card 1: Story Card (span 8) */}
          <motion.div
            variants={itemReveal}
            className="bento-card md:col-span-8 col-span-12"
            style={{ minHeight: "360px", display: "flex", flexDirection: "column" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-center">
              <div>
                <span className="text-[var(--clr-primary)] font-bold text-xs uppercase tracking-wider block mb-2">Our Foundation</span>
                <h3 className="text-2xl font-bold text-[var(--clr-primary)] mb-4 leading-tight">
                  25+ Years of<br />Field Experience
                </h3>
                <p className="text-sm text-[var(--clr-text-md)] leading-relaxed mb-4">
                  {company.story.paragraphs[0]}
                </p>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm italic text-[var(--clr-primary)] font-medium mb-1">
                    &ldquo;{company.story.ownerQuote}&rdquo;
                  </p>
                  <span className="text-xs text-[var(--clr-primary-mid)] font-semibold">— {company.owner}, Founder</span>
                </div>
              </div>
              <div className="relative w-full h-[220px] lg:h-full rounded-2xl overflow-hidden shadow-lg min-h-[220px]">
                <Image
                  src="/about/about-owner-site.jpg"
                  alt="Rasa Construction site photo showing the team and Rasa Name Board"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs text-[var(--clr-accent)] font-bold block">Founded by</span>
                  <span className="text-sm text-white font-bold block">{company.owner}</span>
                  <span className="text-[11px] text-gray-300 block">{company.location.label}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Timeline Card (span 4) */}
          <motion.div
            variants={itemReveal}
            className="bento-card md:col-span-4 col-span-12"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span className="text-[var(--clr-primary)] font-bold text-xs uppercase tracking-wider block mb-4">Our Journey</span>
            <div className="flex flex-col gap-4 relative pl-4 border-l border-[var(--clr-accent)] ml-2 flex-grow justify-between py-1">
              {[
                { year: "2000", text: "Rasa Construction started" },
                { year: "Early years", text: "Local centring and construction support" },
                { year: "Growth", text: "Scaffolding and equipment supply expanded" },
                { year: "Today", text: "Serving projects across South Tamil Nadu" }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--clr-accent)] border-2 border-white" />
                  <span className="text-[11px] font-bold text-[var(--clr-primary)] block leading-none mb-1">{item.year}</span>
                  <span className="text-xs text-gray-600 font-medium leading-tight block">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Stats Card (span 4) */}
          <motion.div
            variants={itemReveal}
            className="bento-card md:col-span-4 col-span-12"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <span className="text-[var(--clr-primary)] font-bold text-xs uppercase tracking-wider block mb-3">By the Numbers</span>
            <div className="grid grid-cols-2 gap-3 flex-grow mt-2">
              {[
                { val: "25+", label: "Years Experience" },
                { val: "500+", label: "Completed Projects" },
                { val: "100+", label: "Equipment Units" },
                { val: "300+", label: "Satisfied Clients" }
              ].map((stat, idx) => (
                <div key={idx} className="border border-gray-100 p-3 rounded-2xl bg-gray-50/50 flex flex-col justify-center items-center text-center shadow-sm">
                  <span className="text-xl font-extrabold text-[var(--clr-primary)]">{stat.val}</span>
                  <span className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Coverage Card (span 4) */}
          <motion.div
            variants={itemReveal}
            className="bento-card md:col-span-4 col-span-12"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <span className="text-[var(--clr-primary)] font-bold text-xs uppercase tracking-wider block mb-3">Operational Coverage</span>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-[var(--clr-primary)]" size={16} />
                <span className="text-sm font-semibold text-[var(--clr-primary)]">South Tamil Nadu</span>
              </div>
              <p className="text-xs text-[var(--clr-text-md)] leading-relaxed">
                Serving construction sites and infrastructure projects across Tirunelveli, Tenkasi, Thoothukudi, Nagercoil, Kanyakumari, and surrounding areas.
              </p>
            </div>
            <div className="border-t border-gray-100 pt-3 mt-4 flex items-center justify-between text-xs text-[var(--clr-text-lt)]">
               <span>Main Depot:</span>
               <span className="text-[var(--clr-primary)] font-medium">{company.location.label}</span>
            </div>
          </motion.div>

          {/* Card 5: Safety & Quality Card (span 4) */}
          <motion.div
            variants={itemReveal}
            className="bento-card md:col-span-4 col-span-12"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <span className="text-[var(--clr-primary)] font-bold text-xs uppercase tracking-wider block mb-3">Our Standards</span>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Every dispatch is checked for safe structural loads.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "100% Load-Tested Material",
                  "Strict Site Safety Focus",
                  "On-Time Project Delivery",
                  "Direct Owner Involvement"
                ].map((diff, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0" size={13} />
                    <span className="text-xs text-gray-700 font-medium">{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              href="#contact"
              variant="dark"
              size="sm"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="mt-4 w-full justify-center"
            >
              Get a Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
