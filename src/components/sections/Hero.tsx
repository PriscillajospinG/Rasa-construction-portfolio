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
    <section id="home" className="hero hero-section">
      <div className="hero-image-layer">
        <Image
          src="/hero/hero-site.jpg"
          alt="Rasa Construction site work"
          fill
          priority
          sizes="100vw"
          className="hero-bg-image"
        />
      </div>

      <div className="hero-green-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow">Trusted Site Support Since 2000</p>
          <h1 className="hero-title">
            <span className="hero-highlight">Reliable construction support</span> for real site work.
          </h1>
          <p className="hero-description">
            Scaffolding rental, centring materials, concrete works, vertical hoist rental, and site support handled with safety, timing, and direct owner involvement.
          </p>

          <div className="hero-actions">
            <a href="#contact" onClick={handleQuoteClick} className="btn-primary">Request a Quote</a>
            <a href={`tel:${company.contact.primary.replace(/\s/g, "")}`} className="btn-secondary">Call for Advice</a>
          </div>
        </div>
      </div>
    </section>
  );
}
