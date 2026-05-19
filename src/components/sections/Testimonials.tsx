"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Container from "@/components/layout/Container";
import { testimonials } from "@/data/testimonials";
import { stagger } from "@/lib/animations";

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="var(--clr-accent)" color="var(--clr-accent)" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="relative overflow-hidden grain"
      style={{ background: "linear-gradient(160deg, var(--clr-primary-dark) 0%, var(--clr-primary) 60%, var(--clr-primary-dark) 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(216,185,163,0.06) 0%, transparent 60%)" }} />

      <Container section>
        <Reveal style={{ marginBottom: "var(--s12)" }}>
          <SectionTitle eyebrow="Client Testimonials" heading="What our clients say" theme="dark" />
        </Reveal>

        <motion.div ref={ref} variants={stagger()} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s3)" }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ id, name, role, rating, text, initials }) => (
            <motion.div key={id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              className="group card-dark relative overflow-hidden"
              style={{ padding: "var(--s4)", borderLeft: "2px solid rgba(216,185,163,0.22)" }}>
              <Quote size={36} className="absolute" style={{ top: "var(--s3)", right: "var(--s3)", color: "rgba(216,185,163,0.08)" }} />
              <div style={{ marginBottom: "var(--s3)" }}><Stars count={rating} /></div>
              <p className="t-sm" style={{ color: "rgba(255,255,255,0.70)", lineHeight: 1.78, marginBottom: "var(--s4)" }}>&ldquo;{text}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, var(--clr-primary-mid), var(--clr-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "white" }}>{initials}</div>
                <div>
                  <div className="font-p text-white" style={{ fontWeight: 600, fontSize: "var(--t-sm)" }}>{name}</div>
                  <div className="t-sm" style={{ color: "rgba(255,255,255,0.40)", marginTop: "1px" }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <div style={{ marginTop: "var(--s12)", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "var(--s1)" }}>
              <Stars count={5} />
            </div>
            <p className="font-p text-white" style={{ fontWeight: 700, fontSize: "var(--t-h2)" }}>4.9 / 5.0</p>
            <p className="t-sm" style={{ color: "rgba(255,255,255,0.38)", marginTop: "var(--s1)" }}>Based on 300+ client reviews</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
