"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { company } from "@/data/company";
import { waLink } from "@/lib/utils";

const contactItems = [
  { Icon: Phone,         label: "Call Us",    val: company.contact.primary, sub: company.contact.secondary, href: `tel:${company.contact.primary.replace(/\s/g,"")}` },
  { Icon: MessageCircle, label: "WhatsApp",   val: "Chat with us",          sub: "Quick response",           href: waLink(company.contact.whatsapp) },
  { Icon: Mail,          label: "Email",      val: company.contact.email,   sub: "Reply within 24 hrs",      href: `mailto:${company.contact.email}` },
  { Icon: MapPin,        label: "Location",   val: "Rasa Office",           sub: company.location.pincode,   href: "#" },
];

type FormData = { name: string; phone: string; email: string; service: string; msg: string };

export default function Contact() {
  const [form,    setForm]    = useState<FormData>({ name: "", phone: "", email: "", service: "", msg: "" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // swap with EmailJS
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: "var(--clr-bg)" }} className="relative overflow-hidden">
      <Container section>
        <Reveal style={{ marginBottom: "var(--s12)" }}>
          <SectionTitle eyebrow="Get In Touch"
            heading={<>Let&apos;s build something<br /><em className="t-italic">great together.</em></>} />
        </Reveal>

        {/* 2-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "var(--s12)", alignItems: "start" }}
          className="grid-cols-1 lg:grid-cols-[1fr_1.15fr]">

          {/* Left — info */}
          <Reveal direction="left">
            <p className="t-body" style={{ color: "var(--clr-text-md)", marginBottom: "var(--s6)", maxWidth: "400px" }}>
              Whether you need scaffolding for a single floor or complete equipment rental for a multi-storey project, we're ready to help. Reach out for a free consultation.
            </p>

            {/* 2x2 contact cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s2)", marginBottom: "var(--s6)" }}>
              {contactItems.map(({ Icon, label, val, sub, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card group" style={{ padding: "var(--s3)", textDecoration: "none" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,51,53,0.07)", marginBottom: "var(--s2)", transition: "transform 300ms var(--ease)" }} className="group-hover:scale-110">
                    <Icon size={17} color="var(--clr-primary)" />
                  </div>
                  <div className="font-p" style={{ fontWeight: 600, fontSize: "var(--t-sm)", color: "var(--clr-text)" }}>{label}</div>
                  <div className="t-sm" style={{ color: "var(--clr-text-md)", marginTop: "1px" }}>{val}</div>
                  <div className="t-sm" style={{ color: "var(--clr-text-lt)", marginTop: "1px" }}>{sub}</div>
                </a>
              ))}
            </div>

            {/* Map */}
            <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden", height: "200px" }}>
              <iframe title="Rasa Construction location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31760!2d77.3!3d8.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMK0NS4wTiA3N8K0MDAuMEU!5e0!3m2!1sen!2sin!4v1000000" width="100%" height="200" style={{ border: 0, filter: "grayscale(20%)" }} loading="lazy" allowFullScreen />
            </div>
          </Reveal>

          {/* Right — form panel */}
          <Reveal direction="right">
            <div style={{ borderRadius: "var(--r-xl)", padding: "var(--s8)", background: "linear-gradient(160deg, var(--clr-primary-dark), var(--clr-primary))" }}>
              {sent ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "var(--s12) 0", gap: "var(--s3)" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(216,185,163,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle2 size={36} color="var(--clr-accent)" />
                  </div>
                  <h3 className="t-h2 text-white">Message Received!</h3>
                  <p className="t-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{company.owner} will contact you within 24 hours.</p>
                  <Button href={`tel:${company.contact.primary.replace(/\s/g,"")}`} variant="primary" style={{ marginTop: "var(--s2)" }}>Or Call Now</Button>
                </div>
              ) : (
                <>
                  <h3 className="t-h2 text-white" style={{ marginBottom: "var(--s1)" }}>Request a Free Quote</h3>
                  <p className="t-sm" style={{ color: "rgba(255,255,255,0.42)", marginBottom: "var(--s6)" }}>We'll get back to you within one business day.</p>
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--s3)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s2)" }}>
                      <div>
                        <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.48)", marginBottom: "var(--s1)" }}>Full Name *</label>
                        <input type="text" required placeholder="Your name" className="inp" value={form.name} onChange={update("name")} />
                      </div>
                      <div>
                        <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.48)", marginBottom: "var(--s1)" }}>Phone *</label>
                        <input type="tel" required placeholder="+91 XXXXX XXXXX" className="inp" value={form.phone} onChange={update("phone")} />
                      </div>
                    </div>
                    <div>
                      <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.48)", marginBottom: "var(--s1)" }}>Email</label>
                      <input type="email" placeholder="your@email.com" className="inp" value={form.email} onChange={update("email")} />
                    </div>
                    <div>
                      <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.48)", marginBottom: "var(--s1)" }}>Service Required *</label>
                      <select required className="inp" value={form.service} onChange={update("service")}>
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
                      <label className="t-label" style={{ display: "block", color: "rgba(255,255,255,0.48)", marginBottom: "var(--s1)" }}>Project Details</label>
                      <textarea rows={4} placeholder="Location, duration, requirements..." className="inp" style={{ resize: "none" }} value={form.msg} onChange={update("msg")} />
                    </div>
                    <Button as="button" variant="primary" disabled={loading} style={{ width: "100%", marginTop: "var(--s1)" }}>
                      {loading ? "Sending…" : <><Send size={15} /> Send Message</>}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
