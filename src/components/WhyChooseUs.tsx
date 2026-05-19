"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Clock, ShieldCheck, IndianRupee, Truck, Star } from "lucide-react";

const features = [
  { icon: Users,        title: "Trusted Team",      desc: "Experienced workers with years of hands-on construction expertise and professional safety training." },
  { icon: Clock,        title: "Timely Delivery",   desc: "We respect your deadlines. Equipment is delivered and set up on time, every time — no excuses." },
  { icon: ShieldCheck,  title: "Safety Standards",  desc: "All equipment and operations meet IS safety codes. Your team's safety is our top priority, always." },
  { icon: IndianRupee,  title: "Affordable Pricing",desc: "Transparent pricing, flexible rental terms, competitive rates. No hidden charges, ever." },
  { icon: Truck,        title: "Strong Equipment",  desc: "Modern, well-maintained scaffolding, centring, and hoist systems ready for any project scale." },
  { icon: Star,         title: "Proven Excellence", desc: "500+ completed projects and 300+ satisfied clients speak to our consistent quality and reliability." },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden grain"
      style={{ background: "linear-gradient(160deg, var(--clr-primary-dark) 0%, var(--clr-primary) 55%, #0a3d40 100%)" }}>
      {/* Radial glow — subtle, not neon */}
      <div className="absolute pointer-events-none" style={{
        top: 0, right: 0, width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(216,185,163,0.07) 0%, transparent 70%)",
        transform: "translate(30%, -30%)",
      }} />

      <div className="c s" ref={ref}>

        {/* Header */}
        <div style={{ marginBottom: "var(--s12)" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="eyebrow t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s3)" }}>
            Why Choose Rasa
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
            className="t-h1 text-white" style={{ maxWidth: "560px" }}>
            Built on Trust,{" "}<span className="gradient-text">Driven by Excellence</span>
          </motion.h2>
        </div>

        {/* Feature grid — 3 cols, equal cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s3)" }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group card-dark" style={{ padding: "var(--s4)" }}>

              <div style={{
                width: "44px", height: "44px", borderRadius: "var(--r-md)",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(216,185,163,0.10)",
                border: "1px solid rgba(216,185,163,0.18)",
                marginBottom: "var(--s3)",
                transition: "transform 300ms var(--ease)",
              }} className="group-hover:scale-110">
                <Icon size={20} color="var(--clr-accent)" />
              </div>

              <h3 className="t-h2 text-white" style={{ marginBottom: "var(--s2)" }}>{title}</h3>
              <p className="t-sm" style={{ color: "rgba(255,255,255,0.56)", lineHeight: 1.75 }}>{desc}</p>

              {/* Bottom reveal line on hover */}
              <div className="transition-all duration-500 group-hover:opacity-100 opacity-0"
                style={{ marginTop: "var(--s3)", height: "1px", background: "linear-gradient(90deg, var(--clr-accent), transparent)" }} />
            </motion.div>
          ))}
        </div>

        {/* Trust badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.65 }}
          style={{ marginTop: "var(--s12)", display: "flex", justifyContent: "center" }}>
          <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "var(--s3)", borderRadius: "var(--r-lg)", padding: "var(--s3) var(--s6)" }}>
            <ShieldCheck size={22} color="var(--clr-accent)" />
            <div>
              <div className="font-p text-white" style={{ fontWeight: 600, fontSize: "var(--t-sm)" }}>ISO Compliant &amp; Safety Certified</div>
              <div className="t-sm" style={{ color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>All operations follow Bureau of Indian Standards (BIS) guidelines</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
