"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import RasaLogo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
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
        className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="container h-full flex items-center justify-between">
          
          {/* Logo - dynamically scales on scroll */}
          <button
            onClick={() => go("#home")}
            aria-label="Rasa Construction – Home"
            className="relative flex items-center h-full focus:outline-none"
          >
            <RasaLogo
              size={isScrolled ? "sm" : "md"}
              variant="light"
              className="transition-all duration-300"
            />
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-2">
            {company.navLinks.map(({ label, href }) => {
              const active = activeSection === href.slice(1);
              return (
                <li key={href} className="relative">
                  <button
                    onClick={() => go(href)}
                    className="relative px-4 py-2 font-p text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-300 focus:outline-none group"
                    style={{
                      color: active ? "var(--clr-accent)" : "rgba(255, 255, 255, 0.75)",
                    }}
                  >
                    {label}
                    {/* Editorial hover line */}
                    {!active && (
                      <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-[var(--clr-accent)] opacity-40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    {/* Architectural active indicator */}
                    {active && (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[var(--clr-accent)] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              variant="primary"
              size="sm"
              style={{
                borderRadius: "var(--r-sm)",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontSize: "0.72rem",
                boxShadow: "var(--sh-sm)",
              }}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 text-white/80 hover:text-white transition-colors relative focus:outline-none ${menuOpen ? "z-[1105]" : "z-[101]"}`}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
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
            className="fixed inset-0 z-[1100] flex lg:hidden"
          >
            {/* Backdrop blur */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative ml-auto w-full max-w-[320px] h-full flex flex-col pt-24 px-6 z-[1100] shadow-[var(--sh-xl)] border-l border-white/5 overflow-y-auto"
              style={{
                background: "linear-gradient(160deg, var(--clr-primary-dark), var(--clr-primary))",
              }}
            >
              {/* Subtle SVG grain overlay */}
              <div className="absolute inset-0 grain pointer-events-none opacity-5" aria-hidden />

              {/* Logo in drawer */}
              <div className="flex items-center mb-6 pb-4 border-b border-white/10">
                <RasaLogo size="sm" variant="light" />
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col">
                {company.navLinks.map(({ label, href }, i) => {
                  const active = activeSection === href.slice(1);
                  return (
                    <motion.button
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => go(href)}
                      className="flex items-center justify-between py-4 text-left font-p text-sm tracking-wider uppercase border-b transition-colors duration-300"
                      style={{
                        borderColor: "rgba(255,255,255,0.06)",
                        color: active ? "var(--clr-accent)" : "rgba(255,255,255,0.72)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      <span>{label}</span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-accent)]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Drawer Footer Connect details */}
              <div className="mt-auto pt-8 pb-6 flex flex-col gap-4">
                <span className="t-label text-white/30 text-[0.62rem] tracking-[0.2em] uppercase">Quick Connect</span>
                
                <a
                  href={`tel:${company.contact.primary.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors py-2 text-sm font-p tracking-wide"
                >
                  <PhoneCall size={14} className="text-[var(--clr-accent)]" />
                  <span>{company.contact.primary}</span>
                </a>
                
                <a
                  href={waLink(
                    company.contact.whatsapp,
                    `Hello Rasa Construction, I'm visiting your website and would like to get a quote.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors py-2 text-sm font-p tracking-wide"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--clr-accent)] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                
                {/* Brand small details */}
                <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-1 text-[11px] text-white/30 font-i">
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
