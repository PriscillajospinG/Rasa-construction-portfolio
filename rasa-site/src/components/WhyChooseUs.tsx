"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Clock,
  ShieldCheck,
  IndianRupee,
  Truck,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Trusted Team",
    description: "Experienced workers with years of hands-on construction expertise and professional training.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect your deadlines. Equipment delivered and set up on time, every time — guaranteed.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Standards",
    description: "All equipment and operations meet IS safety standards. Your team's safety is our top priority.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Competitive, transparent pricing with flexible rental terms. No hidden charges, ever.",
  },
  {
    icon: Truck,
    title: "Strong Equipment",
    description: "Modern, well-maintained scaffolding, centring, and hoist equipment ready for any project scale.",
  },
  {
    icon: Star,
    title: "Proven Excellence",
    description: "500+ completed projects and 300+ satisfied clients speak to our quality and reliability.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #051f21 0%, #083335 50%, #0a3d40 100%)" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #D8B9A3, transparent)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #D8B9A3, transparent)",
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(216,185,163,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.6) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge mb-4 inline-flex"
          >
            Why Choose Rasa
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4"
          >
            Built on Trust,{" "}
            <span className="gradient-text">Driven by Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            When you choose Rasa Construction, you choose reliability, safety, and a partner
            who genuinely cares about the success of your project.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass rounded-2xl p-8 hover-lift hover-glow cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(216,185,163,0.15)", border: "1px solid rgba(216,185,163,0.25)" }}
              >
                <Icon size={22} style={{ color: "#D8B9A3" }} />
              </div>

              <h3
                className="font-montserrat font-bold text-lg text-white mb-3"
              >
                {title}
              </h3>

              <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {description}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(90deg, #D8B9A3, transparent)" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-4 rounded-2xl px-8 py-4"
            style={{
              background: "rgba(216,185,163,0.08)",
              border: "1px solid rgba(216,185,163,0.2)",
            }}
          >
            <ShieldCheck size={24} style={{ color: "#D8B9A3" }} />
            <div className="text-left">
              <div className="font-poppins font-semibold text-white text-sm">ISO Compliant &amp; Safety Certified</div>
              <div className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                All operations follow Bureau of Indian Standards (BIS) guidelines
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
