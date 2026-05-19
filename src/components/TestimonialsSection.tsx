"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Murugan K.",      role: "Civil Contractor, Tirunelveli", rating: 5, text: "Rasa Construction has been our go-to for scaffolding for 5 years. Equipment always in excellent condition, delivery never late. Gurusamy sir personally ensures every project gets the right setup.", init: "MK" },
  { name: "Senthilkumar R.", role: "Builder, Tamil Nadu",          rating: 5, text: "Used their vertical hoist for a 6-storey residential project — saved us tremendous labour time. Professional team, powerful equipment, very fair pricing. Highly recommended!", init: "SR" },
  { name: "Arumugam P.",     role: "Site Engineer, Kanyakumari",   rating: 5, text: "Top quality centring materials. Proper maintenance, good availability, and their team helped us plan the setup efficiently. Our slab casting was absolutely flawless.", init: "AP" },
  { name: "Vijayakumar T.",  role: "Real Estate Developer",        rating: 5, text: "I've worked with many rental services but Rasa stands apart. Safety standards are commendable — no cutting corners. When workers are at height, you want equipment you can trust.", init: "VT" },
  { name: "Priya S.",        role: "Architect & Project Manager",  rating: 5, text: "Coordinating with Rasa is always smooth. They understand timelines and adapt quickly. The concrete works team delivered exactly what was specified. Exceptional quality.", init: "PS" },
  { name: "Rajasekar M.",    role: "Building Contractor, Tenkasi", rating: 5, text: "Three projects, three perfect experiences. Reliable, affordable, safety-conscious. Owner is personally involved and ensures satisfaction. Won't go anywhere else.", init: "RM" },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="relative overflow-hidden grain"
      style={{ background: "linear-gradient(160deg, var(--clr-primary-dark) 0%, var(--clr-primary) 60%, var(--clr-primary-dark) 100%)" }}>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(216,185,163,0.05) 0%, transparent 60%)" }} />

      <div className="c s" ref={ref}>

        {/* Header */}
        <div style={{ marginBottom: "var(--s12)" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="eyebrow t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s3)" }}>
            Client Testimonials
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
            className="t-h1 text-white">
            What our clients say
          </motion.h2>
        </div>

        {/* 3-col equal grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s3)" }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, rating, text, init }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group card-dark relative overflow-hidden"
              style={{ padding: "var(--s4)", borderLeft: "2px solid rgba(216,185,163,0.25)" }}>

              {/* Quote mark */}
              <Quote size={36} className="absolute" style={{ top: "var(--s3)", right: "var(--s3)", color: "rgba(216,185,163,0.08)" }} />

              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "var(--s3)" }}>
                {Array.from({ length: rating }).map((_, si) => (
                  <Star key={si} size={13} fill="var(--clr-accent)" color="var(--clr-accent)" />
                ))}
              </div>

              <p className="t-sm" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.78, marginBottom: "var(--s4)" }}>
                &ldquo;{text}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, var(--clr-primary-mid), var(--clr-accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "white",
                }}>{init}</div>
                <div>
                  <div className="font-p text-white" style={{ fontWeight: 600, fontSize: "var(--t-sm)" }}>{name}</div>
                  <div className="t-sm" style={{ color: "rgba(255,255,255,0.42)", marginTop: "1px" }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.65 }}
          style={{ marginTop: "var(--s12)", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "var(--s1)" }}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="var(--clr-accent)" color="var(--clr-accent)" />)}
          </div>
          <p className="font-p text-white" style={{ fontWeight: 700, fontSize: "var(--t-h2)" }}>4.9 / 5.0</p>
          <p className="t-sm" style={{ color: "rgba(255,255,255,0.40)", marginTop: "var(--s1)" }}>Based on 300+ client reviews</p>
        </motion.div>
      </div>
    </section>
  );
}
