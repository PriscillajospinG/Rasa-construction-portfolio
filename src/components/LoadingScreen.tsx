"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RasaLogo from "@/components/RasaLogo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--s2)" }}
          >
            <RasaLogo size={64} color="#D8B9A3" />
            <div style={{ textAlign: "center" }}>
              <div className="font-m text-white" style={{ fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.015em" }}>
                RASA
              </div>
              <div className="t-label" style={{ color: "var(--clr-accent)", letterSpacing: "0.3em", marginTop: "2px" }}>
                Construction
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="loading-bar">
            <motion.div
              className="loading-bar-inner"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="t-label"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Building trust since 2010
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
