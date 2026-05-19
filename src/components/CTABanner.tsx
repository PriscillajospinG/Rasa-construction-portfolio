"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const fn = () => {
      if (!bgRef.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      bgRef.current.style.transform = `translateY(${rect.top * 0.22}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: "480px", display: "flex", alignItems: "center" }}>
      {/* Parallax bg */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/project-hoist.png')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,31,33,0.94) 0%, rgba(8,51,53,0.78) 50%, rgba(5,31,33,0.94) 100%)" }} />

      {/* Architectural grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(216,185,163,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      <div className="c relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="eyebrow t-label" style={{ color: "var(--clr-accent)", justifyContent: "center", marginBottom: "var(--s3)" }}>
            Ready to Start?
          </div>
          <h2 className="t-h1 text-white" style={{ marginBottom: "var(--s3)", maxWidth: "600px", marginInline: "auto" }}>
            Your next project starts<br /><span className="gradient-text">with one call.</span>
          </h2>
          <p className="t-body" style={{ color: "rgba(255,255,255,0.60)", maxWidth: "480px", marginInline: "auto", marginBottom: "var(--s6)" }}>
            Expert scaffolding, centring, and hoist solutions delivered to your site. Fast response. Fair pricing. Zero compromise on safety.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)", justifyContent: "center" }}>
            <a href="tel:+919842766379" className="btn btn-primary" style={{ gap: "var(--s1)" }}>
              <Phone size={16} /> +91 98427 66379
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn btn-ghost" style={{ gap: "var(--s1)" }}>
              Get Free Quote <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
