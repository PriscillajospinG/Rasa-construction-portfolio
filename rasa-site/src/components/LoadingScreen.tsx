"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardHat } from "lucide-react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 18 + 5;
      });
    }, 120);

    const timer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="loading-screen"
        >
          {/* Background radial */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, #083335 0%, #030f10 70%)",
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(216,185,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Animated logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-2 border-dashed"
                style={{ borderColor: "rgba(216,185,163,0.3)" }}
              />
              <div
                className="absolute inset-2 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #D8B9A3, #c4a088)" }}
              >
                <HardHat size={28} color="#051f21" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div
                className="font-montserrat font-black text-4xl text-white tracking-tight"
              >
                RASA
              </div>
              <div
                className="font-poppins text-xs tracking-[0.35em] uppercase mt-1"
                style={{ color: "#D8B9A3" }}
              >
                Construction
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="loading-bar"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #083335, #D8B9A3, #083335)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.2s linear infinite",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-inter text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Building Strength · Delivering Trust
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
