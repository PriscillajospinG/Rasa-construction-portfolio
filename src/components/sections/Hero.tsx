"use client";

import Image from "next/image";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

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
