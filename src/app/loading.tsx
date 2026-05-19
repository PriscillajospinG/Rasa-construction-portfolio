// app/loading.tsx — Next.js App Router streaming loading UI
"use client";

import { motion, AnimatePresence } from "framer-motion";
import RasaLogo from "@/components/ui/Logo";
import { company } from "@/data/company";

export default function Loading() {
  return (
    <div className="loading-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--s2)" }}
      >
        <RasaLogo size={64} color="#D8B9A3" />
        <div style={{ textAlign: "center" }}>
          <div className="font-m text-white" style={{ fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.015em" }}>
            {company.name.split(" ")[0].toUpperCase()}
          </div>
          <div className="t-label" style={{ color: "var(--clr-accent)", letterSpacing: "0.3em", marginTop: "2px" }}>
            {company.name.split(" ")[1]}
          </div>
        </div>
      </motion.div>

      <div className="loading-bar">
        <motion.div
          className="loading-bar-inner"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </div>

      <p className="t-label" style={{ color: "rgba(255,255,255,0.22)" }}>
        Building trust since {company.founded}
      </p>
    </div>
  );
}
