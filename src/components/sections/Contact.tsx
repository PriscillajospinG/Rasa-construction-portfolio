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
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left: Map and details */}
          <Reveal direction="left">
            <div className="contact-map-card">
              {/* Map Iframe */}
              <div className="contact-map-frame">
                <iframe
                  title="Rasa Construction location map"
                  src="https://www.google.com/maps?q=Rasa%20Office%20Achankuttam%20627861%20Tamil%20Nadu%20India&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Location Info */}
              <div className="contact-location-content">
                <div>
                  <p className="t-label text-[var(--clr-accent)]">Visit / Locate Us</p>
                  <h3 className="t-h2 text-white">Rasa Construction</h3>
                </div>
                <p className="text-gray-300" style={{ lineHeight: 1.65 }}>
                  {company.contact.address}
                </p>

                <div className="contact-location-links">
                  <a href={`tel:${company.contact.primary}`} className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors">
                    <Phone size={16} className="text-[var(--clr-accent)] flex-shrink-0" />
                    <span>{company.contact.primary} &nbsp;/&nbsp; {company.contact.secondary}</span>
                  </a>
                  <a href={`mailto:${company.contact.email}`} className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors">
                    <Mail size={16} className="text-[var(--clr-accent)] flex-shrink-0" />
                    <span>{company.contact.email}</span>
                  </a>
                </div>

                <Button
                  href={company.contact.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="w-full justify-center"
                >
                  <MapPin size={16} className="mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Right: Form panel */}
          <Reveal direction="right">
            <div className="contact-form-card">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 size={36} className="text-green-600" />
                  </div>
                  <h3 className="t-h2 text-gray-800">Enquiry Sent!</h3>
                  <p className="t-sm text-gray-600 mt-2">We will contact you within one business day.</p>
                  <Button href={`tel:${(company.contact.primary ?? "").replace(/\s/g, "")}`} variant="primary" className="mt-6">
                    Call Now
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-m font-extrabold text-2xl text-gray-800 mb-2">
                    Request a Free Quote
                  </h3>
                  <p className="t-sm text-gray-500 mb-6">
                    We&apos;ll respond within one business day.
                  </p>
                  <form onSubmit={submit} className="flex flex-col gap-4">
                    {/* ... form fields ... */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="contact-field">
                        <label className="t-label">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="Your name"
                          className="contact-input" value={form.name} onChange={update("name")} />
                      </div>
                      <div className="contact-field">
                        <label className="t-label">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" required placeholder="+91 XXXXX XXXXX"
                          className="contact-input" value={form.phone} onChange={update("phone")} />
                      </div>
                    </div>
                    <div className="contact-field">
                      <label className="t-label">Email</label>
                      <input type="email" placeholder="your@email.com"
                        className="contact-input" value={form.email} onChange={update("email")} />
                    </div>
                    <div className="contact-field">
                      <label className="t-label">Preferred Contact Method</label>
                      <div className="flex gap-6 mt-1">
                        <label className="flex items-center gap-2 t-sm text-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="contactPref"
                            value="phone"
                            checked={form.contactPref === "phone"}
                            onChange={update("contactPref")}
                            className="w-4 h-4 accent-[var(--clr-primary)] cursor-pointer"
                          />
                          <span>Phone / WhatsApp</span>
                        </label>
                        <label className="flex items-center gap-2 t-sm text-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="contactPref"
                            value="email"
                            checked={form.contactPref === "email"}
                            onChange={update("contactPref")}
                            className="w-4 h-4 accent-[var(--clr-primary)] cursor-pointer"
                          />
                          <span>Email</span>
                        </label>
                      </div>
                    </div>
                    <div className="contact-field">
                      <label className="t-label">Service Required <span className="text-red-500">*</span></label>
                      <select required className="contact-input" value={form.service} onChange={update("service")}>
                        <option value="">Select a service...</option>
                        <option value="scaffolding">Scaffolding Rental</option>
                        <option value="centring">Centring Materials</option>
                        <option value="concrete">Concrete Works</option>
                        <option value="hoist">Vertical Hoist Rental</option>
                        <option value="support">Site Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="contact-field">
                      <label className="t-label">Project Details</label>
                      <textarea rows={5} placeholder="Location, duration, scale, requirements..."
                        className="contact-input"
                        value={form.message} onChange={update("message")} />
                    </div>
                    <Button as="button" type="submit" variant="dark" disabled={status === "sending"}
                      className="w-full justify-center mt-3">
                      {status === "sending" && "Sending..."}
                      {status === "idle" && "Send Enquiry"}
                      {status === "error" && "Try Again / Send on WhatsApp"}
                    </Button>
                  </form>
                  {status === "error" && (
                    <div className="mt-4 text-center p-3 rounded-md bg-red-50 border border-red-200">
                      <p className="t-sm text-red-700 font-semibold">
                        {errorMessage}
                      </p>
                      <Button href={waLink(company.contact.whatsapp, getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" variant="dark" className="mt-3 inline-flex items-center gap-2">
                        <MessageCircle size={15} />
                        <span>Send on WhatsApp</span>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
