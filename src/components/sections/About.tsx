"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import SectionWatermark from "@/components/ui/SectionWatermark";

/* ── Data — newest first ─────────────────────────────────── */

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2026",
    title: "Ashok Leyland HB1215 Added",
    description:
      "Added Ashok Leyland HB1215 to improve transport capacity for scaffolding, centring materials, and site equipment.",
    tag: "Fleet",
    image: "/gallery/gallery-01.jpg",
    imageAlt: "Rasa Construction active church renovation site with hoist — 2026",
  },
  {
    year: "2025",
    title: "Site Support Capacity Strengthened",
    description:
      "Improved site support, material handling, and rental readiness for regular construction customers.",
    tag: "Expansion",
    image: "/gallery/gallery-09.jpg",
    imageAlt: "High-rise scaffolding on multi-storey building — 2025",
  },
  {
    year: "2024",
    title: "Tata Intra Added",
    description:
      "Added Tata Intra for faster local delivery and flexible site support.",
    tag: "Fleet",
    image: "/projects/tenkasi-residential.jpg",
    imageAlt: "Residential construction site supported by Rasa — 2024",
  },
  {
    year: "2023",
    title: "Jockey Span Sheet Supply Started",
    description:
      "Started supplying jockey span sheets in two sizes for slab and centring work.",
    tag: "Rental Service",
    image: "/gallery/gallery-10.jpg",
    imageAlt: "Full-facade residential scaffolding — 2023",
  },
  {
    year: "2020",
    title: "Scaffolding Business Expanded",
    description:
      "During the corona period, expanded into scaffolding rental and supply with cup lock pipes and multiple pipe sizes.",
    tag: "Scaffolding",
    image: "/gallery/gallery-06.jpg",
    imageAlt: "Multi-storey scaffolding with concrete mixer — 2020",
  },
  {
    year: "2015",
    title: "Fleet Support Expanded",
    description:
      "Added more vehicle support to serve more construction sites.",
    tag: "Fleet",
    image: "/equipment/scaffold-tubes.jpg",
    imageAlt: "Tower construction scaffolding structure — 2015",
  },
  {
    year: "2012",
    title: "Vertical Hoist Rental Started",
    description:
      "Started vertical hoist rental with H-frame support for multi-level construction work.",
    tag: "Hoist",
    image: "/equipment/vertical-hoist.jpg",
    imageAlt: "Vertical hoist rental on construction site — 2012",
  },
  {
    year: "2011",
    title: "Additional Vehicle Assembled",
    description:
      "Assembled and added another vehicle for site material movement.",
    tag: "Vehicle",
    image: "/gallery/gallery-07.jpg",
    imageAlt: "Hoist installed alongside a completed building — 2011",
  },
  {
    year: "2009",
    title: "Equipment Capacity Increased",
    description:
      "Continued adding equipment and site support capacity as customer demand grew.",
    tag: "Equipment",
    image: "/projects/commercial-facade-scaffold.jpg",
    imageAlt: "Commercial facade scaffolding project — 2009",
  },
  {
    year: "2007",
    title: "Tata Ace Added",
    description: "Added Tata Ace and expanded daily site movement.",
    tag: "Vehicle",
    image: "/gallery/gallery-08.jpg",
    imageAlt: "Early residential construction site supported by Rasa — 2007",
  },
  {
    year: "2005",
    title: "Lift Machine and 407 Vehicle Added",
    description: "Added another machine, lift support, and 407 vehicle.",
    tag: "Equipment",
    image: "/projects/hospital-hoist.jpg",
    imageAlt: "Hoist and lift support for multi-storey hospital project — 2005",
  },
  {
    year: "2000",
    title: "Started with One Concrete Machine",
    description:
      "Started with one concrete machine and around ten labourers travelling to nearby sites for construction support.",
    tag: "Founded",
    image: "/images/project-concrete.png",
    imageAlt: "Concrete works — Rasa Construction founding year 2000",
  },
];


const TOTAL = timelineItems.length;

/* ── Framer Motion variants ──────────────────────────────── */

/** The full card (image + text) slides as one unit */
const cardVariants = {
  enter: {
    x: 48,
    opacity: 0,
    scale: 0.98,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    x: -48,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/** Year counter ticks up/down */
const yearVariants = {
  enter: { y: 18, opacity: 0 },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    y: -18,
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ── Component ───────────────────────────────────────────── */

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const active = timelineItems[activeIndex];
  const isLast = activeIndex === TOTAL - 1;

  /** Click image → advance to next (older) milestone, loop at end */
  const handleImageClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % TOTAL);
  };

  /** Jump to specific year from nav rail or chips */
  const goTo = (idx: number) => {
    if (idx === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(idx);
  };

  return (
    <section
      id="about"
      className="about-section bg-[#FBF7F1] relative overflow-hidden"
    >
      <SectionWatermark text="JOURNEY" align="center" variant="light" top="35%" opacity={0.012} />

      <div className="container about-container relative z-10">

        {/* ── 1. Rasa Today + Founder Image ─────────────────── */}
        <div className="about-layout grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start mb-20">
          <div className="flex flex-col justify-start">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#083335] mt-0 mb-4 leading-tight">
                Rasa Construction Today
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="heritage-rule">
                <span className="heritage-rule-text">Est. 2000</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[#162625] text-base md:text-lg leading-relaxed font-medium">
                Rasa Construction now supports builders and contractors across South Tamil Nadu with scaffolding rental, centring materials, concrete work support, vertical hoist rental, jockey span sheets, and site material movement.
              </p>
            </Reveal>
          </div>

          <div className="flex justify-center w-full lg:sticky lg:top-24">
            <Reveal delay={0.15}>
              <div className="about-image-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] overflow-hidden w-full max-w-[440px]">
                <div className="relative w-full aspect-[4/3] bg-[#F6F1EA] flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-[#F6F1EA]">
                    <span className="text-sm text-[#083335] font-bold">
                      Founder / crew image can be added here
                    </span>
                  </div>
                  <div className="absolute inset-0 z-10">
                    <Image
                      src="/images/about-owner-site.jpg"
                      alt="Rasa Construction Crew"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 440px"
                    />
                  </div>
                </div>
                <div className="p-5 text-center border-t border-[rgba(8,51,53,0.08)] bg-white">
                  <p className="text-xs text-[#66706B] font-semibold uppercase tracking-wider">
                    Rasa Construction Support Team
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── 2. What We Support Today ──────────────────────── */}
        <div className="mb-20">
          <Reveal>
            <h3 className="text-2xl font-bold text-[#083335] text-center mb-8">
              What we support today
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Scaffolding & Pipes", body: "Cup lock pipes, scaffolding pipes, 1m, 2m, 1ft, and 2ft pipes.", delay: 0.05 },
              { title: "Centring & Jockey Sheets", body: "Centring materials and jockey span sheets in two sizes.", delay: 0.1 },
              { title: "Vertical Hoist Rental", body: "Vertical hoist rental with H-frame support.", delay: 0.15 },
              { title: "Fleet & Site Movement", body: "407, Tata Ace, Tata Intra, Ashok Leyland HB1215 and material delivery support.", delay: 0.2 },
            ].map(({ title, body, delay }) => (
              <Reveal key={title} delay={delay}>
                <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                  <h4 className="text-[#083335] font-extrabold text-base mb-2">{title}</h4>
                  <p className="text-[#66706B] text-sm leading-relaxed mt-auto">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── 3. Company Journey ─────────────────────────────── */}
        <div className="about-timeline-section">

          {/* Intro banner */}
          <Reveal>
            <div className="about-journey-intro">
              <div className="about-journey-badge">25+ Years</div>
              <h3 className="about-journey-title">
                Twenty-Five Years of Building and Growth
              </h3>
              <p className="about-journey-lead">
                From a single concrete machine in 2000 to a growing fleet, scaffolding systems, hoist rentals, and construction support services across South Tamil Nadu.
              </p>
            </div>
          </Reveal>

          {/* Gallery layout */}
          <Reveal delay={0.1}>
            <div className="about-gallery-layout">

              {/* LEFT: Year nav rail — desktop */}
              <nav className="about-year-nav" aria-label="Journey year navigation">
                {timelineItems.map((item, idx) => (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => goTo(idx)}
                    onMouseDown={(e) => e.preventDefault()}
                    className={`about-year-btn ${idx === activeIndex ? "active" : ""}`}
                    aria-current={idx === activeIndex ? "step" : undefined}
                  >
                    <span className="about-year-label">{item.year}</span>
                    <span className="about-year-dot" />
                  </button>
                ))}
              </nav>

              {/* RIGHT: Image-driven gallery card */}
              <div className="about-gallery-main">

                {/* Mobile year chips */}
                <div className="about-year-chips">
                  {timelineItems.map((item, idx) => (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => goTo(idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      className={`about-year-chip ${idx === activeIndex ? "active" : ""}`}
                    >
                      {item.year}
                    </button>
                  ))}
                </div>

                {/* The gallery card */}
                <div className="about-gallery-card">
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                    onExitComplete={() => setIsAnimating(false)}
                  >
                    <motion.div
                      key={activeIndex}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="about-gallery-card-inner"
                    >

                      {/* ── Clickable image — this IS the navigation ── */}
                      <button
                        type="button"
                        className="about-gallery-img-btn"
                        onClick={handleImageClick}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label={
                          isLast
                            ? "Loop back to 2026"
                            : `View ${timelineItems[activeIndex + 1]?.year} milestone`
                        }
                      >
                        {/* Real image — mapped from existing project assets */}
                        <Image
                          src={active.image}
                          alt={active.imageAlt}
                          fill
                          className="about-gallery-img"
                          sizes="(max-width: 768px) 100vw, 680px"
                          priority={activeIndex === 0}
                        />

                        {/* Hover overlay — shows next action */}
                        <div className="about-gallery-hover-overlay">
                          <span className="about-gallery-hover-label">
                            {isLast ? "Start Again →" : `${timelineItems[activeIndex + 1]?.year} →`}
                          </span>
                        </div>

                        {/* Progress bar across bottom of image */}
                        <div className="about-gallery-progress">
                          <div
                            className="about-gallery-progress-fill"
                            style={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
                          />
                        </div>
                      </button>


                      {/* ── Text content below image ── */}
                      <div className="about-gallery-body">

                        {/* Year + tag row */}
                        <div className="about-gallery-meta">
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                              key={`year-${activeIndex}`}
                              variants={yearVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="about-gallery-year"
                            >
                              {active.year}
                            </motion.span>
                          </AnimatePresence>

                          <div className="about-gallery-meta-right">
                            <span className="about-milestone-tag">{active.tag}</span>
                            <span className="about-milestone-counter">
                              {activeIndex + 1}&thinsp;/&thinsp;{TOTAL}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="about-gallery-heading">{active.title}</h4>

                        {/* Description */}
                        <p className="about-gallery-desc">{active.description}</p>

                        {/* Click-image hint */}
                        <p className="about-gallery-hint">
                          Click the image to view the previous milestone
                        </p>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </Reveal>

        </div>

        {/* ── Narrative cue ── */}
        <Reveal delay={0.15}>
          <a
            href="#contact"
            className="section-cue"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Need support on your next site?
            <span className="section-cue-arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>

      </div>
    </section>
  );
}
