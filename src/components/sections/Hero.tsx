"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";
import BlueprintBg from "@/components/ui/BlueprintBg";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared transition factory */
const t = (delay: number, duration = 0.9) => ({
  duration,
  delay,
  ease: EASE,
});

export default function Hero() {
  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo("#contact");
  };

  return (
    <section id="home" className="hero-section">
      {/* ── Background image — slow cinematic reveal ── */}
      <motion.div
        className="hero-bg-layer"
        aria-hidden="true"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0 }}
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg-img"
        />
      </motion.div>

      {/* Blueprint grid accent */}
      <BlueprintBg variant="dark" opacity={0.06} />

      {/* Crane silhouette */}
      <motion.div
        className="hero-crane-graphic"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={t(0.4, 1.2)}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crane tower (vertical truss structure) */}
          <line x1="180" y1="100" x2="180" y2="700" stroke="#D8B9A3" strokeWidth="2" />
          <line x1="220" y1="100" x2="220" y2="700" stroke="#D8B9A3" strokeWidth="2" />
          {/* Diagonal bracing for vertical truss */}
          <path d="M180,100 L220,140 M180,180 L220,140 M180,180 L220,220 M180,260 L220,220 M180,260 L220,300 M180,340 L220,300 M180,340 L220,380 M180,420 L220,380 M180,420 L220,460 M180,500 L220,460 M180,500 L220,540 M180,580 L220,540 M180,580 L220,620 M180,660 L220,620 M180,660 L220,700" stroke="#D8B9A3" strokeWidth="1" strokeDasharray="2,2" />
          <path d="M220,100 L180,140 M220,180 L180,140 M220,180 L180,220 M220,260 L180,220 M220,260 L180,300 M220,340 L180,300 M220,340 L180,380 M220,420 L180,380 M220,420 L180,460 M220,500 L180,460 M220,500 L180,540 M220,580 L180,540 M220,580 L180,620 M220,660 L180,620 M220,660 L180,700" stroke="#D8B9A3" strokeWidth="1" strokeDasharray="2,2" />
          {/* Horizontal boom (jib) */}
          <line x1="20" y1="100" x2="380" y2="100" stroke="#D8B9A3" strokeWidth="2" />
          <line x1="20" y1="80" x2="380" y2="100" stroke="#D8B9A3" strokeWidth="1" />
          {/* Bracing for horizontal jib */}
          <path d="M20,100 L40,81 M60,100 L40,81 M60,100 L80,83 M100,100 L80,83 M100,100 L120,86 M140,100 L120,86 M140,100 L160,88 M180,100 L160,88" stroke="#D8B9A3" strokeWidth="1" />
          <path d="M220,100 L240,91 M260,100 L240,91 M260,100 L280,93 M300,100 L280,93 M300,100 L320,95 M340,100 L320,95 M340,100 L360,97 M380,100 L360,97" stroke="#D8B9A3" strokeWidth="1" />
          {/* Cab and top tower */}
          <path d="M180,100 L200,40 L220,100 Z" fill="#D8B9A3" opacity="0.3" stroke="#D8B9A3" strokeWidth="1.5" />
          <rect x="202" y="80" width="15" height="15" fill="#D8B9A3" opacity="0.5" />
          {/* Counter weight and hoist hook */}
          <rect x="40" y="100" width="30" height="15" fill="#D8B9A3" opacity="0.7" />
          <line x1="320" y1="100" x2="320" y2="280" stroke="#D8B9A3" strokeWidth="1" strokeDasharray="3,3" />
          <rect x="315" y="280" width="10" height="10" fill="#D8B9A3" />
          <path d="M320,290 C320,295 315,298 312,298 C309,298 310,293 315,293" stroke="#D8B9A3" strokeWidth="1.5" fill="none" />
        </svg>
      </motion.div>

      {/* ── Overlay — fades in after image ── */}
      <motion.div
        className="hero-overlay-layer"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={t(0.15, 0.8)}
      />

      {/* ── Hero copy — staggered entrance ── */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-copy" style={{ maxWidth: "720px", paddingBottom: "24px" }}>

            {/* 1. Eyebrow — slides down */}
            <motion.p
              className="hero-eyebrow"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.2, 0.75)}
            >
              Trusted Site Support Since 2000
            </motion.p>

            {/* 2. Title — rises with blur clear */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={t(0.45, 1.0)}
            >
              <span className="hero-highlight">Reliable construction support</span>{" "}
              for real site work.
            </motion.h1>

            {/* 3. Description — fades up */}
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.75, 0.9)}
            >
              Scaffolding rental, centring materials, concrete works, vertical hoist rental, and site support handled with safety, timing, and direct owner involvement.
            </motion.p>

            {/* 4. Buttons — sequential reveal */}
            <div className="hero-actions">
              <motion.a
                href="#contact"
                onClick={handleQuoteClick}
                className="btn-primary"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={t(1.0, 0.7)}
                whileHover={{ translateY: -2, transition: { duration: 0.2 } }}
              >
                Request a Quote
              </motion.a>
              <motion.a
                href={`tel:${company.contact.primary.replace(/\s/g, "")}`}
                className="btn-secondary"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={t(1.15, 0.7)}
                whileHover={{ translateY: -2, transition: { duration: 0.2 } }}
              >
                Call for Advice
              </motion.a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
