"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Share2, Globe, Link2, Send } from "lucide-react";
import RasaLogo from "@/components/RasaLogo";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Services",     href: "#services" },
  { label: "Projects",     href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

const services = [
  "Scaffolding Rental",
  "Centring Materials",
  "Concrete Works",
  "Vertical Hoist Rental",
  "Site Support",
];

const socials = [
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: Link2,  href: "#", label: "Instagram" },
  { icon: Globe,  href: "#", label: "YouTube" },
  { icon: Send,   href: "#", label: "Twitter" },
];

export default function Footer() {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #030f10 0%, #051f21 100%)" }}
    >
      {/* Top accent rule */}
      <div
        className="w-full"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(216,185,163,0.4), transparent)" }}
      />

      <div className="container py-16">
        <div
          className="grid gap-12"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {/* Brand — 3 cols */}
          <div style={{ gridColumn: "1 / span 3" }} className="[grid-column:1/-1] sm:[grid-column:1/span_6] lg:[grid-column:1/span_3]">
            <div className="flex items-center gap-3 mb-5">
              <RasaLogo size={44} color="#D8B9A3" />
              <div>
                <div className="font-montserrat text-white font-black text-lg" style={{ letterSpacing: "-0.01em" }}>
                  RASA
                </div>
                <div className="label-editorial" style={{ color: "#D8B9A3", fontSize: "0.58rem", letterSpacing: "0.25em" }}>
                  Construction
                </div>
              </div>
            </div>

            <p
              className="font-inter mb-6"
              style={{ fontSize: "var(--text-sm)", lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}
            >
              Building strength and delivering trust through premium scaffolding, concrete works, and equipment rental across Tamil Nadu.
            </p>

            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(216,185,163,0.08)",
                    border: "1px solid rgba(216,185,163,0.12)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#D8B9A3";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(216,185,163,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(216,185,163,0.12)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — 2 cols */}
          <div style={{ gridColumn: "5 / span 2" }} className="[grid-column:1/-1] sm:[grid-column:7/span_3] lg:[grid-column:5/span_2]">
            <h4 className="label-editorial mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.href)}
                    className="font-inter text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D8B9A3"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — 2 cols */}
          <div style={{ gridColumn: "8 / span 2" }} className="[grid-column:1/-1] sm:[grid-column:1/span_6] lg:[grid-column:8/span_2]">
            <h4 className="label-editorial mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 3 cols */}
          <div style={{ gridColumn: "11 / span 2" }} className="[grid-column:1/-1] sm:[grid-column:7/span_6] lg:[grid-column:11/span_2]">
            <h4 className="label-editorial mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919842766379" className="flex items-start gap-3 group">
                  <Phone size={14} style={{ color: "#D8B9A3", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div className="font-inter text-sm group-hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                      +91 98427 66379
                    </div>
                    <div className="font-inter text-sm group-hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
                      +91 63807 29431
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:gurusamyrasa@gmail.com" className="flex items-start gap-3 group">
                  <Mail size={14} style={{ color: "#D8B9A3", flexShrink: 0, marginTop: "2px" }} />
                  <span className="font-inter text-sm group-hover:text-white transition-colors break-all" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                    gurusamyrasa@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={14} style={{ color: "#D8B9A3", flexShrink: 0, marginTop: "2px" }} />
                  <span className="font-inter text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Rasa Office,<br />Achankuttam – 627861,<br />Tamil Nadu
                  </span>
                </div>
              </li>
            </ul>

            <a
              href="https://wa.me/919842766379?text=Hello%20Rasa%20Construction%2C%20I'm%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 inline-flex text-sm"
              style={{
                background: "#25D366",
                color: "white",
                padding: "0.6rem 1.25rem",
                borderRadius: "6px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}
        >
          <span>© {new Date().getFullYear()} Rasa Construction. All rights reserved. Owner: Gurusamy A</span>
          <span>Achankuttam, Tamil Nadu – 627861</span>
        </div>
      </div>
    </footer>
  );
}
