"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden grain">
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero.png"
          alt="Rasa Construction – premium scaffolding and construction at golden hour"
          fill priority sizes="100vw" quality={75}
          className="object-cover object-center"
        />
      </div>

      {/* Cinematic overlays — left-heavy, editorial */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(108deg, rgba(5,31,33,0.96) 0%, rgba(5,31,33,0.72) 42%, rgba(5,31,33,0.20) 100%)",
        }}
      />
      {/* Bottom page-bleed */}
      <div
        className="absolute bottom-0 left-0 right-0 h-52"
        style={{ background: "linear-gradient(to top, #F7F5F2 0%, transparent 100%)" }}
      />

      {/* Architectural grid — left half only */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2/3 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(216,185,163,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to right, black 30%, transparent 100%)",
        }}
      />

      {/* ─── Content block ─── */}
      <div className="container relative z-10 pb-32 pt-44">
        <div style={{ maxWidth: "680px" }}>

          {/* Editorial section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rule-line label-editorial mb-8"
            style={{ color: "#D8B9A3" }}
          >
            Est. 2010 · Achankuttam, Tamil Nadu
          </motion.div>

          {/* Brutalist headline */}
          <motion.h1
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="heading-brutalist text-white mb-8"
            style={{ fontSize: "var(--text-hero)", lineHeight: "0.96" }}
          >
            Building
            <br />
            Strength.
            <br />
            <em className="gradient-text not-italic">Delivering</em>
            <br />
            <em className="gradient-text not-italic">Trust.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="font-inter mb-10"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.62)",
              maxWidth: "480px",
            }}
          >
            Scaffolding rental, centring materials, concrete works &amp;
            vertical hoist services — backed by 15 years of field expertise across Tamil Nadu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn btn-primary"
            >
              Get a Free Quote
            </a>
            <a href="tel:+919842766379" className="btn btn-ghost flex items-center gap-2">
              <PhoneCall size={16} />
              +91 98427 66379
            </a>
          </motion.div>
        </div>

        {/* Stat strip — bottom of hero, horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-20 flex gap-12 items-end flex-wrap"
        >
          {[
            { n: "15+",  l: "Years" },
            { n: "500+", l: "Projects" },
            { n: "100+", l: "Equipment" },
            { n: "300+", l: "Clients" },
          ].map(({ n, l }) => (
            <div key={l}>
              <div
                className="font-montserrat"
                style={{ fontSize: "2.2rem", fontWeight: 900, color: "#D8B9A3", lineHeight: 1 }}
              >
                {n}
              </div>
              <div className="label-editorial mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — right edge */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-label="Scroll"
        className="absolute bottom-10 right-8 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.30)" }}
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
