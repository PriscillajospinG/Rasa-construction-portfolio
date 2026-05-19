"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import RasaLogo from "@/components/RasaLogo";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Services",     href: "#services" },
  { label: "Projects",     href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const id  = navLinks[i].href.slice(1);
        const el  = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={
          scrolled
            ? {
                background:  "rgba(5,31,33,0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(216,185,163,0.10)",
                paddingBlock: "0.75rem",
              }
            : {
                background: "linear-gradient(to bottom, rgba(5,31,33,0.75), transparent)",
                paddingBlock: "1.25rem",
              }
        }
      >
        <div className="container flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => go("#home")} aria-label="Rasa Construction">
            <div className="flex items-center gap-3 group">
              <RasaLogo size={40} color="#D8B9A3" className="transition-transform duration-300 group-hover:scale-105" />
              <div>
                <div
                  className="font-montserrat text-white text-base tracking-tight"
                  style={{ fontWeight: 900, letterSpacing: "-0.01em" }}
                >
                  RASA
                </div>
                <div
                  className="label-editorial"
                  style={{ color: "#D8B9A3", fontSize: "0.6rem", letterSpacing: "0.22em" }}
                >
                  Construction
                </div>
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const active = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <button
                    onClick={() => go(href)}
                    className="relative px-4 py-2 font-poppins text-sm transition-colors duration-200"
                    style={{ color: active ? "#D8B9A3" : "rgba(255,255,255,0.70)", fontWeight: active ? 600 : 400 }}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-px"
                        style={{ background: "#D8B9A3" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919842766379" className="btn btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.8rem" }}>
              📞 Call Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
            style={{ color: "white" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="fixed inset-0 z-[99] flex lg:hidden"
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-auto w-72 h-full flex flex-col pt-20 px-6"
              style={{ background: "linear-gradient(160deg, #051f21, #083335)" }}
            >
              <div className="flex flex-col">
                {navLinks.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => go(href)}
                    className="text-left py-4 font-poppins text-lg border-b"
                    style={{
                      borderColor: "rgba(216,185,163,0.12)",
                      color: activeSection === href.slice(1) ? "#D8B9A3" : "rgba(255,255,255,0.75)",
                      fontWeight: activeSection === href.slice(1) ? 600 : 400,
                    }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <a href="tel:+919842766379" className="btn btn-primary justify-center">📞 +91 98427 66379</a>
                <a href="https://wa.me/919842766379" target="_blank" rel="noopener noreferrer" className="btn btn-ghost justify-center">💬 WhatsApp</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
