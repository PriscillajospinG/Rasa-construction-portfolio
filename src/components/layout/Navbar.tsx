"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import RasaLogo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useScroll } from "@/hooks/useScroll";
import { company } from "@/data/company";
import { scrollTo } from "@/lib/utils";

export default function Navbar() {
  const { isScrolled }    = useScroll(50);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Derive active section from scroll via simple check
  const go = (href: string) => {
    scrollTo(href);
    setActiveSection(href.slice(1));
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
          isScrolled
            ? { background: "rgba(5,31,33,0.93)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(216,185,163,0.10)", paddingBlock: "0.75rem" }
            : { background: "linear-gradient(to bottom, rgba(5,31,33,0.72), transparent)", paddingBlock: "1.25rem" }
        }
      >
        <div className="c" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Brand */}
          <button onClick={() => go("#home")} aria-label="Rasa Construction – Home">
            <div className="flex items-center gap-3 group">
              <RasaLogo size={40} color="#D8B9A3" className="transition-transform duration-300 group-hover:scale-105" />
              <div>
                <div className="font-m text-white" style={{ fontWeight: 900, fontSize: "1rem", letterSpacing: "-0.01em" }}>RASA</div>
                <div className="t-label" style={{ color: "var(--clr-accent)", fontSize: "0.58rem", letterSpacing: "0.25em" }}>Construction</div>
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {company.navLinks.map(({ label, href }) => {
              const active = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <button onClick={() => go(href)}
                    className="relative px-4 py-2 font-p text-sm transition-colors duration-200"
                    style={{ color: active ? "var(--clr-accent)" : "rgba(255,255,255,0.68)", fontWeight: active ? 600 : 400 }}>
                    {label}
                    {active && (
                      <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-4 right-4"
                        style={{ height: "1px", background: "var(--clr-accent)" }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="tel:+919842766379" variant="primary" size="sm">📞 Call Now</Button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" aria-label="Toggle menu" style={{ color: "white" }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex lg:hidden">
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setMenuOpen(false)} />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-auto w-72 h-full flex flex-col pt-20 px-6"
              style={{ background: "linear-gradient(160deg, #051f21, #083335)" }}>
              {company.navLinks.map(({ label, href }, i) => (
                <motion.button key={href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => go(href)} className="text-left py-4 font-p text-lg border-b"
                  style={{ borderColor: "rgba(216,185,163,0.10)", color: activeSection === href.slice(1) ? "var(--clr-accent)" : "rgba(255,255,255,0.72)", fontWeight: activeSection === href.slice(1) ? 600 : 400 }}>
                  {label}
                </motion.button>
              ))}
              <div style={{ marginTop: "var(--s6)", display: "flex", flexDirection: "column", gap: "var(--s2)" }}>
                <Button href="tel:+919842766379" variant="primary">📞 {company.contact.primary}</Button>
                <Button href={`https://wa.me/${company.contact.whatsapp}`} variant="ghost">💬 WhatsApp</Button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
