"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LayoutGrid,
  Layers,
  Blocks,
  ArrowUpDown,
  HardHat,
  Wrench,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: LayoutGrid,
    title: "Scaffolding Rental",
    description:
      "Premium steel scaffolding systems for safe, efficient construction at heights. Our scaffolding is regularly inspected and meets all safety codes. Available in various configurations for any project type.",
    highlight: "Certified Safe Equipment",
  },
  {
    icon: Layers,
    title: "Centring Materials",
    description:
      "High-quality centring materials for slab formwork and beam construction. We supply properly maintained steel plates, props, and beams that ensure perfect concrete casting results.",
    highlight: "100+ Equipment Varieties",
  },
  {
    icon: Blocks,
    title: "Concrete Works",
    description:
      "Professional concrete pouring, finishing, and structural work. Our experienced team handles everything from column casting to slab construction with precision and quality.",
    highlight: "Expert Execution",
  },
  {
    icon: ArrowUpDown,
    title: "Vertical Hoist Rental",
    description:
      "Industrial vertical material hoists for efficient vertical transport on construction sites. Save time and labour costs with our modern, well-maintained hoist equipment.",
    highlight: "Daily & Monthly Rental",
  },
  {
    icon: HardHat,
    title: "Site Support Services",
    description:
      "Comprehensive on-site support including equipment setup, safety supervision, and technical guidance. Our team ensures smooth operations from project start to handover.",
    highlight: "Full-Site Coverage",
  },
  {
    icon: Wrench,
    title: "Equipment Maintenance",
    description:
      "Regular inspection and maintenance of all rented equipment ensures zero downtime. Our technicians are on call to resolve any issues, keeping your project timeline on track.",
    highlight: "24/7 Support",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      style={{ background: "#F7F5F2" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(8,51,53,0.04) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(216,185,163,0.08) 0%, transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge mb-4 inline-flex"
            style={{ background: "rgba(8,51,53,0.08)", borderColor: "rgba(8,51,53,0.2)", color: "#083335" }}
          >
            What We Offer
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-montserrat font-black text-4xl md:text-5xl mb-4"
            style={{ color: "#083335" }}
          >
            Our Core Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base max-w-2xl mx-auto"
            style={{ color: "#6b7280" }}
          >
            From scaffolding setup to concrete finishing, we provide end-to-end construction support
            services with a focus on safety, quality, and timely delivery.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="section-divider section-divider-center mt-4"
          />
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, highlight }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl p-8 overflow-hidden card-hover cursor-pointer"
              style={{
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Hover glow background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(8,51,53,0.04), rgba(216,185,163,0.06))",
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: "linear-gradient(90deg, #083335, #D8B9A3)" }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, #083335, #0d4d50)" }}
              >
                <Icon size={24} color="#D8B9A3" />
              </div>

              {/* Content */}
              <h3
                className="font-montserrat font-bold text-xl mb-3 group-hover:text-[#083335] transition-colors duration-300"
                style={{ color: "#111827" }}
              >
                {title}
              </h3>

              <p className="font-inter text-sm leading-relaxed mb-6" style={{ color: "#6b7280" }}>
                {description}
              </p>

              {/* Highlight badge */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-poppins font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(8,51,53,0.07)", color: "#083335" }}
                >
                  ✓ {highlight}
                </span>
                <ArrowRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  style={{ color: "#D8B9A3" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary text-base px-10 py-4"
            style={{ background: "linear-gradient(135deg, #083335, #0d4d50)" }}
          >
            Request a Service Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
