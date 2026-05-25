"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import { useScroll } from "@/hooks/useScroll";
import { company } from "@/data/company";
import { scrollTo, waLink } from "@/lib/utils";

export default function Navbar() {
  const { isScrolled } = useScroll(50);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active section scroll tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "services", "equipment", "projects", "testimonials", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // triggers when section is in the active reading area
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href: string) => {
    scrollTo(href);
    setActiveSection(href.slice(1));
    setMenuOpen(false);
    
    // Temporarily ignore scroll observer updates while transitioning
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar ${isScrolled ? "navbar-scrolled" : ""} ${menuOpen ? "navbar-menu-open" : ""}`}
      >
        <div className="container navbar-inner">
          
          {/* Logo - static size per viewport */}
          <button
            onClick={() => go("#home")}
            aria-label="Rasa Construction – Home"
            className="logo-wrap relative flex items-center h-full focus:outline-none"
          >
            <Image
              src="/logos/rasa-logo-light.png"
              alt="Rasa Construction"
              width={110}
              height={38}
              priority
              className="navbar-logo-img"
            />
          </button>

          {/* RIGHT area: Nav links, CTA, and mobile hamburger */}
          <div className="nav-right">
            {/* Desktop Nav Links */}
            <ul className="nav-links">
              {company.navLinks.map(({ label, href }) => {
                const active = activeSection === href.slice(1);
                return (
                  <li key={href}>
                    <button
                      onClick={() => go(href)}
                      className={`nav-link focus:outline-none ${active ? "active" : ""}`}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Get a Quote CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              className="nav-cta"
            >
              Get a Quote
            </a>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`mobile-menu-button p-2 -mr-2 text-white/80 hover:text-white transition-colors relative focus:outline-none ${menuOpen ? "z-[1105]" : "z-[101]"}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-drawer fixed inset-0 z-[2000]"
          >
            {/* Backdrop cover */}
            <div
              className="absolute inset-0 bg-black/75"
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mobile-drawer-panel relative ml-auto h-full flex flex-col z-[1100] shadow-[var(--sh-xl)] border-l border-white/5 overflow-y-auto"
              style={{
                background: "#083335",
                width: "min(82vw, 340px)",
                padding: "20px 24px 32px",
              }}
            >
              {/* Subtle SVG grain overlay */}
              <div className="absolute inset-0 grain pointer-events-none opacity-5" aria-hidden />

              {/* ── Drawer Header: Logo + Close button ── */}
              <div
                className="mobile-drawer-header relative"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginBottom: "28px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <Image
                  src="/logos/rasa-logo-light.png"
                  alt="Rasa Construction"
                  width={110}
                  height={38}
                  priority
                  className="navbar-logo-img"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.70)",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Mobile Navigation Links ── */}
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {company.navLinks.map(({ label, href }, i) => {
                  const active = activeSection === href.slice(1);
                  return (
                    <motion.button
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => go(href)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        textAlign: "left",
                        padding: "14px 0",
                        fontSize: "0.82rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        transition: "color 0.3s",
                        color: active ? "var(--clr-accent)" : "rgba(255,255,255,0.72)",
                        fontWeight: active ? 600 : 400,
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <span>{label}</span>
                      {active && (
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--clr-accent)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                {/* Get a Quote — full-width CTA */}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); go("#contact"); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                    padding: "14px 18px",
                    borderRadius: "8px",
                    background: "var(--clr-accent)",
                    color: "var(--clr-primary-dark)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  Get a Quote
                </a>
              </nav>

              {/* ── Drawer Footer: Quick Connect ── */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "32px",
                  paddingBottom: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.60rem",
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  Quick Connect
                </span>

                <a
                  href={`tel:${company.contact.primary.replace(/\s/g, "")}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    padding: "6px 0",
                  }}
                >
                  <PhoneCall size={14} style={{ color: "var(--clr-accent)", flexShrink: 0 }} />
                  <span>{company.contact.primary}</span>
                </a>

                <a
                  href={waLink(
                    company.contact.whatsapp,
                    `Hello Rasa Construction, I'm visiting your website and would like to get a quote.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    padding: "6px 0",
                  }}
                >
                  <svg
                    style={{ width: "14px", height: "14px", color: "var(--clr-accent)", fill: "currentColor", flexShrink: 0 }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Brand small details */}
                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  <div>{company.location.full}</div>
                  <div>Established {company.founded} · Owner Gurusamy A</div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
