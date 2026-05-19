"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const val = useMotionValue(0);
  const spring = useSpring(val, { duration: 1800, bounce: 0 });
  const inView = useInView(ref, { once: true });
  useEffect(() => { if (inView) val.set(target); }, [inView, val, target]);
  useEffect(() => spring.on("change", (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const points = [
  "Reliable scaffolding & centring materials for projects of any scale",
  "Safety-first — all equipment load-tested before every deployment",
  "Experienced team with deep regional construction knowledge",
  "Competitive daily & monthly rental pricing, zero hidden fees",
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" style={{ background: "white" }} className="relative overflow-hidden">
      {/* Curve from hero */}
      <div className="curve">
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,72 C360,0 1080,0 1440,72 L1440,0 L0,0 Z" fill="#F7F5F2" />
        </svg>
      </div>

      <div className="c s" ref={ref}>

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
          className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s12)" }}>
          Our Story
        </motion.div>

        {/* 5/7 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "var(--s16)", alignItems: "start" }}
          className="grid-cols-1 lg:grid-cols-[5fr_7fr]">

          {/* Left — text */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="t-h1" style={{ color: "var(--clr-primary)", marginBottom: "var(--s4)" }}>
              A construction partner<br />you can{" "}
              <em className="t-italic">count on.</em>
            </h2>

            <p className="t-body" style={{ color: "var(--clr-text-md)", marginBottom: "var(--s3)", maxWidth: "480px" }}>
              Founded by <strong style={{ color: "var(--clr-primary)" }}>Gurusamy A</strong>, Rasa Construction has been the trusted name for scaffolding, centring materials, concrete works, and hoist rental across Tamil Nadu for over 15 years.
            </p>
            <p className="t-body" style={{ color: "var(--clr-text-lt)", marginBottom: "var(--s6)", maxWidth: "480px" }}>
              We don't just supply equipment — we partner with builders to ensure every structure rises safely and on schedule. Our work reflects reliability, safety, and the pride of a team that knows the trade inside out.
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--s2)", marginBottom: "var(--s8)" }}>
              {points.map((pt, i) => (
                <motion.li key={pt} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "var(--s2)" }}>
                  <CheckCircle2 size={17} style={{ color: "var(--clr-primary)", flexShrink: 0, marginTop: "3px" }} />
                  <span className="t-sm" style={{ color: "var(--clr-text-md)", lineHeight: 1.7 }}>{pt}</span>
                </motion.li>
              ))}
            </ul>

            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-dark">
              Talk to Gurusamy sir →
            </a>
          </motion.div>

          {/* Right — image composition */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "var(--sh-xl)" }}>
              <Image src="/images/about-team.png" alt="Rasa Construction team at site" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,31,33,0.65) 0%, transparent 55%)" }} />
              {/* Caption */}
              <div className="absolute" style={{ bottom: "var(--s4)", left: "var(--s4)", right: "var(--s4)" }}>
                <div className="t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s1)" }}>On the ground</div>
                <div className="font-m font-bold text-white" style={{ fontSize: "var(--t-h2)", lineHeight: 1.3 }}>
                  Planning with precision,<br />building with purpose.
                </div>
              </div>
            </div>

            {/* Floating years stat */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.65, type: "spring" }}
              className="glass-dark" style={{ position: "absolute", bottom: "5rem", left: "-2rem", borderRadius: "var(--r-lg)", padding: "var(--s3)", minWidth: "136px", boxShadow: "var(--sh-xl)" }}>
              <div className="font-m" style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--clr-accent)", lineHeight: 1 }}>
                <Counter target={15} suffix="+" />
              </div>
              <div className="t-sm" style={{ color: "rgba(255,255,255,0.70)", marginTop: "var(--s1)", lineHeight: 1.4 }}>Years of field<br />experience</div>
            </motion.div>

            {/* Badge top right */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.85 }}
              style={{ position: "absolute", top: "-1rem", right: "-1rem", background: "rgba(247,245,242,0.96)", border: "1px solid rgba(8,51,53,0.08)", borderRadius: "var(--r-lg)", padding: "var(--s2) var(--s3)", boxShadow: "var(--sh-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s1)" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} className="animate-pulse" />
                <span className="t-sm font-p" style={{ fontWeight: 600, color: "var(--clr-primary)" }}>500+ Projects Done</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
