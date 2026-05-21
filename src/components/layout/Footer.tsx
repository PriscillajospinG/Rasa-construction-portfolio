"use client";

import { Phone, Mail, MapPin, Share2, Globe, Link2, Send } from "lucide-react";
import RasaLogo from "@/components/ui/Logo";
import Reveal from "@/components/animations/Reveal";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { scrollTo, waLink } from "@/lib/utils";

const socials = [
  { Icon: Share2, href: "#", label: "Facebook" },
  { Icon: Link2,  href: "#", label: "Instagram" },
  { Icon: Globe,  href: "#", label: "YouTube" },
  { Icon: Send,   href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #030f10 0%, #051f21 100%)" }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(216,185,163,0.4), transparent)" }} />

      <Reveal direction="up" distance={24} duration={0.9} threshold="-40px">
      <div className="c" style={{ paddingBlock: "var(--s16)" }}>
        {/* 4-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "var(--s8)" }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)", marginBottom: "var(--s3)" }}>
              <RasaLogo size={44} color="#D8B9A3" />
              <div>
                <div className="font-m text-white" style={{ fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>RASA</div>
                <div className="t-label" style={{ color: "var(--clr-accent)", fontSize: "0.58rem", letterSpacing: "0.25em" }}>Construction</div>
              </div>
            </div>
            <p className="t-sm" style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: "var(--s4)" }}>
              Building strength and delivering trust through premium scaffolding, concrete works, and equipment rental across Tamil Nadu.
            </p>
            <div style={{ display: "flex", gap: "var(--s1)" }}>
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="transition-all duration-200 hover:scale-110"
                  style={{ width: "32px", height: "32px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(216,185,163,0.08)", border: "1px solid rgba(216,185,163,0.12)", color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D8B9A3"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(216,185,163,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(216,185,163,0.12)"; }}>
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="t-label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "var(--s4)" }}>Navigation</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--s2)" }}>
              {company.navLinks.map((l) => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.href)} className="t-sm link-underline transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="t-label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "var(--s4)" }}>Services</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--s2)" }}>
              {services.map((s) => (
                <li key={s.id}>
                  <span className="t-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{s.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="t-label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "var(--s4)" }}>Contact</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--s3)" }}>
              <li>
                <a href={`tel:${company.contact.primary.replace(/\s/g, "")}`} className="flex items-start gap-3 group">
                  <Phone size={14} style={{ color: "var(--clr-accent)", flexShrink: 0, marginTop: "2px" }} />
                  <div className="t-sm group-hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                    {company.contact.primary}<br />{company.contact.secondary}
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.contact.email}`} className="flex items-start gap-3 group">
                  <Mail size={14} style={{ color: "var(--clr-accent)", flexShrink: 0, marginTop: "2px" }} />
                  <span className="t-sm group-hover:text-white transition-colors break-all" style={{ color: "rgba(255,255,255,0.55)" }}>{company.contact.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={14} style={{ color: "var(--clr-accent)", flexShrink: 0, marginTop: "2px" }} />
                  <span className="t-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{company.location.full}</span>
                </div>
              </li>
            </ul>
            <a href={waLink(company.contact.whatsapp)} target="_blank" rel="noopener noreferrer"
              className="btn" style={{ marginTop: "var(--s4)", background: "#25D366", color: "white", padding: "0.6rem 1.25rem", borderRadius: "var(--r-sm)", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "var(--t-sm)", display: "inline-flex" }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      </Reveal>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="c" style={{ paddingBlock: "var(--s3)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--s2)" }}>
          <span className="t-sm" style={{ color: "rgba(255,255,255,0.22)" }}>
            © {new Date().getFullYear()} {company.name}. All rights reserved. Owner: {company.owner}
          </span>
          <span className="t-sm" style={{ color: "rgba(255,255,255,0.18)" }}>{company.location.full}</span>
        </div>
      </div>
    </footer>
  );
}
