"use client";

import Image from "next/image";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";
import BlueprintBg from "@/components/ui/BlueprintBg";

export default function Hero() {
  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo("#contact");
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-layer" aria-hidden="true">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg-img"
        />
      </div>

      {/* Blueprint grid accent */}
      <BlueprintBg variant="dark" opacity={0.06} />

      {/* Simplified crane silhouette SVG */}
      <div className="hero-crane-graphic" aria-hidden="true">
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
      </div>

      <div className="hero-overlay-layer" aria-hidden="true" />

      <div className="hero-content">
        <div className="container">
          <div style={{ maxWidth: "720px", paddingBottom: "24px" }}>
            <p className="hero-eyebrow">Trusted Site Support Since 2000</p>
            <h1 className="hero-title">
              <span className="hero-highlight">Reliable construction support</span> for real site work.
            </h1>
            <p className="hero-description">
              Scaffolding rental, centring materials, concrete works, vertical hoist rental, and site support handled with safety, timing, and direct owner involvement.
            </p>

            <div className="hero-actions">
              <a href="#contact" onClick={handleQuoteClick} className="btn-primary">
                Request a Quote
              </a>
              <a href={`tel:${company.contact.primary.replace(/\s/g, "")}`} className="btn-secondary">
                Call for Advice
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
