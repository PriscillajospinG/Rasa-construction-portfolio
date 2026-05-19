"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, Layers, Blocks, ArrowUpDown, HardHat, Wrench } from "lucide-react";

const services = [
  {
    icon: LayoutGrid,
    title: "Scaffolding Rental",
    description:
      "Premium steel scaffolding systems — inspected, certified, and configured to your project's exact requirements. We handle setup, safety checks, and takedown.",
    tag: "Most Popular",
    large: true,
    image: "/images/project-scaffolding.png",
  },
  {
    icon: Layers,
    title: "Centring Materials",
    description:
      "Steel props, plates, and beams for slab formwork and beam construction. Properly maintained, well-stocked, ready when you need them.",
    tag: "100+ Varieties",
    large: false,
    image: null,
  },
  {
    icon: Blocks,
    title: "Concrete Works",
    description:
      "Skilled execution of column casting, slab work, and structural concrete. We bring precision to every pour.",
    tag: "Expert Crew",
    large: false,
    image: null,
  },
  {
    icon: ArrowUpDown,
    title: "Vertical Hoist Rental",
    description:
      "Industrial material hoists that cut vertical transport time dramatically. Daily and monthly rental options available.",
    tag: "Daily Rental",
    large: true,
    image: "/images/project-hoist.png",
  },
  {
    icon: HardHat,
    title: "Site Support",
    description:
      "On-call site supervision, safety guidance, and equipment coordination — so you can focus on building.",
    tag: "Full Coverage",
    large: false,
    image: null,
  },
  {
    icon: Wrench,
    title: "Equipment Upkeep",
    description:
      "All rented equipment is regularly serviced. Our technicians respond fast to keep your timeline intact.",
    tag: "24/7 Response",
    large: false,
    image: null,
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: "#F7F5F2" }}
    >
      {/* Curved top */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,70 960,70 1440,0 L1440,70 L0,70 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16" ref={ref}>
        {/* Header — left-aligned */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px" style={{ background: "#083335" }} />
              <span className="font-poppins text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#083335" }}>
                What We Offer
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-montserrat font-black leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "#083335",
                letterSpacing: "-0.02em",
              }}
            >
              Services built
              <br />
              for real{" "}
              <span style={{ color: "#D8B9A3", fontStyle: "italic" }}>field work.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-inter text-base leading-relaxed lg:text-right"
            style={{ color: "#6b7280" }}
          >
            From a single-floor scaffold to full multi-storey hoist setups,
            we cover the complete range of construction rental and support needs —
            with a team that's been doing this for over 15 years.
          </motion.p>
        </div>

        {/* Irregular service grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, description, tag, large, image }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className={`group relative rounded-2xl overflow-hidden ${
                large ? "md:col-span-1 lg:col-span-1" : ""
              }`}
              style={{
                background: "white",
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)",
                minHeight: large && image ? "340px" : "auto",
              }}
            >
              {/* If it has an image, use as bg */}
              {image && (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.6s ease",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,31,33,0.97) 40%, rgba(5,31,33,0.5) 100%)",
                    }}
                  />
                </>
              )}

              {/* Top hover accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, #083335, #D8B9A3)" }}
              />

              <div
                className="relative z-10 p-8"
                style={{
                  paddingBottom: large && image ? "2rem" : "2rem",
                  marginTop: large && image ? "auto" : undefined,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {large && image && <div style={{ flex: 1 }} />}

                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: image
                      ? "rgba(216,185,163,0.15)"
                      : "linear-gradient(135deg, #083335, #0d4d50)",
                    border: image ? "1px solid rgba(216,185,163,0.2)" : "none",
                  }}
                >
                  <Icon size={20} color={image ? "#D8B9A3" : "#D8B9A3"} />
                </div>

                <h3
                  className="font-montserrat font-bold text-xl mb-3"
                  style={{ color: image ? "white" : "#111827" }}
                >
                  {title}
                </h3>

                <p
                  className="font-inter text-sm leading-relaxed mb-5"
                  style={{ color: image ? "rgba(255,255,255,0.65)" : "#6b7280" }}
                >
                  {description}
                </p>

                <span
                  className="self-start text-xs font-poppins font-semibold px-3 py-1 rounded-full"
                  style={
                    image
                      ? {
                          background: "rgba(216,185,163,0.15)",
                          border: "1px solid rgba(216,185,163,0.25)",
                          color: "#D8B9A3",
                        }
                      : {
                          background: "rgba(8,51,53,0.07)",
                          color: "#083335",
                        }
                  }
                >
                  ✓ {tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA — casual, not corporate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div>
            <p className="font-poppins font-semibold text-base" style={{ color: "#083335" }}>
              Not sure what you need?
            </p>
            <p className="font-inter text-sm" style={{ color: "#9ca3af" }}>
              Call Gurusamy sir — he'll tell you exactly what the project requires.
            </p>
          </div>
          <a
            href="tel:+919842766379"
            className="btn-primary flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #083335, #0d4d50)" }}
          >
            📞 Call for Advice
          </a>
        </motion.div>
      </div>
    </section>
  );
}
