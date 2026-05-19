"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { company } from "@/data/company";
import { waLink } from "@/lib/utils";

type FormData = { name: string; phone: string; email: string; service: string; msg: string };

export default function Contact() {
  const [form,    setForm]    = useState<FormData>({ name: "", phone: "", email: "", service: "", msg: "" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      <Container section>

        {/* ── Full-bleed header band — dark, architectural ── */}
        <Reveal>
          <div style={{ borderRadius: "var(--r-xl)", padding: "var(--s6) var(--s8)", background: "linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))", marginBottom: "var(--s8)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--s4)", overflow: "hidden", position: "relative" }}>
            {/* Grid texture */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(216,185,163,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,163,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
            <div className="relative">
              <div className="eyebrow t-label" style={{ color: "var(--clr-accent)", marginBottom: "var(--s2)" }}>Get In Touch</div>
              <h2 className="t-h1 text-white" style={{ lineHeight: 1.05 }}>
                Let&apos;s build something<br /><em style={{ fontFamily: "'Montserrat',sans-serif", fontStyle: "italic", fontWeight: 800, color: "var(--clr-accent)" }}>great together.</em>
              </h2>
            </div>
            {/* Contact quick-access row */}
            <div className="relative" style={{ display: "flex", flexDirection: "column", gap: "var(--s2)" }}>
              <a href={`tel:${company.contact.primary.replace(/\s/g,"")}`}
                style={{ display: "flex", alignItems: "center", gap: "var(--s2)", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}>
                <Phone size={14} /> <span className="t-sm">{company.contact.primary}</span>
              </a>
              <a href={`tel:${company.contact.secondary.replace(/\s/g,"")}`}
                style={{ display: "flex", alignItems: "center", gap: "var(--s2)", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                <Phone size={14} /> <span className="t-sm">{company.contact.secondary}</span>
              </a>
              <a href={`mailto:${company.contact.email}`}
                style={{ display: "flex", alignItems: "center", gap: "var(--s2)", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                <Mail size={14} /> <span className="t-sm">{company.contact.email}</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── Body: 3-column layout — info | divider | form ── */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1px 3fr", gap: "var(--s8)", alignItems: "start" }}
          className="grid-cols-1 lg:grid-cols-[2fr_1px_3fr]">

          {/* Left: Contact details as editorial list */}
          <Reveal direction="left">
            <h3 className="font-m" style={{ fontWeight: 700, fontSize: "var(--t-h2)", color: "var(--clr-primary)", marginBottom: "var(--s6)" }}>
              Reach us directly
            </h3>

            {/* Contact items — list, not cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s4)" }}>
              {[
                { Icon: Phone,         label: "Primary",   val: company.contact.primary,    href: `tel:${company.contact.primary.replace(/\s/g,"")}` },
                { Icon: Phone,         label: "Alternate", val: company.contact.secondary,  href: `tel:${company.contact.secondary.replace(/\s/g,"")}` },
                { Icon: MessageCircle, label: "WhatsApp",  val: "Chat with us",             href: waLink(company.contact.whatsapp, "Hello Rasa Construction, I'd like a quote.") },
                { Icon: Mail,          label: "Email",     val: company.contact.email,      href: `mailto:${company.contact.email}` },
                { Icon: MapPin,        label: "Office",    val: company.location.full,      href: "#" },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group" style={{ display: "flex", alignItems: "flex-start", gap: "var(--s3)", textDecoration: "none", padding: "var(--s2) 0", borderBottom: "1px solid rgba(8,51,53,0.06)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "var(--r-md)", background: "rgba(8,51,53,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 200ms" }}
                    className="group-hover:[background:var(--clr-primary)]">
                    <Icon size={14} color="var(--clr-primary)" className="group-hover:!text-white" />
                  </div>
                  <div>
                    <div className="t-label" style={{ color: "var(--clr-text-lt)", marginBottom: "2px" }}>{label}</div>
                    <div className="t-sm" style={{ color: "var(--clr-text-md)", lineHeight: 1.5 }}>{val}</div>
                  </div>
                  <ArrowUpRight size={14} style={{ color: "var(--clr-text-lt)", marginLeft: "auto", opacity: 0, transition: "opacity 200ms" }} className="group-hover:opacity-100" />
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href={waLink(company.contact.whatsapp, "Hello Rasa Construction, I'd like a free quote.")}
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "var(--s1)", marginTop: "var(--s6)", background: "#25D366", color: "white", padding: "0.75rem 1.5rem", borderRadius: "var(--r-md)", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "var(--t-sm)", textDecoration: "none" }}>
              💬 WhatsApp Us
            </a>

            {/* Map — small, architectural */}
            <div style={{ marginTop: "var(--s6)", borderRadius: "var(--r-lg)", overflow: "hidden", height: "160px" }}>
              <iframe title="Rasa Construction location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31760!2d77.3!3d8.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMK0NS4wTiA3N8K0MDAuMEU!5e0!3m2!1sen!2sin!4v1000000"
                width="100%" height="160" style={{ border: 0, filter: "grayscale(25%) contrast(1.05)" }} loading="lazy" allowFullScreen />
            </div>
          </Reveal>

          {/* Vertical divider — desktop only */}
          <div className="hidden lg:block" style={{ background: "rgba(8,51,53,0.08)", width: "1px", alignSelf: "stretch" }} />

          {/* Right: Form panel */}
          <Reveal direction="right">
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "var(--s12) 0", gap: "var(--s3)" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(8,51,53,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={36} color="var(--clr-primary)" />
                </div>
                <h3 className="t-h2" style={{ color: "var(--clr-primary)" }}>Message Received</h3>
                <p className="t-sm" style={{ color: "var(--clr-text-lt)" }}>{company.owner} will contact you within 24 hours.</p>
                <Button href={`tel:${company.contact.primary.replace(/\s/g,"")}`} variant="primary" style={{ marginTop: "var(--s2)" }}>Or Call Now</Button>
              </div>
            ) : (
              <div>
                <h3 className="font-m" style={{ fontWeight: 800, fontSize: "var(--t-h2)", color: "var(--clr-primary)", marginBottom: "var(--s1)" }}>
                  Request a Free Quote
                </h3>
                <p className="t-sm" style={{ color: "var(--clr-text-md)", marginBottom: "var(--s6)" }}>
                  We'll respond within one business day.
                </p>
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--s3)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s2)" }}>
                    {[
                      { k: "name" as const,  label: "Full Name",  type: "text", required: true,  placeholder: "Your name" },
                      { k: "phone" as const, label: "Phone",      type: "tel",  required: true,  placeholder: "+91 XXXXX XXXXX" },
                    ].map(({ k, label, type, required, placeholder }) => (
                      <div key={k}>
                        <label className="t-label" style={{ display: "block", color: "var(--clr-text-md)", marginBottom: "6px", fontWeight: 600 }}>{label} {required && <span style={{ color: "var(--clr-primary)" }}>*</span>}</label>
                        <input type={type} required={required} placeholder={placeholder}
                          className="inp-light" value={form[k]} onChange={update(k)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="t-label" style={{ display: "block", color: "var(--clr-text-md)", marginBottom: "6px", fontWeight: 600 }}>Email</label>
                    <input type="email" placeholder="your@email.com"
                      className="inp-light" value={form.email} onChange={update("email")} />
                  </div>
                  <div>
                    <label className="t-label" style={{ display: "block", color: "var(--clr-text-md)", marginBottom: "6px", fontWeight: 600 }}>Service Required <span style={{ color: "var(--clr-primary)" }}>*</span></label>
                    <select required className="inp-light" value={form.service} onChange={update("service")}>
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
                    <label className="t-label" style={{ display: "block", color: "var(--clr-text-md)", marginBottom: "6px", fontWeight: 600 }}>Project Details</label>
                    <textarea rows={4} placeholder="Location, duration, scale, requirements..."
                      className="inp-light" style={{ resize: "none" }}
                      value={form.msg} onChange={update("msg")} />
                  </div>
                  <Button as="button" variant="dark" disabled={loading}
                    style={{ width: "100%", marginTop: "var(--s1)", justifyContent: "center" }}>
                    {loading
                      ? "Sending…"
                      : <><Send size={15} /> Send Message</>}
                  </Button>
                </form>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
