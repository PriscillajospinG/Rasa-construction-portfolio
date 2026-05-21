"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, ArrowUpRight, AlertTriangle } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { waLink } from "@/lib/utils";
import { listStagger, itemLeft, EASE_CINEMATIC } from "@/lib/animations";

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  contactPref: "phone" | "email";
};

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    contactPref: "phone",
  });
  const [status, setStatus] = useState<Status>("idle");

  const update = (k: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are not set.");
      setStatus("error");
      return;
    }

    const templateParams = {
      ...form,
      timestamp: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus("success");
    } catch (error) {
      console.error("EmailJS sending failed:", error);
      setStatus("error");
    }
  };

  const getWhatsAppMessage = () => {
    return `Hello Rasa Construction, I need site support.\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nMessage: ${form.message}`;
  };

  return (
    <section id="contact" style={{ background: "var(--clr-bg)" }} className="section relative overflow-hidden">
      <div className="container">

        {/* ... existing code ... */}

        {/* Right: Form panel */}
        <Reveal direction="right">
          {status === "success" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "var(--s12) 0", gap: "var(--s3)" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(8,51,53,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={36} color="var(--clr-primary)" />
              </div>
              <h3 className="t-h2" style={{ color: "var(--clr-primary)" }}>Enquiry Sent!</h3>
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
                    value={form.message} onChange={update("message")} />
                </div>
                <Button as="button" variant="dark" disabled={status === "sending"}
                  style={{ width: "100%", marginTop: "var(--s1)", justifyContent: "center" }}>
                  {status === "sending" ? "Sending..." : "Send Enquiry"}
                </Button>
              </form>
              {status === "error" && (
                <div className="mt-4 text-center">
                  <p className="t-sm text-red-600">Email could not be sent. Please send your enquiry on WhatsApp.</p>
                  <Button href={waLink(company.contact.whatsapp, getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" variant="dark" className="mt-2">
                    <MessageCircle size={15} /> Send on WhatsApp
                  </Button>
                </div>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
