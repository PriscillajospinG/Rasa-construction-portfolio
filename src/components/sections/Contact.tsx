"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, MessageCircle, Mail, MapPin, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { waLink } from "@/lib/utils";

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
  const [errorMessage, setErrorMessage] = useState("");

  const update = (k: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing");
      setErrorMessage("Please contact us directly on WhatsApp or call us.");
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          phone: form.phone,
          email: form.email || "Not provided",
          service: form.service,
          message: form.message,
          contact_pref: form.contactPref === "phone" ? "Phone / WhatsApp" : "Email",
          time: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        },
        publicKey
      );
      setStatus("success");
    } catch (error) {
      const err = error as { text?: string; status?: number; response?: { text?: string; status?: number }; message?: string; name?: string };
      const errorDetails = {
        text: err?.text || err?.response?.text || "",
        status: err?.status || err?.response?.status || "",
        message: err?.message || "",
        name: err?.name || "",
        raw: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      };

      console.error("EmailJS sending failed:", errorDetails);

      setErrorMessage("Email could not be sent. Please send your enquiry on WhatsApp.");
      setStatus("error");
    }
  };

  const getWhatsAppMessage = () => {
    const serviceLabel = {
      scaffolding: "Scaffolding Rental",
      centring: "Centring Materials",
      concrete: "Concrete Works",
      hoist: "Vertical Hoist Rental",
      support: "Site Support",
      other: "Other",
    }[form.service] || form.service || "Not selected";

    return `Hello Rasa Construction, I need site support.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Service: ${serviceLabel}
Preferred Contact Method: ${form.contactPref === "phone" ? "Phone / WhatsApp" : "Email"}
Message: ${form.message}`;
  };

  return (
    <section id="contact" className="section-with-bridge bridge-dark-to-cream section contact-section" style={{ backgroundColor: "#F4EFE7" }}>
      <div className="container">
        <div className="section-header">
          <Reveal>
            <p className="section-eyebrow" style={{ color: "#D8B9A3" }}>Contact</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ color: "#083335" }}>Request a Quote</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead" style={{ color: "#66706B" }}>
              Get in touch to check current inventory availability, delivery schedules, or custom service packages.
            </p>
          </Reveal>
        </div>

        <div className="bento-grid">
          {/* 1. Map Card (span 8) */}
          <Reveal direction="left" className="col-span-12 md:col-span-8 order-1">
            <div className="bento-card contact-card contact-map-card h-full" style={{ background: "#FFFFFF", color: "#162625", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="contact-map-frame relative w-full flex-grow">
                <iframe
                  title="Rasa Construction location map"
                  src="https://www.google.com/maps?q=Rasa%20Office%20Achankuttam%20627861%20Tamil%20Nadu%20India&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                <span className="text-[#162625] text-xs font-semibold flex items-center gap-2">
                  <MapPin size={14} style={{ color: "#083335", stroke: "#083335" }} />
                  Achankuttam, Tirunelveli district
                </span>
                <Button
                  href={company.contact.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  className="map-link"
                  style={{ background: "#D8B9A3", color: "#083335", borderColor: "#D8B9A3" }}
                >
                  Directions
                </Button>
              </div>
            </div>
          </Reveal>

          {/* 2. Contact Details Card (span 4) */}
          <Reveal direction="right" className="col-span-12 md:col-span-4 order-3 md:order-2">
            <div className="bento-card contact-card contact-details-card h-full" style={{ background: "#FFFFFF", color: "#162625", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="font-bold text-xs uppercase tracking-wider block mb-2" style={{ color: "#083335" }}>Direct Contact</span>
                <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ color: "#162625" }}>Get in touch directly</h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "#66706B" }}>
                  {company.contact.address}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4" style={{ borderColor: "rgba(8, 51, 53, 0.12)" }}>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#66706B" }}>Phone Numbers</span>
                  <a href={`tel:${company.contact.primary}`} className="flex items-center gap-2 transition-colors font-medium text-sm" style={{ color: "#162625" }}>
                    <Phone size={14} style={{ color: "#083335", stroke: "#083335" }} />
                    {company.contact.primary}
                  </a>
                  <a href={`tel:${company.contact.secondary}`} className="flex items-center gap-2 transition-colors font-medium text-sm" style={{ color: "#162625" }}>
                    <Phone size={14} style={{ color: "#083335", stroke: "#083335" }} />
                    {company.contact.secondary}
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#66706B" }}>Email Address</span>
                  <a href={`mailto:${company.contact.email}`} className="flex items-center gap-2 transition-colors font-medium text-sm" style={{ color: "#162625" }}>
                    <Mail size={14} style={{ color: "#083335", stroke: "#083335" }} />
                    {company.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3. Form Card (span 8) */}
          <Reveal direction="left" className="col-span-12 md:col-span-8 order-2 md:order-3">
            <div className="bento-card contact-form-card h-full" style={{ background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
              {status === "success" ? (
                <div className="flex flex-col items-center text-center h-full justify-center py-12 px-4 rounded-lg" style={{ background: "rgba(8, 51, 53, 0.08)", color: "#083335", border: "1px solid rgba(8, 51, 53, 0.18)" }}>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                     <CheckCircle2 size={36} className="text-green-600" />
                  </div>
                  <h3 className="t-h2 font-extrabold" style={{ color: "#083335" }}>Enquiry Sent!</h3>
                  <p className="t-sm mt-2" style={{ color: "#083335" }}>We will contact you within one business day.</p>
                  <Button href={`tel:${(company.contact.primary ?? "").replace(/\s/g, "")}`} variant="dark" className="mt-6">
                    Call Now
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-m font-extrabold text-2xl mb-1" style={{ color: "#162625" }}>
                    Request a Free Quote
                  </h3>
                  <p className="t-sm mb-6" style={{ color: "#66706B" }}>
                    We&apos;ll respond within one business day.
                  </p>
                  <form onSubmit={submit} className="flex-grow">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="contact-field">
                        <label className="t-label" style={{ color: "#162625", fontWeight: 700 }}>Full Name <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="Your name"
                          className="contact-input" value={form.name} onChange={update("name")} />
                      </div>
                      <div className="contact-field">
                        <label className="t-label" style={{ color: "#162625", fontWeight: 700 }}>Phone <span className="text-red-500">*</span></label>
                        <input type="tel" required placeholder="+91 XXXXX XXXXX"
                          className="contact-input" value={form.phone} onChange={update("phone")} />
                      </div>
                    </div>
                    <div className="contact-field">
                      <label className="t-label" style={{ color: "#162625", fontWeight: 700 }}>Email</label>
                      <input type="email" placeholder="your@email.com"
                        className="contact-input" value={form.email} onChange={update("email")} />
                    </div>
                    <div className="contact-field">
                      <label className="t-label" style={{ color: "#162625", fontWeight: 700 }}>Preferred Contact Method</label>
                      <div className="flex gap-6 mt-1">
                        <label className="flex items-center gap-2 t-sm cursor-pointer" style={{ color: "#162625" }}>
                          <input
                            type="radio"
                            name="contactPref"
                            value="phone"
                            checked={form.contactPref === "phone"}
                            onChange={update("contactPref")}
                            className="w-4 h-4 accent-[#083335] cursor-pointer"
                          />
                          <span>Phone / WhatsApp</span>
                        </label>
                        <label className="flex items-center gap-2 t-sm cursor-pointer" style={{ color: "#162625" }}>
                          <input
                            type="radio"
                            name="contactPref"
                            value="email"
                            checked={form.contactPref === "email"}
                            onChange={update("contactPref")}
                            className="w-4 h-4 accent-[#083335] cursor-pointer"
                          />
                          <span>Email</span>
                        </label>
                      </div>
                    </div>
                    <div className="contact-field">
                      <label className="t-label" style={{ color: "#162625", fontWeight: 700 }}>Service Required <span className="text-red-500">*</span></label>
                      <select required className="contact-input" value={form.service} onChange={update("service")} style={{ color: "#162625" }}>
                        <option value="" style={{ color: "#162625", background: "#FFFFFF" }}>Select a service...</option>
                        <option value="scaffolding" style={{ color: "#162625", background: "#FFFFFF" }}>Scaffolding Rental</option>
                        <option value="centring" style={{ color: "#162625", background: "#FFFFFF" }}>Centring Materials</option>
                        <option value="concrete" style={{ color: "#162625", background: "#FFFFFF" }}>Concrete Works</option>
                        <option value="hoist" style={{ color: "#162625", background: "#FFFFFF" }}>Vertical Hoist Rental</option>
                        <option value="support" style={{ color: "#162625", background: "#FFFFFF" }}>Site Support</option>
                        <option value="other" style={{ color: "#162625", background: "#FFFFFF" }}>Other</option>
                      </select>
                    </div>
                    <div className="contact-field">
                      <label className="t-label" style={{ color: "#162625", fontWeight: 700 }}>Project Details</label>
                      <textarea rows={4} placeholder="Location, duration, scale, requirements..."
                        className="contact-input"
                        value={form.message} onChange={update("message")} />
                    </div>
                    <Button as="button" type="submit" variant="dark" disabled={status === "sending"}
                      className="w-full justify-center mt-3 contact-submit" style={{ background: "#083335", color: "#FFFFFF" }}>
                      {status === "sending" && "Sending..."}
                      {status === "idle" && "Send Enquiry"}
                      {status === "error" && "Try Again / Send on WhatsApp"}
                    </Button>
                  </form>
                  {status === "error" && (
                    <div className="mt-4 text-center p-3 rounded-md contact-error-msg" style={{ background: "rgba(120, 35, 35, 0.08)", color: "#7A1F1F", border: "1px solid rgba(120, 35, 35, 0.18)" }}>
                      <p className="t-sm font-semibold" style={{ color: "#7A1F1F" }}>
                        {errorMessage}
                      </p>
                      <Button href={waLink(company.contact.whatsapp, getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" variant="primary" className="mt-3 inline-flex items-center gap-2 w-full justify-center whatsapp-link" style={{ background: "#D8B9A3", color: "#083335", borderColor: "#D8B9A3" }}>
                        <MessageCircle size={15} />
                        <span>Send on WhatsApp</span>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </Reveal>

          {/* 4. WhatsApp / Call Card (span 4) */}
          <Reveal direction="right" className="col-span-12 md:col-span-4 order-4">
            <div className="bento-card contact-card contact-details-card h-full" style={{ background: "#FFFFFF", color: "#162625", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="font-bold text-xs uppercase tracking-wider block mb-2" style={{ color: "#083335" }}>Instant Chat</span>
                <h3 className="text-xl font-bold mb-2 leading-tight" style={{ color: "#162625" }}>Need a quick response?</h3>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: "#66706B" }}>
                  Send a direct WhatsApp message to Gurusamy sir for instant material and rental availability.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  href={waLink(company.contact.whatsapp, getWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full justify-center gap-2 whatsapp-link"
                  style={{ background: "#D8B9A3", color: "#083335", borderColor: "#D8B9A3" }}
                >
                  <MessageCircle size={15} style={{ color: "#083335", stroke: "#083335" }} />
                  <span>Chat on WhatsApp</span>
                </Button>
                <Button
                  href={`tel:${company.contact.primary.replace(/\s/g, "")}`}
                  variant="outline"
                  className="w-full justify-center gap-2 secondary-link"
                  style={{ borderColor: "rgba(8, 51, 53, 0.18)", color: "#083335" }}
                >
                  <Phone size={14} style={{ color: "#083335", stroke: "#083335" }} />
                  <span>Call Gurusamy A</span>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
