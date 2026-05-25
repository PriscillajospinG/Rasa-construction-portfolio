"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = "/images/owner.jpg";
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
    }
  }, []);

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
        
        {/* Section Header */}
        <div className="section-header mb-10">
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

        {/* Clean 2-column main grid */}
        <div className="contact-grid">
          
          {/* LEFT SIDE: Request Form and Contact Details */}
          <div className="contact-left flex flex-col">
            
            {/* Form Card */}
            <Reveal direction="left" className="w-full">
              <div className="contact-form-card">
                {status === "success" ? (
                  <div className="flex flex-col items-center text-center justify-center py-10 px-4 rounded-xl bg-[rgba(8,51,53,0.06)] border border-[rgba(8,51,53,0.1)] text-[#083335]">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle2 size={36} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold" style={{ color: "#083335" }}>Enquiry Sent!</h3>
                    <p className="text-sm mt-2" style={{ color: "#66706B" }}>We will contact you within one business day.</p>
                    <Button href={`tel:${(company.contact.primary ?? "").replace(/\s/g, "")}`} variant="dark" className="mt-6">
                      Call Now
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-extrabold text-2xl mb-1 text-[#162625]">
                      Request a Free Quote
                    </h3>
                    <p className="text-sm mb-6 text-[#66706B]">
                      We&apos;ll respond within one business day.
                    </p>
                    
                    <form onSubmit={submit} className="flex-grow flex flex-col gap-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="contact-field">
                          <label className="text-xs uppercase tracking-wider block mb-1.5 text-[#162625] font-bold">Full Name <span className="text-red-500">*</span></label>
                          <input type="text" required placeholder="Your name"
                            className="contact-input" value={form.name} onChange={update("name")} />
                        </div>
                        <div className="contact-field">
                          <label className="text-xs uppercase tracking-wider block mb-1.5 text-[#162625] font-bold">Phone <span className="text-red-500">*</span></label>
                          <input type="tel" required placeholder="+91 XXXXX XXXXX"
                            className="contact-input" value={form.phone} onChange={update("phone")} />
                        </div>
                      </div>
                      
                      <div className="contact-field">
                        <label className="text-xs uppercase tracking-wider block mb-1.5 text-[#162625] font-bold">Email</label>
                        <input type="email" placeholder="your@email.com"
                          className="contact-input" value={form.email} onChange={update("email")} />
                      </div>
                      
                      <div className="contact-field">
                        <label className="text-xs uppercase tracking-wider block mb-1.5 text-[#162625] font-bold">Preferred Contact Method</label>
                        <div className="flex gap-6 mt-1">
                          <label className="flex items-center gap-2 text-sm cursor-pointer text-[#162625] font-semibold">
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
                          <label className="flex items-center gap-2 text-sm cursor-pointer text-[#162625] font-semibold">
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
                        <label className="text-xs uppercase tracking-wider block mb-1.5 text-[#162625] font-bold">Service Required <span className="text-red-500">*</span></label>
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
                        <label className="text-xs uppercase tracking-wider block mb-1.5 text-[#162625] font-bold">Project Details</label>
                        <textarea rows={4} placeholder="Location, duration, scale, requirements..."
                          className="contact-input"
                          value={form.message} onChange={update("message")} />
                      </div>
                      
                      <Button as="button" type="submit" variant="dark" disabled={status === "sending"}
                        className="w-full justify-center mt-2 contact-submit" style={{ background: "#083335", color: "#FFFFFF" }}>
                        {status === "sending" && "Sending..."}
                        {status === "idle" && "Send Enquiry"}
                        {status === "error" && "Try Again / Send on WhatsApp"}
                      </Button>
                    </form>
                    
                    {status === "error" && (
                      <div className="mt-4 text-center p-3 rounded-md contact-error-msg" style={{ background: "rgba(120, 35, 35, 0.08)", color: "#7A1F1F", border: "1px solid rgba(120, 35, 35, 0.18)" }}>
                        <p className="text-sm font-semibold">{errorMessage}</p>
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

            {/* Contact Details Card below Form */}
            <Reveal direction="left" delay={0.05} className="w-full">
              <div className="contact-details-card">
                <h3>Visit / Locate Us</h3>
                <p>Rasa Construction</p>
                <p>Rasa Office, Achankuttam – 627861, Tamil Nadu, India</p>
                <a href="tel:+919842766379" className="contact-detail-link">
                  <Phone size={14} />
                  <span>+91 98427 66379</span>
                </a>
                <a href="tel:+916380729431" className="contact-detail-link">
                  <Phone size={14} />
                  <span>+91 63807 29431</span>
                </a>
                <a href="mailto:gurusamyrasa@gmail.com" className="contact-detail-link">
                  <Mail size={14} />
                  <span>gurusamyrasa@gmail.com</span>
                </a>
              </div>
            </Reveal>

          </div>

          {/* RIGHT SIDE: Owner Image Card and Map below it */}
          <div className="contact-right flex flex-col">
            
            {/* Owner Image Card */}
            <Reveal direction="right" className="w-full">
              <div className="contact-owner-card">
                {imageLoaded ? (
                  <Image
                    src="/images/owner.jpg"
                    alt="Gurusamy A from Rasa Construction"
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    className="contact-owner-image"
                  />
                ) : (
                  <div className="owner-placeholder-overlay">
                    <span className="owner-placeholder-text">
                      Owner image can be added here
                    </span>
                  </div>
                )}
                <div className="contact-owner-overlay" />
                <div className="contact-owner-content">
                  <p className="contact-owner-label">DIRECT PROJECT GUIDANCE</p>
                  <h3>Speak with Gurusamy A</h3>
                  <p className="contact-owner-line">
                    Call Gurusamy A — he will tell you exactly what the project requires.
                  </p>
                  <span>Rasa Construction • South Tamil Nadu</span>
                </div>
              </div>
            </Reveal>

            {/* Google Map below Owner Image Card */}
            <Reveal direction="right" delay={0.05} className="w-full">
              <div className="contact-map-card">
                <iframe
                  title="Rasa Construction location map"
                  src="https://www.google.com/maps?q=Rasa%20Office%20Achankuttam%20627861%20Tamil%20Nadu%20India&output=embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#FFFFFF", borderTop: "1px solid rgba(8, 51, 53, 0.08)" }}>
                  <span className="text-[#162625] text-xs font-semibold flex items-center gap-2">
                    <MapPin size={14} className="text-[#083335]" />
                    Achankuttam, Tamil Nadu
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

          </div>

        </div>

      </div>
    </section>
  );
}
