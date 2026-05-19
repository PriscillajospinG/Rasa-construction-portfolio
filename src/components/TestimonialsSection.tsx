"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Murugan K.",
    role: "Civil Contractor, Tirunelveli",
    rating: 5,
    text: "Rasa Construction has been our go-to for scaffolding rental for the past 5 years. The equipment is always in excellent condition and delivery is never late. Gurusamy sir personally ensures every project gets the right setup.",
    initials: "MK",
    color: "#083335",
  },
  {
    name: "Senthilkumar R.",
    role: "Builder, Tamil Nadu",
    rating: 5,
    text: "We used their vertical hoist for a 6-storey residential project and it saved us tremendous labour time. The team was professional, the equipment was powerful, and the pricing was very fair. Highly recommended!",
    initials: "SR",
    color: "#0d4d50",
  },
  {
    name: "Arumugam P.",
    role: "Site Engineer, Kanyakumari",
    rating: 5,
    text: "The centring materials from Rasa Construction are top quality. Proper maintenance, good quantity availability, and their team helped us plan the setup efficiently. Our slab casting was flawless.",
    initials: "AP",
    color: "#083335",
  },
  {
    name: "Vijayakumar T.",
    role: "Real Estate Developer",
    rating: 5,
    text: "I've worked with many rental services but Rasa stands apart. Their safety standards are commendable. They don't cut corners. When you're sending workers to heights, you want equipment you can trust.",
    initials: "VT",
    color: "#0a3d40",
  },
  {
    name: "Priya S.",
    role: "Architect & Project Manager",
    rating: 5,
    text: "Coordinating with Rasa Construction is always smooth. They understand project timelines and adapt quickly. The concrete works team delivered exactly what was specified in the drawings. Exceptional quality.",
    initials: "PS",
    color: "#0d4d50",
  },
  {
    name: "Rajasekar M.",
    role: "Building Contractor, Tenkasi",
    rating: 5,
    text: "Three projects, three perfect experiences. Rasa is reliable, affordable, and truly safety-conscious. Owner is personally involved and ensures client satisfaction. I won't go anywhere else.",
    initials: "RM",
    color: "#083335",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #051f21 0%, #083335 60%, #051f21 100%)" }}
    >
      {/* Decorative */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(216,185,163,1) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge mb-4 inline-flex"
          >
            Client Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Real words from real clients who've trusted us with their most important projects.
          </motion.p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, rating, text, initials, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass rounded-2xl p-7 hover-lift testimonial-card relative overflow-hidden"
            >
              {/* Quote Icon */}
              <Quote
                size={40}
                className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: "#D8B9A3" }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, si) => (
                  <Star key={si} size={14} fill="#D8B9A3" color="#D8B9A3" />
                ))}
              </div>

              {/* Text */}
              <p className="font-inter text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                &ldquo;{text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-montserrat font-bold text-white text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${color}, #D8B9A3)` }}
                >
                  {initials}
                </div>
                <div>
                  <div className="font-poppins font-semibold text-sm text-white">{name}</div>
                  <div className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="#D8B9A3" color="#D8B9A3" />
            ))}
          </div>
          <p className="font-poppins font-semibold text-white text-lg">4.9 / 5.0</p>
          <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Based on 300+ client reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}
