"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, HardHat } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "glass-dark shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
        style={scrolled ? {} : { background: "linear-gradient(to bottom, rgba(5,31,33,0.8), transparent)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
            aria-label="Rasa Construction Home"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #D8B9A3, #c4a088)" }}
            >
              <HardHat size={20} color="#051f21" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="font-montserrat font-800 text-white text-lg tracking-tight"
                style={{ fontWeight: 800 }}
              >
                RASA
              </span>
              <span
                className="text-[10px] tracking-[0.25em] uppercase font-poppins"
                style={{ color: "#D8B9A3", fontWeight: 500 }}
              >
                Construction
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative px-4 py-2 text-sm font-poppins font-medium transition-colors duration-300 group"
                  style={{
                    color: activeSection === link.href.slice(1) ? "#D8B9A3" : "rgba(255,255,255,0.8)",
                    fontWeight: activeSection === link.href.slice(1) ? 600 : 400,
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-4 right-4 h-px transition-all duration-300 origin-left"
                    style={{
                      background: "#D8B9A3",
                      transform: activeSection === link.href.slice(1) ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919842766379"
              className="btn-primary text-sm py-2.5 px-5"
            >
              📞 Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: "white" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[99] flex"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            {/* Panel */}
            <div
              className="relative ml-auto w-72 h-full flex flex-col pt-20 px-8"
              style={{ background: "linear-gradient(160deg, #051f21, #083335)" }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                    onClick={() => scrollTo(link.href)}
                    className="text-left py-4 border-b font-poppins text-lg font-medium transition-colors"
                    style={{
                      borderColor: "rgba(216,185,163,0.15)",
                      color: activeSection === link.href.slice(1) ? "#D8B9A3" : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="tel:+919842766379"
                  className="btn-primary justify-center"
                >
                  📞 +91 98427 66379
                </a>
                <a
                  href="https://wa.me/919842766379"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline justify-center"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
