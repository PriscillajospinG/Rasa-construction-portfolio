"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, motionVal, target]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const highlights = [
  "Reliable scaffolding & centring material supply across projects of all sizes",
  "Safety-first operations — every scaffold is load-tested before use",
  "Experienced workers with deep regional construction knowledge",
  "Competitive daily & monthly rental rates with no hidden charges",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: "white" }}>
      {/* Curved top divider from hero */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ lineHeight: 0 }}
      >
        <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C480,0 960,0 1440,60 L1440,0 L0,0 Z" fill="#F7F5F2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20" ref={ref}>

        {/* Section label — off to the side, not centered */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="w-12 h-px" style={{ background: "#083335" }} />
          <span
            className="font-poppins text-xs tracking-[0.2em] uppercase font-semibold"
            style={{ color: "#083335" }}
          >
            Our Story
          </span>
        </motion.div>

        {/* Asymmetric two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-montserrat font-black leading-[1.05] mb-8"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                color: "#083335",
                letterSpacing: "-0.02em",
              }}
            >
              A construction partner
              <br />
              <span
                style={{
                  color: "#c4a088",
                  fontStyle: "italic",
                  fontWeight: 800,
                }}
              >
                you can count on.
              </span>
            </h2>

            <p className="font-inter text-base leading-[1.8] mb-5" style={{ color: "#4a5568" }}>
              Founded and led by <strong style={{ color: "#083335" }}>Gurusamy A</strong>, Rasa Construction
              has been the trusted name for scaffolding, centring materials, and hoist rental across Tamil Nadu
              for over 15 years. Based at Rasa Office, Achankuttam, we bring local expertise and genuine
              care to every project we touch.
            </p>

            <p className="font-inter text-base leading-[1.8] mb-10" style={{ color: "#6b7280" }}>
              We don't just rent equipment — we partner with builders, contractors, and developers to ensure
              each structure rises safely and on schedule. Every scaffold we set up, every hoist we install,
              reflects our commitment to quality craftsmanship.
            </p>

            {/* Highlights — natural list */}
            <ul className="space-y-4 mb-12">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#083335" }}
                  />
                  <span className="font-inter text-sm leading-relaxed" style={{ color: "#374151" }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary inline-flex"
              style={{ background: "linear-gradient(135deg, #083335, #0d4d50)" }}
            >
              Talk to Gurusamy sir →
            </a>
          </motion.div>

          {/* Right column — overlapping image composition */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main large image */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "3/4",
                boxShadow: "24px 32px 80px rgba(8,51,53,0.18)",
              }}
            >
              <Image
                src="/images/about-team.png"
                alt="Rasa Construction team at work on a building site"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,51,53,0.5) 0%, transparent 55%)",
                }}
              />
              {/* Image caption overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-poppins text-xs uppercase tracking-widest mb-1" style={{ color: "#D8B9A3" }}>
                  On the ground
                </p>
                <p className="font-montserrat font-bold text-white text-lg leading-tight">
                  Planning with precision,<br />building with purpose.
                </p>
              </div>
            </div>

            {/* Floating stats — offset to the left, overlapping */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
              className="absolute -left-8 bottom-16 rounded-xl p-5 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #083335, #0d4d50)",
                border: "1px solid rgba(216,185,163,0.15)",
                minWidth: "140px",
              }}
            >
              <div
                className="font-montserrat font-black text-4xl"
                style={{ color: "#D8B9A3" }}
              >
                <AnimatedCounter target={15} suffix="+" />
              </div>
              <div className="font-poppins text-xs text-white mt-1 leading-tight opacity-80">
                Years of field<br />experience
              </div>
            </motion.div>

            {/* Small secondary badge — top right */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 -right-4 rounded-xl px-4 py-3 shadow-xl"
              style={{
                background: "rgba(247,245,242,0.95)",
                border: "1px solid rgba(8,51,53,0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span
                  className="font-poppins text-xs font-semibold"
                  style={{ color: "#083335" }}
                >
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
