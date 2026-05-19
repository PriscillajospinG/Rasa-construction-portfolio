"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
      className="whatsapp-float"
    >
      <a
        href="https://wa.me/919842766379?text=Hello%20Rasa%20Construction%2C%20I'm%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-3 overflow-hidden"
      >
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.9 }}
          whileHover={{ opacity: 1, x: 0, scale: 1 }}
          className="absolute right-16 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-poppins font-semibold pointer-events-none shadow-xl"
          style={{
            background: "linear-gradient(135deg, #051f21, #083335)",
            color: "white",
            border: "1px solid rgba(216,185,163,0.2)",
          }}
        >
          Chat with us!
          {/* Arrow */}
          <span
            className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
            style={{ background: "#083335" }}
          />
        </motion.div>

        {/* Button */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 8px 30px rgba(37,211,102,0.4)",
          }}
        >
          <MessageCircle size={26} color="white" fill="white" />
        </div>

        {/* Ping ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ background: "#25D366" }}
        />
      </a>
    </motion.div>
  );
}
