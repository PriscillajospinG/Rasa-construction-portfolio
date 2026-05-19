"use client";

import { useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const val    = useMotionValue(0);
  const spring = useSpring(val, { duration: 1800, bounce: 0 });
  const inView = useInView(ref, { once: true });
  useEffect(() => { if (inView) val.set(target); }, [inView, val, target]);
  useEffect(() => spring.on("change", (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const highlights = [
  "Reliable scaffolding & centring materials for projects of any scale",
  "Safety-first — all equipment load-tested before every deployment",
  "Experienced team with deep regional construction knowledge",
  "Competitive daily & monthly rental pricing, zero hidden fees",
];

export default function About() {
  return (
    <section id="about" style={{ background: "white" }} className="relative overflow-hidden">
      {/* Curve transition */}
      <div className="curve">
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,72 C360,0 1080,0 1440,72 L1440,0 L0,0 Z" fill="#F7F5F2" />
        </svg>
      </div>

      <Container section>
        <Reveal>
          <SectionTitle eyebrow="Our Story" heading={<>A construction partner<br />you can <em className="t-italic">count on.</em></>}
            style={{ marginBottom: "var(--s12)" }} />
        </Reveal>

        {/* 5/7 asymmetric grid */}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "var(--s16)", alignItems: "start" }}
          className="grid-cols-1 lg:grid-cols-[5fr_7fr]">

          {/* Text */}
          <Reveal>
            <p className="t-body" style={{ color: "var(--clr-text-md)", marginBottom: "var(--s3)", maxWidth: "480px" }}>
              Founded by <strong style={{ color: "var(--clr-primary)" }}>{company.owner}</strong>, {company.name} has been the trusted name for scaffolding, centring materials, concrete works, and hoist rental across Tamil Nadu for over {new Date().getFullYear() - company.founded} years.
            </p>
            <p className="t-body" style={{ color: "var(--clr-text-lt)", marginBottom: "var(--s6)", maxWidth: "480px" }}>
              We don't just supply equipment — we partner with builders to ensure every structure rises safely and on schedule. Reliability, safety, and genuine care mark everything we do.
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--s2)", marginBottom: "var(--s8)" }}>
              {highlights.map((pt, i) => (
                <Reveal key={pt} delay={0.1 * i}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "var(--s2)" }}>
                    <CheckCircle2 size={17} style={{ color: "var(--clr-primary)", flexShrink: 0, marginTop: "3px" }} />
                    <span className="t-sm" style={{ color: "var(--clr-text-md)", lineHeight: 1.7 }}>{pt}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Button href="#contact" variant="dark" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
              Talk to {company.owner} →
            </Button>
          </Reveal>

          {/* Image composition */}
          <Reveal direction="right">
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "var(--sh-xl)" }}>
                <Image src="/team/about-team.png" alt="Rasa Construction team at site" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,31,33,0.65) 0%, transparent 55%)" }} />
                <div className="absolute" style={{ bottom: "var(--s4)", left: "var(--s4)", right: "var(--s4)" }}>
                  <div className="t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s1)" }}>On the ground</div>
                  <div className="font-m font-bold text-white" style={{ fontSize: "var(--t-h2)", lineHeight: 1.3 }}>
                    Planning with precision,<br />building with purpose.
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="glass-dark" style={{ position: "absolute", bottom: "5rem", left: "-2rem", borderRadius: "var(--r-lg)", padding: "var(--s3)", minWidth: "136px", boxShadow: "var(--sh-xl)" }}>
                <div className="font-m" style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--clr-accent)", lineHeight: 1 }}>
                  <Counter target={new Date().getFullYear() - company.founded} suffix="+" />
                </div>
                <div className="t-sm" style={{ color: "rgba(255,255,255,0.70)", marginTop: "var(--s1)", lineHeight: 1.4 }}>Years of field<br />experience</div>
              </div>

              {/* Badge */}
              <div style={{ position: "absolute", top: "-1rem", right: "-1rem", background: "rgba(247,245,242,0.96)", border: "1px solid rgba(8,51,53,0.08)", borderRadius: "var(--r-lg)", padding: "var(--s2) var(--s3)", boxShadow: "var(--sh-md)", display: "flex", alignItems: "center", gap: "var(--s1)" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} className="animate-pulse" />
                <span className="t-sm font-p" style={{ fontWeight: 600, color: "var(--clr-primary)" }}>500+ Projects Done</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
