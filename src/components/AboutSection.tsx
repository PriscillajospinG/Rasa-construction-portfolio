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
  "Experienced workers with deep knowledge of regional construction",
  "Competitive daily & monthly rental, zero hidden fees",
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: "white" }}
    >
      {/* Curved transition from hero */}
      <div style={{ lineHeight: 0, marginTop: "-2px" }}>
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,64 C360,0 1080,0 1440,64 L1440,0 L0,0 Z" fill="#F7F5F2" />
        </svg>
      </div>

      <div className="container py-20" ref={ref}>

        {/* ── Top editorial label row ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rule-line label-editorial mb-16"
          style={{ color: "#083335" }}
        >
          Our Story
        </motion.div>

        {/* ── Main content: asymmetric 5/7 grid ── */}
        <div
          className="grid items-start gap-16"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {/* Text column — 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ gridColumn: "1 / span 5" }}
            className="[grid-column:1/-1] lg:[grid-column:1/span_5]"
          >
            <h2
              className="heading-brutalist mb-8"
              style={{
                fontSize: "var(--text-5xl)",
                color: "var(--primary)",
              }}
            >
              A construction
              <br />
              partner you can
              <br />
              <em className="accent-italic">count on.</em>
            </h2>

            <p className="font-inter mb-5" style={{ fontSize: "var(--text-base)", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              Founded by <strong style={{ color: "var(--primary)" }}>Gurusamy A</strong>, Rasa Construction has been the trusted name for scaffolding, centring materials, concrete works, and hoist rental across Tamil Nadu for over 15 years. Based in Achankuttam, we bring genuine field experience to every project.
            </p>

            <p className="font-inter mb-10" style={{ fontSize: "var(--text-base)", lineHeight: 1.8, color: "var(--text-muted)" }}>
              We don't just supply equipment — we partner with builders to ensure every structure rises safely and on schedule. Our work is marked by reliability, safety, and the quiet pride of a team that knows the trade inside out.
            </p>

            <ul className="space-y-3 mb-12">
              {points.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={17} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                  <span className="font-inter" style={{ fontSize: "var(--text-sm)", lineHeight: 1.7, color: "var(--text-secondary)" }}>{pt}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn btn-dark"
            >
              Talk to Gurusamy sir →
            </a>
          </motion.div>

          {/* Image column — 7 cols, offset composition */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ gridColumn: "6 / -1" }}
            className="relative [grid-column:1/-1] lg:[grid-column:6/-1]"
          >
            {/* Main photo — portrait crop, realistic framing */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/5", boxShadow: "var(--shadow-xl)" }}
            >
              <Image
                src="/images/about-team.png"
                alt="Rasa Construction team reviewing blueprints on site"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              {/* Cinematic gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(5,31,33,0.65) 0%, transparent 55%)" }}
              />
              {/* Caption inside photo */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="label-editorial mb-1" style={{ color: "#D8B9A3" }}>On the ground</div>
                <div
                  className="font-montserrat font-bold text-white"
                  style={{ fontSize: "var(--text-xl)", lineHeight: 1.3 }}
                >
                  Planning with precision,<br />building with purpose.
                </div>
              </div>
            </div>

            {/* Floating stat chip — overlaps left edge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.5, type: "spring" }}
              className="absolute rounded-xl p-5 glass-dark shadow-2xl"
              style={{ bottom: "5rem", left: "-2rem", minWidth: "140px" }}
            >
              <div
                className="font-montserrat"
                style={{ fontSize: "2.4rem", fontWeight: 900, color: "#D8B9A3", lineHeight: 1 }}
              >
                <Counter target={15} suffix="+" />
              </div>
              <div className="font-poppins text-white mt-1" style={{ fontSize: "0.75rem", opacity: 0.75, lineHeight: 1.4 }}>
                Years of field<br />experience
              </div>
            </motion.div>

            {/* Small badge — top right */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.45 }}
              className="absolute rounded-xl px-4 py-3 shadow-lg"
              style={{
                top: "-1rem",
                right: "-1rem",
                background: "rgba(247,245,242,0.96)",
                border: "1px solid rgba(8,51,53,0.08)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span className="font-poppins text-xs font-semibold" style={{ color: "var(--primary)" }}>
                  500+ Projects Done
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
