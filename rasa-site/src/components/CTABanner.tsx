"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = rect.top * 0.25;
      parallaxRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[480px] overflow-hidden flex items-center" ref={ref}>
      {/* Parallax background */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/project-hoist.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,31,33,0.92) 0%, rgba(8,51,53,0.8) 50%, rgba(5,31,33,0.92) 100%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(216,185,163,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.6) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="badge mb-5 inline-flex">Ready to Start?</div>

          <h2
            className="font-montserrat font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            Your Next Project Starts
            <br />
            <span className="gradient-text">With One Call</span>
          </h2>

          <p
            className="font-inter text-base md:text-lg max-w-xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Get expert scaffolding, centring materials, and hoist solutions delivered to your site.
            Fast response. Fair pricing. Zero compromise on safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919842766379"
              className="btn-primary text-base px-8 py-4 gap-3"
            >
              <Phone size={18} />
              +91 98427 66379
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline text-base px-8 py-4 gap-2"
            >
              Get Free Quote <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
