"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, PhoneCall, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const y = window.scrollY * 0.45;
        parallaxRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero.png"
          alt="Rasa Construction – Premium Scaffolding and Construction Services"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={75}
        />
      </div>

      {/* Multi-layer overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(5,31,33,0.85) 0%, rgba(8,51,53,0.6) 40%, rgba(5,31,33,0.95) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, #F7F5F2, transparent)" }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(216,185,163,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="badge">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Trusted Since 2010 • Tamil Nadu
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-montserrat text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6"
          style={{ letterSpacing: "-0.02em" }}
        >
          Building Strength.
          <br />
          <span className="gradient-text">Delivering Trust.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-inter text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Premium scaffolding rental, centring materials, concrete works &amp; vertical hoist services —
          built on reliability, safety, and years of proven expertise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary text-base px-8 py-4"
          >
            Get a Free Quote
          </a>
          <a
            href="tel:+919842766379"
            className="btn-outline text-base px-8 py-4 flex items-center gap-2"
          >
            <PhoneCall size={18} />
            Call Now
          </a>
          <a
            href="https://wa.me/919842766379?text=Hello%20Rasa%20Construction%2C%20I'm%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-poppins font-semibold text-sm transition-all duration-300 hover:opacity-80"
            style={{ color: "#25D366" }}
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Projects Done" },
            { value: "100+", label: "Equipment Units" },
            { value: "300+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-montserrat font-black text-3xl md:text-4xl"
                style={{ color: "#D8B9A3" }}
              >
                {stat.value}
              </div>
              <div
                className="font-inter text-xs mt-1 tracking-wider uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ color: "rgba(255,255,255,0.5)" }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-poppins">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
