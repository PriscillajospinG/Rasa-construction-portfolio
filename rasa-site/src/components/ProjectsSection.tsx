"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

const projects = [
  {
    image: "/images/hero.png",
    title: "High-Rise Scaffolding Setup",
    category: "Scaffolding",
    location: "Tirunelveli, TN",
    tall: true,
  },
  {
    image: "/images/project-concrete.png",
    title: "Residential Complex – Concrete Works",
    category: "Concrete Works",
    location: "Achankuttam, TN",
    tall: false,
  },
  {
    image: "/images/project-scaffolding.png",
    title: "Commercial Building Scaffolding",
    category: "Scaffolding",
    location: "Tamil Nadu",
    tall: false,
  },
  {
    image: "/images/project-hoist.png",
    title: "Vertical Hoist – Multistorey Project",
    category: "Hoist Rental",
    location: "Tirunelveli, TN",
    tall: true,
  },
  {
    image: "/images/about-team.png",
    title: "Site Support & Project Management",
    category: "Site Support",
    location: "Tamil Nadu",
    tall: false,
  },
];

const categories = ["All", "Scaffolding", "Concrete Works", "Hoist Rental", "Site Support"];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      style={{ background: "#F7F5F2" }}
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge mb-4 inline-flex"
            style={{ background: "rgba(8,51,53,0.08)", borderColor: "rgba(8,51,53,0.2)", color: "#083335" }}
          >
            Our Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-montserrat font-black text-4xl md:text-5xl mb-4"
            style={{ color: "#083335" }}
          >
            Projects That Speak
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base max-w-xl mx-auto mb-8"
            style={{ color: "#6b7280" }}
          >
            A glimpse of our finest work across Tamil Nadu — from scaffolding setups
            to complete concrete structures.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-2 rounded-full text-sm font-poppins font-medium transition-all duration-300"
                style={
                  activeFilter === cat
                    ? { background: "#083335", color: "white" }
                    : { background: "white", color: "#374151", border: "1px solid #e5e7eb" }
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`relative w-full ${project.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    background: "linear-gradient(to top, rgba(5,31,33,0.9) 0%, rgba(5,31,33,0.3) 50%, transparent 100%)",
                    opacity: hoveredIndex === i ? 1 : 0.6,
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div
                    className="transform transition-all duration-400"
                    style={{
                      transform: hoveredIndex === i ? "translateY(0)" : "translateY(10px)",
                      opacity: hoveredIndex === i ? 1 : 0.8,
                    }}
                  >
                    <span
                      className="inline-block text-xs font-poppins font-semibold px-2.5 py-1 rounded-full mb-2"
                      style={{ background: "rgba(216,185,163,0.2)", border: "1px solid rgba(216,185,163,0.3)", color: "#D8B9A3" }}
                    >
                      {project.category}
                    </span>
                    <h3 className="font-montserrat font-bold text-lg text-white leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                      📍 {project.location}
                    </p>
                  </div>
                </div>

                {/* Zoom icon */}
                <div
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(216,185,163,0.9)",
                    opacity: hoveredIndex === i ? 1 : 0,
                    transform: hoveredIndex === i ? "scale(1)" : "scale(0.6)",
                  }}
                >
                  <ZoomIn size={16} color="#051f21" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="font-inter text-sm mb-4" style={{ color: "#9ca3af" }}>
            Interested in our work quality?
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary"
            style={{ background: "linear-gradient(135deg, #083335, #0d4d50)" }}
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
