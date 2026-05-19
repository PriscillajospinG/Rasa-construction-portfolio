"use client";

import { motion } from "framer-motion";
import { HardHat, Phone, Mail, MapPin, Share2, Globe, Link2, Send } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
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
  { icon: Link2, href: "#", label: "Instagram" },
  { icon: Globe, href: "#", label: "YouTube" },
  { icon: Send, href: "#", label: "Twitter" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #030f10 0%, #051f21 100%)" }}
    >
      {/* Top accent line */}
      <div
        className="w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D8B9A3, transparent)" }}
      />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #D8B9A3, #c4a088)" }}
              >
                <HardHat size={20} color="#051f21" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-montserrat font-black text-white text-lg tracking-tight">RASA</div>
                <div className="text-[10px] tracking-[0.25em] uppercase font-poppins" style={{ color: "#D8B9A3" }}>
                  Construction
                </div>
              </div>
            </div>

            <p className="font-inter text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Building strength and delivering trust through premium scaffolding, concrete works, and equipment rental services across Tamil Nadu.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(216,185,163,0.1)",
                    border: "1px solid rgba(216,185,163,0.15)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(216,185,163,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "#D8B9A3";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(216,185,163,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-sm mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-inter text-sm transition-all duration-200 hover:translate-x-1 text-left"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D8B9A3"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-sm mb-5 tracking-wide">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-sm mb-5 tracking-wide">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919842766379"
                  className="flex items-start gap-3 group"
                >
                  <Phone size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#D8B9A3" }} />
                  <div>
                    <div className="font-inter text-sm group-hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                      +91 98427 66379
                    </div>
                    <div className="font-inter text-sm group-hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                      +91 63807 29431
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:gurusamyrasa@gmail.com"
                  className="flex items-start gap-3 group"
                >
                  <Mail size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#D8B9A3" }} />
                  <span className="font-inter text-sm group-hover:text-white transition-colors break-all" style={{ color: "rgba(255,255,255,0.6)" }}>
                    gurusamyrasa@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#D8B9A3" }} />
                  <span className="font-inter text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Rasa Office, Achankuttam – 627861, Tamil Nadu
                  </span>
                </div>
              </li>
            </ul>

            {/* CTA */}
            <a
              href="https://wa.me/919842766379?text=Hello%20Rasa%20Construction%2C%20I'm%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 btn-primary inline-flex text-sm py-2.5 px-5"
              style={{ background: "#25D366" }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Rasa Construction. All rights reserved. | Owner: Gurusamy A
          </p>
          <p className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Achankuttam, Tamil Nadu – 627861
          </p>
        </div>
      </div>
    </footer>
  );
}
