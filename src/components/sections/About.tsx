"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import SectionWatermark from "@/components/ui/SectionWatermark";

/** Direction-aware card variants */
const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2026",
    title: "Ashok Leyland HB1215 Added",
    description: "Added Ashok Leyland HB1215 to improve transport capacity for scaffolding, centring materials, and site equipment.",
  },
  {
    year: "2025",
    title: "Site Support Capacity Strengthened",
    description: "Improved site support, material handling, and rental readiness for regular construction customers.",
  },
  {
    year: "2024",
    title: "Tata Intra Added",
    description: "Added Tata Intra for faster local delivery and flexible site support.",
  },
  {
    year: "2023",
    title: "Jockey Span Sheet Supply Started",
    description: "Started supplying jockey span sheets in two sizes for slab and centring work.",
  },
  {
    year: "2020",
    title: "Scaffolding Business Expanded",
    description: "During the corona period, expanded into scaffolding rental and supply with cup lock pipes and multiple pipe sizes.",
  },
  {
    year: "2015",
    title: "Fleet Support Expanded",
    description: "Added more vehicle support to serve more construction sites.",
  },
  {
    year: "2012",
    title: "Vertical Hoist Rental Started",
    description: "Started vertical hoist rental with H-frame support for multi-level construction work.",
  },
  {
    year: "2011",
    title: "Additional Vehicle Assembled",
    description: "Assembled and added another vehicle for site material movement.",
  },
  {
    year: "2009",
    title: "Equipment Capacity Increased",
    description: "Continued adding equipment and site support capacity as customer demand grew.",
  },
  {
    year: "2007",
    title: "Tata Ace Added",
    description: "Added Tata Ace and expanded daily site movement.",
  },
  {
    year: "2005",
    title: "Lift Machine and 407 Vehicle Added",
    description: "Added another machine, lift support, and 407 vehicle.",
  },
  {
    year: "2000",
    title: "Started with One Concrete Machine",
    description: "Started with one concrete machine and around ten labourers travelling to nearby sites for construction support.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection]     = useState(1); // 1 = forward, -1 = backward

  const active   = timelineItems[activeIndex];
  const nextIndex = (activeIndex + 1) % timelineItems.length;
  const nextItem  = timelineItems[nextIndex];

  // Left arrow: goes BACKWARD in time (index UP = older)
  const goToPrevTime = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev + 1) % timelineItems.length);
  };

  // Right arrow: goes FORWARD in time (index DOWN = newer)
  const goToNextTime = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev - 1 + timelineItems.length) % timelineItems.length);
  };

  // Clicking card: goes backward in time
  const handleCardClick = () => {
    goToPrevTime();
  };

  return (
    <section
      id="about"
      ref={ref}
      className="about-section py-20 bg-[#FBF7F1] relative overflow-hidden"
    >
      {/* Huge background watermark */}
      <SectionWatermark text="OUR JOURNEY" align="center" variant="light" top="40%" opacity={0.015} />

      <div className="container about-container relative z-10">
        
        {/* 1. Intro Content and 2. Founder/Company Image Area in 2-Column layout */}
        <div className="about-layout grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start mb-16">
          
          {/* Left Column: Title & Text */}
          <div className="flex flex-col justify-start">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#083335] mt-0 mb-4 leading-tight">
                Rasa Construction Today
              </h2>
            </Reveal>

            {/* Heritage line */}
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

          {/* Right Column: Founder/Company Image Card */}
          <div className="flex justify-center w-full lg:sticky lg:top-24">
            <Reveal delay={0.15}>
              <div className="about-image-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] overflow-hidden w-full max-w-[440px]">
                <div className="relative w-full aspect-[4/3] bg-[#F6F1EA] flex items-center justify-center">
                  <Image
                    src="/images/about-owner-site.jpg"
                    alt="Rasa Construction Founder / Company Image"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 440px"
                    priority
                    onError={(e) => {
                      // Fallback visual text if image loading fails
                      const target = e.target as HTMLElement;
                      target.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-[#F6F1EA]">
                    <span className="text-sm text-[#083335] font-bold">
                      Founder / crew image can be added here
                    </span>
                  </div>
                  {/* Overlay image only if it is loaded (standard Next.js Image does this, but we force z-10 for absolute fit) */}
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

        {/* 3. What We Support Today Section */}
        <div className="my-16 md:my-20">
          <Reveal>
            <h3 className="text-2xl font-bold text-[#083335] text-center mb-8">
              What we support today
            </h3>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Reveal delay={0.05}>
              <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Scaffolding & Pipes</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  Cup lock pipes, scaffolding pipes, 1m, 2m, 1ft, and 2ft pipes.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Centring & Jockey Sheets</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  Centring materials and jockey span sheets in two sizes.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Vertical Hoist Rental</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  Vertical hoist rental with H-frame support.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Fleet & Site Movement</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  407, Tata Ace, Tata Intra, Ashok Leyland HB1215 and material delivery support.
                </p>
              </div>
            </Reveal>

          </div>
        </div>

        {/* 4. Timeline Section at the very bottom */}
        <div className="about-timeline-section mt-16 p-6 md:p-10 bg-white border border-[rgba(8,51,53,0.12)] rounded-[24px] shadow-[0_10px_28px_rgba(8,51,53,0.07)]">
          <Reveal>
            <div className="timeline-header text-center mb-10">
              <h3 className="timeline-title text-2xl md:text-3xl font-extrabold text-[#083335] mb-2">
                Our Growth Journey
              </h3>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="timeline-panel-wrapper flex flex-col gap-8">
              
              {/* Stacked Animated Timeline container */}
              <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto w-full relative">
                
                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={goToPrevTime}
                  className="timeline-arrow-btn flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all hover:-translate-y-0.5 z-30"
                  aria-label="Previous milestone (back in time)"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Big Center Milestone Card Stack */}
                <div className="relative w-full max-w-[440px] min-h-[420px] flex items-center justify-center">
                  <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      onClick={handleCardClick}
                      className="w-full bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_12px_32px_rgba(8,51,53,0.08)] cursor-pointer p-6 flex flex-col select-none hover:shadow-[0_16px_40px_rgba(8,51,53,0.12)] hover:-translate-y-[2px] transition-all duration-300 z-20"
                    >
                      {/* Image Placeholder */}
                      <div className="w-full aspect-[16/10] bg-[#F4EFE7] rounded-xl flex flex-col items-center justify-center border border-dashed border-[#D8B9A3] relative overflow-hidden">
                        <span className="text-sm text-[#083335] font-bold">
                          Add image for {active.year}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-col flex-grow">
                        <span className="text-3xl font-extrabold text-[#D8B9A3] mb-1">{active.year}</span>
                        <h4 className="text-[#083335] font-extrabold text-lg mb-2 leading-tight">
                          {active.title}
                        </h4>
                        <p className="text-[#162625] text-sm leading-relaxed mb-4">
                          {active.description}
                        </p>
                        
                        <div className="border-t border-[rgba(8,51,53,0.06)] pt-3 mt-auto">
                          <span className="text-[10px] text-[#66706B] font-semibold block uppercase tracking-wider text-center">
                            Click the image to move back through our journey.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Behind Card in stack for depth effect */}
                  <div className="absolute top-3 left-0 right-0 mx-auto w-[92%] h-[calc(100%-12px)] bg-white border border-[rgba(8,51,53,0.1)] rounded-2xl shadow-[0_4px_16px_rgba(8,51,53,0.03)] opacity-40 scale-95 origin-bottom pointer-events-none z-10 transform translate-y-3" />
                </div>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={goToNextTime}
                  className="timeline-arrow-btn flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all hover:-translate-y-0.5 z-30"
                  aria-label="Next milestone (forward in time)"
                >
                  <ChevronRight size={24} />
                </button>

              </div>

              {/* Year buttons (chips) below */}
              <div className="timeline-years-row flex flex-wrap justify-center gap-2 max-w-3xl mx-auto w-full mt-4">
                {timelineItems.map((item, idx) => (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border outline-none ${
                      idx === activeIndex 
                        ? "bg-[#083335] border-[#083335] text-white" 
                        : "bg-white border-[#083335] text-[#083335] hover:bg-[#F4EFE7]"
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>

            </div>
          </Reveal>

        </div>

        {/* ── Narrative cue ── */}
        <Reveal delay={0.15}>
          <a href="#contact" className="section-cue" onClick={(e) => { e.preventDefault(); const el = document.getElementById("contact"); el?.scrollIntoView({ behavior: "smooth" }); }}>
            Need support on your next site?
            <span className="section-cue-arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>

      </div>
    </section>
  );
}
