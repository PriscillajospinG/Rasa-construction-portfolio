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
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left: Map and details */}
          <Reveal direction="left">
            <div className="contact-map-card">
              <div className="p-6 sm:p-8">
                <h3 className="font-m font-extrabold text-2xl text-white mb-4">
                  Visit / Locate Us
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-100">Rasa Construction</h4>
                    <p className="text-gray-400">{company.contact.address}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone size={20} className="text-[var(--clr-primary)]" />
                    <div>
                      <a href={`tel:${company.contact.primary}`} className="hover:text-white transition-colors">{company.contact.primary}</a>
                      <span className="mx-2">/</span>
                      <a href={`tel:${company.contact.secondary}`} className="hover:text-white transition-colors">{company.contact.secondary}</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail size={20} className="text-[var(--clr-primary)]" />
                    <a href={`mailto:${company.contact.email}`} className="hover:text-white transition-colors">{company.contact.email}</a>
                  </div>
                </div>
              </div>
              <div className="contact-map-frame-wrapper">
                <iframe
                  title="Rasa Construction location map"
                  src={company.contact.mapEmbedUrl}
                  className="contact-map-frame"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6 sm:p-8 mt-auto">
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
            {status === "success" ? (
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center text-center h-full justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 size={36} className="text-green-600" />
                </div>
                <h3 className="t-h2 text-gray-800">Enquiry Sent!</h3>
                <p className="t-sm text-gray-600">We will contact you within one business day.</p>
                <Button href={`tel:${(company.contact.primary ?? "").replace(/\s/g, "")}`} variant="primary" className="mt-6">
                  Or Call Now
                </Button>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
                <h3 className="font-m font-extrabold text-2xl text-gray-800 mb-1">
                  Request a Free Quote
                </h3>
                <p className="t-sm text-gray-500 mb-6">
                  We'll respond within one business day.
                </p>
                <form onSubmit={submit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="t-label block text-gray-600 mb-1.5 font-semibold">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" required placeholder="Your name"
                        className="inp-light w-full" value={form.name} onChange={update("name")} />
                    </div>
                    <div>
                      <label className="t-label block text-gray-600 mb-1.5 font-semibold">Phone <span className="text-red-500">*</span></label>
                      <input type="tel" required placeholder="+91 XXXXX XXXXX"
                        className="inp-light w-full" value={form.phone} onChange={update("phone")} />
                    </div>
                  </div>
                  <div>
                    <label className="t-label block text-gray-600 mb-1.5 font-semibold">Email</label>
                    <input type="email" placeholder="your@email.com"
                      className="inp-light w-full" value={form.email} onChange={update("email")} />
                  </div>
                  <div>
                    <label className="t-label block text-gray-600 mb-1.5 font-semibold">Service Required <span className="text-red-500">*</span></label>
                    <select required className="inp-light w-full" value={form.service} onChange={update("service")}>
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
                    <label className="t-label block text-gray-600 mb-1.5 font-semibold">Project Details</label>
                    <textarea rows={4} placeholder="Location, duration, scale, requirements..."
                      className="inp-light w-full resize-none"
                      value={form.message} onChange={update("message")} />
                  </div>
                  <Button as="button" variant="dark" disabled={status === "sending"}
                    className="w-full justify-center mt-2">
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
      </div>
    </section>
  );
}
