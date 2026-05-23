"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  points?: string[];
  image: string | null;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2026",
    title: "Ashok Leyland HB1215 Added",
    description: "A new Ashok Leyland HB1215 strengthened our ability to move scaffolding, centring materials, and site equipment for larger projects.",
    image: null,
  },
  {
    year: "2025",
    title: "Site Support Capacity Strengthened",
    description: "The business continued improving site support, material handling, and rental service readiness for regular construction customers.",
    image: null,
  },
  {
    year: "2024",
    title: "Tata Intra Added",
    description: "A Tata Intra was added for faster local delivery and flexible site support.",
    image: null,
  },
  {
    year: "2023",
    title: "Jockey Span Sheet Supply Started",
    description: "We expanded into jockey span sheets, supplying sheet materials in multiple sizes for slab and centring work.",
    points: [
      "Jockey span sheets in two sizes",
      "Sheet support for slab work",
      "Better centring material availability"
    ],
    image: null,
  },
  {
    year: "2020",
    title: "Scaffolding Supply Expanded",
    description: "During the corona period, we expanded into scaffolding rental and supply, including cup lock pipes and multiple pipe sizes.",
    points: [
      "Cup lock scaffolding pipes",
      "1m and 2m pipes",
      "1ft and 2ft pipes",
      "Site scaffolding support"
    ],
    image: null,
  },
  {
    year: "2015",
    title: "Fleet Support Expanded",
    description: "Additional vehicle support helped us serve more sites and improve material movement.",
    image: null,
  },
  {
    year: "2012",
    title: "Vertical Hoist Rental Started",
    description: "We started vertical hoist rental support for multi-level construction work.",
    points: [
      "Vertical hoist rental",
      "H-frames for vertical hoist",
      "Material lifting support"
    ],
    image: null,
  },
  {
    year: "2011",
    title: "Additional Vehicle Assembled",
    description: "Another vehicle was assembled and added to support growing site operations.",
    image: null,
  },
  {
    year: "2009",
    title: "Equipment Capacity Increased",
    description: "The business continued adding equipment and site support capacity as customer demand grew.",
    image: null,
  },
  {
    year: "2007",
    title: "Tata Ace Added",
    description: "A Tata Ace helped the business reach more sites and expand daily operations.",
    image: null,
  },
  {
    year: "2005",
    title: "Lift Machine and 407 Vehicle Added",
    description: "We added another machine, a lift, and a 407 vehicle, improving site execution and transport.",
    image: null,
  },
  {
    year: "2000",
    title: "Started with One Concrete Machine",
    description: "Rasa Construction began with one concrete machine and around ten labourers travelling to different sites for construction support.",
    points: [
      "One concrete machine",
      "Around 10 labourers",
      "Site-based construction work",
      "Beginning of the family business"
    ],
    image: null,
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const active = timelineItems[activeIndex];

  // Clicking Left Arrow: Goes BACKWARD in time (moves from latest 2026 -> oldest 2000, i.e., index goes UP)
  const goToPrevTime = () => {
    setActiveIndex((prev) => (prev + 1) % timelineItems.length);
  };

  // Clicking Right Arrow: Goes FORWARD in time (moves from oldest 2000 -> latest 2026, i.e., index goes DOWN)
  const goToNextTime = () => {
    setActiveIndex((prev) => (prev - 1 + timelineItems.length) % timelineItems.length);
  };

  // Clicking the card itself: Goes BACKWARD in time (index goes UP)
  const handleCardClick = () => {
    goToPrevTime();
  };

  return (
    <section
      id="about"
      ref={ref}
      className="section-bridge bridge-cream-to-white about-section py-20 relative overflow-hidden bg-[#F4EFE7]"
    >
      <div className="container relative z-10">
        
        {/* Section Heading */}
        <div className="section-header text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <p className="section-eyebrow uppercase tracking-widest text-sm font-bold text-[#083335]">
              ABOUT RASA CONSTRUCTION
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title text-4xl font-extrabold text-[#083335] mt-2 mb-4">
              Built through real site work since 2000.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead text-lg text-[#66706B] leading-relaxed">
              Rasa Construction started with one concrete machine and a small team of labourers. Over the years, the work grew through site experience, trusted customers, and steady investment in vehicles, scaffolding, centring materials, and lifting support.
            </p>
          </Reveal>
        </div>

        {/* 1. Current Company Intro + 2. Founder/Crew Visual Area */}
        <div className="about-layout grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch mb-16">
          
          {/* Left: Story and Trust Points */}
          <div className="flex flex-col justify-between">
            <Reveal>
              <div className="about-story p-8 bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)]">
                <h3 className="text-xl font-bold text-[#083335] mb-4">Rasa Construction today</h3>
                <p className="about-story-text text-[#162625] text-base leading-relaxed">
                  Today, Rasa Construction supports builders and contractors across South Tamil Nadu with scaffolding rental, centring materials, concrete work support, vertical hoist rental, jockey span sheets, and site material movement. What began as a small labour-based site support team has grown into a dependable family-run construction support business.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="about-trust-points flex flex-col gap-4 pl-4 mt-8">
                <div className="trust-point flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#083335] flex-shrink-0" />
                  <span className="text-[#162625] font-semibold text-base">Family-run construction support business</span>
                </div>
                <div className="trust-point flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#083335] flex-shrink-0" />
                  <span className="text-[#162625] font-semibold text-base">Serving sites across South Tamil Nadu</span>
                </div>
                <div className="trust-point flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#083335] flex-shrink-0" />
                  <span className="text-[#162625] font-semibold text-base">Equipment, labour support, scaffolding, and centring materials under one roof</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Founder / Crew image card */}
          <div className="flex items-center justify-center">
            <Reveal delay={0.15}>
              <div className="about-image-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] overflow-hidden w-full max-w-[420px]">
                <div className="relative w-full aspect-[4/3] bg-[#F6F1EA]">
                  <Image
                    src="/about/about-owner-site.jpg"
                    alt="Rasa Construction site photo showing the team and Rasa Name Board"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 420px"
                    priority
                  />
                </div>
                <div className="p-4 border-t border-[rgba(8,51,53,0.08)] text-center">
                  <span className="text-xs text-[#D8B9A3] font-bold block uppercase tracking-wider">Founded by</span>
                  <span className="text-base text-[#083335] font-bold block mt-0.5">Gurusamy A</span>
                  <span className="text-xs text-[#66706B] block mt-0.5">Achankuttam, Tamil Nadu</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* 3. Current Strength Cards */}
        <div className="mb-20">
          <Reveal>
            <h3 className="text-xl font-bold text-[#083335] text-center mb-8">What We Provide Today</h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Reveal delay={0.1}>
              <div className="about-strength-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] p-6 h-full flex flex-col">
                <span className="text-xs font-bold text-[#D8B9A3] uppercase tracking-wider mb-2 block">Card 1</span>
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Scaffolding & Pipes</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  Cup lock pipes, scaffolding pipes, 1m, 2m, 1ft, and 2ft pipe support.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="about-strength-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] p-6 h-full flex flex-col">
                <span className="text-xs font-bold text-[#D8B9A3] uppercase tracking-wider mb-2 block">Card 2</span>
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Centring & Sheets</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  Centring materials, jockey span sheets in two sizes, and slab support materials.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="about-strength-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] p-6 h-full flex flex-col">
                <span className="text-xs font-bold text-[#D8B9A3] uppercase tracking-wider mb-2 block">Card 3</span>
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Vertical Hoist Rental</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  Vertical hoist support with H-frames for multi-level construction work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="about-strength-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] p-6 h-full flex flex-col">
                <span className="text-xs font-bold text-[#D8B9A3] uppercase tracking-wider mb-2 block">Card 4</span>
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Fleet & Delivery</h4>
                <p className="text-[#66706B] text-sm leading-relaxed mt-auto">
                  407, Tata Ace, Tata Intra, Ashok Leyland HB1215, and site material movement.
                </p>
              </div>
            </Reveal>

          </div>
        </div>

        {/* 4. Timeline Comes Last */}
        <div className="about-timeline-section mt-20 p-8 md:p-12 bg-white border border-[rgba(8,51,53,0.12)] rounded-[28px] shadow-[0_10px_28px_rgba(8,51,53,0.07)]">
          <Reveal>
            <div className="timeline-header text-center mb-10">
              <h3 className="timeline-title text-3xl font-extrabold text-[#083335] mb-2">
                Our growth journey
              </h3>
              <p className="timeline-subtitle text-[#66706B] text-base max-w-2xl mx-auto">
                Every milestone came from real site needs — more equipment, better transport, stronger lifting support, and reliable service for customers.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* Timeline Panel Wrapper */}
            <div className="timeline-panel-wrapper flex flex-col gap-8">
              
              {/* Desktop view (arrows on left/right sides, center card) */}
              <div className="hidden md:flex items-center justify-between gap-6 max-w-4xl mx-auto w-full">
                
                {/* Left Arrow: Goes back in time (2026 -> 2025) */}
                <button
                  type="button"
                  onClick={goToPrevTime}
                  className="timeline-arrow-btn flex items-center justify-center w-12 h-12 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all hover:-translate-y-0.5"
                  aria-label="Previous milestone (back in time)"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Center interactive Card */}
                <div
                  onClick={handleCardClick}
                  key={activeIndex}
                  className="timeline-interactive-card animate-fade-in flex flex-row bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl overflow-hidden w-full min-h-[300px] cursor-pointer hover:shadow-[0_12px_30px_rgba(8,51,53,0.08)] transition-all p-6 gap-6"
                >
                  <div className="w-1/2 relative bg-[#F6F1EA] rounded-xl overflow-hidden min-h-[220px]">
                    {active.image ? (
                      <img
                        src={active.image}
                        alt={active.title}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 h-full text-center">
                        <div className="text-3xl mb-2">🚧</div>
                        <div className="text-[#083335] font-bold text-sm">
                          Add image for {active.year}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-1/2 flex flex-col justify-center">
                    <span className="text-4xl font-extrabold text-[#D8B9A3] block mb-2">{active.year}</span>
                    <h4 className="text-[#083335] font-extrabold text-lg mb-2 leading-snug">{active.title}</h4>
                    <p className="text-[#162625] text-sm leading-relaxed mb-4">{active.description}</p>
                    
                    {active.points && active.points.length > 0 && (
                      <ul className="flex flex-col gap-1.5 mb-2">
                        {active.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs font-semibold text-[#162625]">
                            <CheckCircle2 size={13} className="text-[#083335] mt-0.5 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <span className="text-[10px] text-[#66706B] font-medium mt-auto block uppercase tracking-wider">
                      Click image to go back through the years
                    </span>
                  </div>

                </div>

                {/* Right Arrow: Goes forward in time (2025 -> 2026) */}
                <button
                  type="button"
                  onClick={goToNextTime}
                  className="timeline-arrow-btn flex items-center justify-center w-12 h-12 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all hover:-translate-y-0.5"
                  aria-label="Next milestone (forward in time)"
                >
                  <ChevronRight size={24} />
                </button>

              </div>

              {/* Mobile view (stacked, arrows below card) */}
              <div className="flex md:hidden flex-col gap-6 w-full max-w-md mx-auto">
                <div
                  onClick={handleCardClick}
                  key={`mobile-${activeIndex}`}
                  className="timeline-interactive-card animate-fade-in flex flex-col bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl overflow-hidden w-full cursor-pointer hover:shadow-[0_12px_30px_rgba(8,51,53,0.08)] transition-all p-6 gap-4"
                >
                  <div className="relative w-full aspect-[4/3] bg-[#F6F1EA] rounded-xl overflow-hidden">
                    {active.image ? (
                      <img
                        src={active.image}
                        alt={active.title}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 h-full text-center">
                        <div className="text-3xl mb-2">🚧</div>
                        <div className="text-[#083335] font-bold text-sm">
                          Add image for {active.year}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-3xl font-extrabold text-[#D8B9A3] block mb-1">{active.year}</span>
                    <h4 className="text-[#083335] font-extrabold text-base mb-2 leading-snug">{active.title}</h4>
                    <p className="text-[#162625] text-xs leading-relaxed mb-4">{active.description}</p>
                    
                    {active.points && active.points.length > 0 && (
                      <ul className="flex flex-col gap-1.5 mb-2">
                        {active.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs font-semibold text-[#162625]">
                            <CheckCircle2 size={13} className="text-[#083335] mt-0.5 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="text-[9px] text-[#66706B] font-medium mt-auto block uppercase tracking-wider">
                      Click image to go back through the years
                    </span>
                  </div>
                </div>

                {/* Mobile Arrows */}
                <div className="flex items-center justify-center gap-6 mt-2">
                  <button
                    type="button"
                    onClick={goToPrevTime}
                    className="timeline-arrow-btn flex items-center justify-center w-10 h-10 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all"
                    aria-label="Previous milestone (back in time)"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextTime}
                    className="timeline-arrow-btn flex items-center justify-center w-10 h-10 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all"
                    aria-label="Next milestone (forward in time)"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

              </div>

              {/* Year Buttons (listed below the card carousel) */}
              <div className="timeline-years-row flex flex-wrap justify-center gap-2 max-w-3xl mx-auto w-full mt-4">
                {timelineItems.map((item, idx) => (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border outline-none ${
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

      </div>
    </section>
  );
}
