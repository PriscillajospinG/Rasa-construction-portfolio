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
  image: string | null;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2026",
    title: "Ashok Leyland HB1215 Added",
    description: "A new Ashok Leyland HB1215 strengthened our ability to move scaffolding, centring materials, and site equipment for larger projects.",
    image: "/gallery/gallery-02.jpg",
  },
  {
    year: "2025",
    title: "Site Support Capacity Strengthened",
    description: "The business continued improving site support, material handling, and rental service readiness for regular construction customers.",
    image: "/gallery/gallery-01.jpg",
  },
  {
    year: "2024",
    title: "Tata Intra Added",
    description: "A Tata Intra was added for faster local delivery and flexible site support.",
    image: "/gallery/gallery-03.jpg",
  },
  {
    year: "2023",
    title: "Jockey Span Sheet Supply Started",
    description: "We expanded into jockey span sheets, supplying sheet materials in multiple sizes for slab and centring work.",
    image: "/projects/achankuttam-slab.jpg",
  },
  {
    year: "2020",
    title: "Scaffolding Supply Expanded",
    description: "During the corona period, we expanded into scaffolding rental and supply, including cup lock pipes and multiple pipe sizes.",
    image: "/projects/commercial-facade-scaffold.jpg",
  },
  {
    year: "2015",
    title: "Fleet Support Expanded",
    description: "Additional vehicle support helped us serve more sites and improve material movement.",
    image: "/gallery/gallery-06.jpg",
  },
  {
    year: "2012",
    title: "Vertical Hoist Rental Started",
    description: "We started vertical hoist rental support for multi-level construction work.",
    image: "/projects/hospital-hoist.jpg",
  },
  {
    year: "2011",
    title: "Additional Vehicle Assembled",
    description: "Another vehicle was assembled and added to support growing site operations.",
    image: "/gallery/gallery-08.jpg",
  },
  {
    year: "2009",
    title: "Equipment Capacity Increased",
    description: "The business continued adding equipment and site support capacity as customer demand grew.",
    image: "/gallery/gallery-09.jpg",
  },
  {
    year: "2007",
    title: "Tata Ace Added",
    description: "A Tata Ace helped the business reach more sites and expand daily operations.",
    image: "/gallery/gallery-10.jpg",
  },
  {
    year: "2005",
    title: "Lift Machine and 407 Vehicle Added",
    description: "We added another machine, a lift, and a 407 vehicle, improving site execution and transport.",
    image: "/projects/concrete.png",
  },
  {
    year: "2000",
    title: "Started with One Concrete Machine",
    description: "Rasa Construction began with one concrete machine and around ten labourers travelling to different sites for construction support.",
    image: "/about/about-team.png",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
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
      <div className="container about-container relative z-10">
        
        {/* 1. Intro Content and 2. Founder/Crew Image Area in 2-Column layout */}
        <div className="about-layout grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start mb-16">
          
          {/* Left Column: Eyebrow, Title, Lead, Story, Trust Points */}
          <div className="flex flex-col justify-start">
            <Reveal>
              <p className="section-eyebrow uppercase tracking-widest text-sm font-bold text-[#D8B9A3] mb-3">
                ABOUT RASA CONSTRUCTION
              </p>
            </Reveal>
            
            <Reveal delay={0.05}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#083335] mt-0 mb-4 leading-tight">
                A family-run construction support business built through site work.
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg text-[#162625] font-semibold leading-relaxed mb-4">
                Rasa Construction supports builders and contractors across South Tamil Nadu with scaffolding, centring materials, concrete work support, vertical hoist rental, jockey span sheets, and site material movement.
              </p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="text-[#66706B] text-base leading-relaxed mb-6">
                We started small, but every step came from real site needs. From one concrete machine and a small labour team, the business grew by adding vehicles, lifting support, scaffolding pipes, centring materials, and sheet support. Today, we continue with the same practical approach — timely service, reliable materials, and support that helps work move on site.
              </p>
            </Reveal>

            {/* Simple Trust Points */}
            <Reveal delay={0.2}>
              <ul className="about-trust-points flex flex-col gap-3 pl-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#083335] mt-1 flex-shrink-0" />
                  <span className="text-[#162625] font-medium text-base">
                    Family-run business with hands-on site experience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#083335] mt-1 flex-shrink-0" />
                  <span className="text-[#162625] font-medium text-base">
                    Serving builders and contractors across South Tamil Nadu
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#083335] mt-1 flex-shrink-0" />
                  <span className="text-[#162625] font-medium text-base">
                    Scaffolding, centring, hoist rental, concrete work, and material movement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#083335] mt-1 flex-shrink-0" />
                  <span className="text-[#162625] font-medium text-base">
                    Grown through customer trust and steady work
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Right Column: Founder/Crew Image Card */}
          <div className="flex justify-center w-full lg:sticky lg:top-24">
            <Reveal delay={0.15}>
              <div className="about-image-card bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] overflow-hidden w-full max-w-[440px]">
                <div className="relative w-full aspect-[4/3] bg-[#F6F1EA]">
                  <Image
                    src="/about/about-owner-site.jpg"
                    alt="Rasa Construction founder and site equipment"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 440px"
                    priority
                  />
                </div>
                <div className="p-5 text-center border-t border-[rgba(8,51,53,0.08)] bg-white">
                  <p className="text-sm text-[#66706B] leading-relaxed italic font-medium">
                    From one machine to full site support, Rasa Construction has grown step by step since 2000.
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
                <p className="text-[#66706B] text-sm leading-relaxed">
                  Cup lock pipes, scaffolding pipes, and multiple pipe sizes for site work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Centring & Sheets</h4>
                <p className="text-[#66706B] text-sm leading-relaxed">
                  Centring materials and jockey span sheets for slab and formwork support.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Vertical Hoist Rental</h4>
                <p className="text-[#66706B] text-sm leading-relaxed">
                  Hoist rental with H-frame support for multi-level construction work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="about-strength-card bg-white p-6 h-full flex flex-col border-t-4 border-[#D8B9A3] border-x border-b border-[rgba(8,51,53,0.12)] rounded-xl shadow-[0_10px_28px_rgba(8,51,53,0.07)] hover:shadow-[0_14px_32px_rgba(8,51,53,0.1)] hover:-translate-y-[3px] transition-all duration-300">
                <h4 className="text-[#083335] font-extrabold text-base mb-2">Fleet & Site Movement</h4>
                <p className="text-[#66706B] text-sm leading-relaxed">
                  Vehicles and material movement support for timely site delivery.
                </p>
              </div>
            </Reveal>

          </div>
        </div>

        {/* 4. Timeline at the bottom */}
        <div className="about-timeline-section mt-16 p-6 md:p-10 bg-white border border-[rgba(8,51,53,0.12)] rounded-[24px] shadow-[0_10px_28px_rgba(8,51,53,0.07)]">
          <Reveal>
            <div className="timeline-header text-center mb-10">
              <h3 className="timeline-title text-2xl md:text-3xl font-extrabold text-[#083335] mb-2">
                Our growth journey
              </h3>
              <p className="timeline-subtitle text-[#66706B] text-base max-w-2xl mx-auto">
                Every milestone came from real work, customer needs, and steady investment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="timeline-panel-wrapper flex flex-col gap-8">
              
              {/* Desktop view (arrows on sides, center card) */}
              <div className="hidden md:flex items-center justify-between gap-6 max-w-4xl mx-auto w-full">
                
                {/* Left Arrow: Goes back in time (2026 -> 2025 -> 2024 ...) */}
                <button
                  type="button"
                  onClick={goToPrevTime}
                  className="timeline-arrow-btn flex items-center justify-center w-12 h-12 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all hover:-translate-y-0.5"
                  aria-label="Previous milestone (back in time)"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Center milestone card */}
                <div
                  onClick={handleCardClick}
                  key={activeIndex}
                  className="timeline-interactive-card animate-fade-in flex flex-row bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl overflow-hidden w-full min-h-[280px] cursor-pointer hover:shadow-[0_12px_30px_rgba(8,51,53,0.08)] transition-all p-6 gap-6"
                >
                  <div className="w-1/2 relative bg-[#F6F1EA] rounded-xl overflow-hidden min-h-[220px]">
                    {active.image ? (
                      <img
                        src={active.image}
                        alt={active.title}
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-[1.03]"
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
                    
                    <span className="text-[10px] text-[#66706B] font-semibold mt-auto block uppercase tracking-wider">
                      Click the image to move back through our journey.
                    </span>
                  </div>

                </div>

                {/* Right Arrow: Goes forward in time (2000 -> 2005 ... -> 2026) */}
                <button
                  type="button"
                  onClick={goToNextTime}
                  className="timeline-arrow-btn flex items-center justify-center w-12 h-12 rounded-full bg-[#083335] text-white hover:bg-[#06282A] transition-all hover:-translate-y-0.5"
                  aria-label="Next milestone (forward in time)"
                >
                  <ChevronRight size={24} />
                </button>

              </div>

              {/* Mobile view (stacked layout, arrows below card) */}
              <div className="flex md:hidden flex-col gap-6 w-full max-w-md mx-auto">
                <div
                  onClick={handleCardClick}
                  key={`mobile-${activeIndex}`}
                  className="timeline-interactive-card animate-fade-in flex flex-col bg-white border border-[rgba(8,51,53,0.12)] rounded-2xl overflow-hidden w-full cursor-pointer hover:shadow-[0_12px_30px_rgba(8,51,53,0.08)] transition-all p-5 gap-4"
                >
                  <div className="relative w-full aspect-[4/3] bg-[#F6F1EA] rounded-xl overflow-hidden">
                    {active.image ? (
                      <img
                        src={active.image}
                        alt={active.title}
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-[1.03]"
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
                    
                    <span className="text-[9px] text-[#66706B] font-semibold mt-auto block uppercase tracking-wider">
                      Click the image to move back through our journey.
                    </span>
                  </div>
                </div>

                {/* Mobile navigation arrows */}
                <div className="flex items-center justify-center gap-6 mt-1">
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

              {/* Year Chips list */}
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

      </div>
    </section>
  );
}
