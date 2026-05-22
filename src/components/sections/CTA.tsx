"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Parallax from "@/components/animations/Parallax";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

export default function CTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: "480px", display: "flex", alignItems: "center" }}>
      <Parallax speed={0.22} className="absolute inset-0 scale-110">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/backgrounds/cta-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      </Parallax>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,31,33,0.94) 0%, rgba(8,51,53,0.78) 50%, rgba(5,31,33,0.94) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(216,185,163,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="container relative z-10" style={{ textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="eyebrow t-label" style={{ color: "var(--clr-accent)", justifyContent: "center", marginBottom: "var(--s3)" }}>Ready to Start?</div>
          <h2 className="t-h1 text-white" style={{ marginBottom: "var(--s3)", maxWidth: "560px", marginInline: "auto" }}>
            Your next project starts<br /><span className="gradient-text">with one call.</span>
          </h2>
          <p className="t-body" style={{ color: "rgba(255,255,255,0.58)", maxWidth: "480px", marginInline: "auto", marginBottom: "var(--s6)" }}>
            Expert scaffolding, centring, and hoist solutions delivered to your site. Fast response. Fair pricing. Zero compromise on safety.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)", justifyContent: "center" }}>
            <Button href={`tel:${company.contact.primary.replace(/\s/g,"")}`} variant="primary">
              <Phone size={16} /> {company.contact.primary}
            </Button>
            <Button href="#contact" variant="ghost" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
              Get Free Quote <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
