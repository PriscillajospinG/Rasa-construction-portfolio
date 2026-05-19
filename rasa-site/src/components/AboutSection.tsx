"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award, Shield, Users } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, motionVal, target]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { target: 15, suffix: "+", label: "Years Experience", icon: Award },
  { target: 500, suffix: "+", label: "Projects Completed", icon: CheckCircle2 },
  { target: 100, suffix: "+", label: "Equipment Units", icon: Shield },
  { target: 300, suffix: "+", label: "Happy Clients", icon: Users },
];

const highlights = [
  "Reliable scaffolding & centring material supply",
  "Safety-first operations on every site",
  "Experienced team with deep industry knowledge",
  "Trusted by builders across the region",
  "Competitive rental pricing with no hidden costs",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #083335 0px, #083335 1px, transparent 1px, transparent 20px)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/about-team.png"
                alt="Rasa Construction team reviewing building plans on site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay tint */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,51,53,0.4), transparent 60%)" }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 glass-dark rounded-2xl p-5 shadow-2xl"
            >
              <div className="font-montserrat font-black text-4xl" style={{ color: "#D8B9A3" }}>
                <AnimatedCounter target={15} suffix="+" />
              </div>
              <div className="text-white text-sm font-poppins mt-1">Years of Excellence</div>
            </motion.div>

            {/* Second badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -top-4 -left-4 glass-dark rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-xs font-poppins font-medium">ISO Compliant Safety</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <div className="badge mb-4" style={{ background: "rgba(8,51,53,0.08)", borderColor: "rgba(8,51,53,0.2)", color: "#083335" }}>
              About Rasa Construction
            </div>

            <h2
              className="font-montserrat font-black text-4xl md:text-5xl leading-tight mb-6"
              style={{ color: "#083335" }}
            >
              Your Trusted Partner in{" "}
              <span style={{ color: "#D8B9A3", WebkitTextStroke: "1px #c4a088" }}>
                Construction Excellence
              </span>
            </h2>

            <div className="section-divider mb-6" />

            <p className="font-inter text-base leading-relaxed mb-4" style={{ color: "#4a5568" }}>
              Founded and led by <strong style={{ color: "#083335" }}>Gurusamy A</strong>, Rasa Construction has
              been the go-to provider for scaffolding, centring materials, concrete works, and vertical hoist
              rental services across Tamil Nadu. Based in Achankuttam, we combine deep local expertise with
              modern equipment standards.
            </p>

            <p className="font-inter text-base leading-relaxed mb-8" style={{ color: "#4a5568" }}>
              We believe that every structure deserves a strong foundation — and every client deserves a reliable
              partner. Our safety-first approach and commitment to timely delivery have earned us the trust of
              hundreds of builders, contractors, and developers.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#083335" }} />
                  <span className="font-inter text-sm" style={{ color: "#374151" }}>{item}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-primary inline-flex"
              style={{ background: "linear-gradient(135deg, #083335, #0d4d50)" }}
            >
              Work With Us
            </a>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ target, suffix, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="stat-card rounded-2xl p-8 text-center hover-lift"
              style={{ background: "linear-gradient(135deg, #083335, #0d4d50)" }}
            >
              <Icon size={28} className="mx-auto mb-4" style={{ color: "#D8B9A3" }} />
              <div className="font-montserrat font-black text-4xl text-white mb-1">
                <AnimatedCounter target={target} suffix={suffix} />
              </div>
              <div className="font-poppins text-xs tracking-wide uppercase" style={{ color: "rgba(216,185,163,0.7)" }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
