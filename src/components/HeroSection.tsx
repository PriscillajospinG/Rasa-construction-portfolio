"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero.png"
          alt="Rasa Construction – scaffolding and construction site at golden hour"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
        />
      </div>

      {/* Layered overlays — asymmetric, heavier on the left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,31,33,0.95) 0%, rgba(5,31,33,0.75) 45%, rgba(5,31,33,0.25) 100%)",
        }}
      />
      {/* Bottom fade to page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, #F7F5F2, transparent)" }}
      />

      {/* Subtle architectural grid — only left side */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/2 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(216,185,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content — left-aligned, not centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-28 pt-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="w-8 h-px" style={{ background: "#D8B9A3" }} />
            <span
              className="font-poppins text-xs tracking-[0.2em] uppercase"
              style={{ color: "#D8B9A3" }}
            >
              Est. 2010 · Achankuttam, Tamil Nadu
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-white leading-[1.0] mb-8"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
            }}
          >
            Building
            <br />
            Strength.
            <br />
            <span className="gradient-text">Delivering</span>
            <br />
            <span className="gradient-text">Trust.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="font-inter text-lg leading-relaxed mb-10 max-w-lg"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Scaffolding rental, centring materials, concrete works &amp;
            vertical hoist services — built on 15 years of field expertise
            across Tamil Nadu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary text-base px-8 py-4"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:+919842766379"
              className="btn-outline text-base px-8 py-4 flex items-center gap-2"
            >
              <PhoneCall size={17} />
              +91 98427 66379
            </a>
          </motion.div>
        </div>

        {/* Stats — horizontally placed, naturally spaced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-20 flex gap-10 md:gap-16"
        >
          {[
            { value: "15+", label: "Years" },
            { value: "500+", label: "Projects" },
            { value: "100+", label: "Equipment" },
            { value: "300+", label: "Clients" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="font-montserrat font-black text-3xl md:text-4xl"
                style={{ color: "#D8B9A3" }}
              >
                {s.value}
              </div>
              <div
                className="font-poppins text-[11px] uppercase tracking-wider mt-1"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.35)" }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
