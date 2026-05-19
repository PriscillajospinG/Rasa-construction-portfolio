"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98427 66379",
    sub: "+91 63807 29431",
    href: "tel:+919842766379",
    color: "#083335",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with Us",
    sub: "Quick response guaranteed",
    href: "https://wa.me/919842766379?text=Hello%20Rasa%20Construction%2C%20I'm%20interested%20in%20your%20services.",
    color: "#25D366",
  },
  {
    icon: Mail,
    label: "Email",
    value: "gurusamyrasa@gmail.com",
    sub: "We reply within 24 hours",
    href: "mailto:gurusamyrasa@gmail.com",
    color: "#D8B9A3",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Rasa Office",
    sub: "Achankuttam – 627861",
    href: "#",
    color: "#083335",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: "#F7F5F2" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 50%, rgba(8,51,53,0.08) 0%, transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge mb-4 inline-flex"
            style={{ background: "rgba(8,51,53,0.08)", borderColor: "rgba(8,51,53,0.2)", color: "#083335" }}
          >
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-montserrat font-black text-4xl md:text-5xl mb-4"
            style={{ color: "#083335" }}
          >
            Let&apos;s Build Something
            <br />
            <span style={{ color: "#D8B9A3" }}>Great Together</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-inter text-base leading-relaxed mb-10" style={{ color: "#4a5568" }}>
              Whether you need scaffolding for a single floor or complete equipment rental for a multi-storey
              project, Rasa Construction is ready to serve you. Reach out for a free consultation and quote.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {contactMethods.map(({ icon: Icon, label, value, sub, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="group rounded-xl p-5 transition-all duration-300 hover-lift"
                  style={{
                    background: "white",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: color === "#25D366" ? "rgba(37,211,102,0.12)" : "rgba(8,51,53,0.08)" }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="font-poppins font-semibold text-sm" style={{ color: "#111827" }}>{label}</div>
                  <div className="font-inter text-sm mt-0.5" style={{ color: "#374151" }}>{value}</div>
                  <div className="font-inter text-xs mt-0.5" style={{ color: "#9ca3af" }}>{sub}</div>
                </motion.a>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
              style={{ height: "220px" }}
            >
              <iframe
                title="Rasa Construction Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31760.77345!2d77.3!3d8.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCc0NS4wIk4gNzcnMDAuMCJF!5e0!3m2!1sen!2sin!4v1000000000000"
                width="100%"
                height="220"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
                loading="lazy"
                allowFullScreen
              />
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl p-8 md:p-10"
            style={{ background: "linear-gradient(160deg, #051f21, #083335)" }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12 gap-4"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(216,185,163,0.15)" }}
                >
                  <CheckCircle2 size={40} style={{ color: "#D8B9A3" }} />
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-white">Message Received!</h3>
                <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Thank you for reaching out. Gurusamy sir will contact you within 24 hours.
                </p>
                <a href="tel:+919842766379" className="btn-primary mt-4">
                  Or Call Us Now
                </a>
              </motion.div>
            ) : (
              <>
                <h3 className="font-montserrat font-bold text-2xl text-white mb-2">
                  Request a Free Quote
                </h3>
                <p className="font-inter text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Fill out the form and we'll get back to you within one business day.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="input-field"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-poppins text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="input-field"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-poppins text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="input-field"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block font-poppins text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Service Required *
                    </label>
                    <select
                      required
                      className="input-field"
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="">Select a service...</option>
                      <option value="scaffolding">Scaffolding Rental</option>
                      <option value="centring">Centring Materials</option>
                      <option value="concrete">Concrete Works</option>
                      <option value="hoist">Vertical Hoist Rental</option>
                      <option value="support">Site Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-poppins text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project — location, duration, requirements..."
                      className="input-field resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center text-base py-4 mt-2"
                    style={{ opacity: loading ? 0.8 : 1 }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
