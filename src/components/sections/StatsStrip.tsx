"use client";

import Reveal from "@/components/animations/Reveal";
import { company } from "@/data/company";

export default function StatsStrip() {
  return (
    <section
      aria-label="Company statistics"
      className="stats-strip"
      style={{ background: "#083335" }}
    >
      {/* Subtle blueprint grid behind the strip */}
      <div className="stats-strip-grid" aria-hidden="true" />

      <div className="container stats-strip-inner">
        {company.stats.map(({ value, label }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <div className="stats-item">
              {/* Decorative index mark */}
              <span className="stats-index" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="stats-value">{value}</div>
              <div className="stats-label">{label}</div>
              {/* Vertical divider between items (except last) */}
              {i < company.stats.length - 1 && (
                <div className="stats-divider" aria-hidden="true" />
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom accent rule */}
      <div className="stats-accent-rule" aria-hidden="true">
        <svg width="100%" height="8" viewBox="0 0 1440 8" preserveAspectRatio="none" fill="none">
          <line x1="0" y1="4" x2="1440" y2="4" stroke="rgba(216,185,163,0.18)" strokeWidth="0.5" />
          <line x1="0" y1="2" x2="360" y2="2" stroke="rgba(216,185,163,0.35)" strokeWidth="1" />
          <circle cx="360" cy="2" r="2.5" fill="rgba(216,185,163,0.55)" />
          <line x1="360" y1="2" x2="720" y2="2" stroke="rgba(216,185,163,0.18)" strokeWidth="0.5" />
          <circle cx="720" cy="4" r="2" fill="rgba(216,185,163,0.35)" />
          <line x1="720" y1="6" x2="1080" y2="6" stroke="rgba(216,185,163,0.22)" strokeWidth="0.5" />
          <circle cx="1080" cy="6" r="2.5" fill="rgba(216,185,163,0.45)" />
          <line x1="1080" y1="4" x2="1440" y2="4" stroke="rgba(216,185,163,0.28)" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
