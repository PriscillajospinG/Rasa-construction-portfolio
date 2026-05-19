"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

const contactCards = [
  { icon: Phone,         label: "Call Us",   val: "+91 98427 66379",      sub: "+91 63807 29431",       href: "tel:+919842766379",     accent: "var(--clr-primary)" },
  { icon: MessageCircle, label: "WhatsApp",  val: "Chat with us",         sub: "Quick response",        href: "https://wa.me/919842766379", accent: "#25D366" },
  { icon: Mail,          label: "Email",     val: "gurusamyrasa@gmail.com", sub: "Reply within 24 hrs",  href: "mailto:gurusamyrasa@gmail.com", accent: "var(--clr-accent-dk)" },
  { icon: MapPin,        label: "Location",  val: "Rasa Office",          sub: "Achankuttam – 627861",  href: "#",                     accent: "var(--clr-primary)" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      <div className="c s" ref={ref}>

        {/* Header */}
        <div style={{ marginBottom: "var(--s12)" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="eyebrow t-label" style={{ color: "var(--clr-primary)", marginBottom: "var(--s3)" }}>
            Get In Touch
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
            className="t-h1" style={{ color: "var(--clr-primary)" }}>
            Let&apos;s build something<br /><em className="t-italic">great together.</em>
          </motion.h2>
        </div>

        {/* 2-column: info + form */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "var(--s12)", alignItems: "start" }}
          className="grid-cols-1 lg:grid-cols-[1fr_1.15fr]">

          {/* Left — contact info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            <p className="t-body" style={{ color: "var(--clr-text-md)", marginBottom: "var(--s6)", maxWidth: "400px" }}>
              Whether you need scaffolding for a single floor or complete equipment rental for a multi-storey project, we're ready to help. Reach out for a free consultation and quote.
            </p>

            {/* Contact cards — 2x2 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s2)", marginBottom: "var(--s6)" }}>
              {contactCards.map(({ icon: Icon, label, val, sub, href, accent }, i) => (
                <motion.a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }}
                  className="card group" style={{ padding: "var(--s3)", textDecoration: "none" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,51,53,0.07)", marginBottom: "var(--s2)", transition: "transform 300ms var(--ease)" }} className="group-hover:scale-110">
                    <Icon size={17} color={accent} />
                  </div>
                  <div className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-sm)", color: "var(--clr-text)", marginBottom: "2px" }}>{label}</div>
                  <div className="t-sm" style={{ color: "var(--clr-text-md)" }}>{val}</div>
                  <div className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "1px" }}>{sub}</div>
                </motion.a>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55 }}
              style={{ borderRadius: "var(--r-lg)", overflow: "hidden", height: "200px" }}>
              <iframe
                title="Rasa Construction map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31760.773!2d77.3!3d8.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMK0NS4wTiA3N8K0MDAuMEU!5e0!3m2!1sen!2sin!4v1000000000"
                width="100%" height="200" style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }} loading="lazy" allowFullScreen
              />
            </motion.div>
          </motion.div>

          {/* Right — form panel */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ borderRadius: "var(--r-xl)", padding: "var(--s8)", background: "linear-gradient(160deg, var(--clr-primary-dark), var(--clr-primary))" }}>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "var(--s12) 0", gap: "var(--s3)" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(216,185,163,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={36} color="var(--clr-accent)" />
                </div>
                <h3 className="t-h2 text-white">Message Received!</h3>
                <p className="t-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Gurusamy sir will contact you within 24 hours.</p>
                <a href="tel:+919842766379" className="btn btn-primary" style={{ marginTop: "var(--s2)" }}>Or Call Now</a>
              </div>
            ) : (
              <>
                <h3 className="t-h2 text-white" style={{ marginBottom: "var(--s1)" }}>Request a Free Quote</h3>
                <p className="t-sm" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "var(--s6)" }}>
                  We'll get back to you within one business day.
                </p>
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--s3)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s2)" }}>
                    <div>
                      <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.50)", marginBottom: "var(--s1)" }}>Full Name *</label>
                      <input type="text" required placeholder="Your name" className="inp" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.50)", marginBottom: "var(--s1)" }}>Phone *</label>
                      <input type="tel" required placeholder="+91 XXXXX XXXXX" className="inp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.50)", marginBottom: "var(--s1)" }}>Email</label>
                    <input type="email" placeholder="your@email.com" className="inp" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.50)", marginBottom: "var(--s1)" }}>Service Required *</label>
                    <select required className="inp" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
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
                    <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.50)", marginBottom: "var(--s1)" }}>Project Details</label>
                    <textarea rows={4} placeholder="Location, duration, requirements..." className="inp" style={{ resize: "none" }} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} />
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "var(--s1)", opacity: loading ? 0.8 : 1 }}>
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "var(--s1)" }}>
                        <span style={{ width: "16px", height: "16px", border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%" }} className="animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: "var(--s1)" }}>
                        <Send size={15} /> Send Message
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
