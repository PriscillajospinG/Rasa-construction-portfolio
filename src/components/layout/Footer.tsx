"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import RasaLogo from "@/components/ui/Logo";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { scrollTo } from "@/lib/utils";

export default function Footer() {
  const primaryPhone = company.contact?.primary ?? "";
  const secondaryPhone = company.contact?.secondary ?? "";
  const cleanPhone = (phone: string) => phone.replace(/\s/g, "");

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 footer-grid">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RasaLogo size="md" variant="light" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Founded in 2000, Rasa Construction has delivered 25+ years of reliable scaffolding, centring materials, vertical hoist rental, and concrete works across Tamil Nadu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {company.navLinks.map((l) => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.href)} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <span className="text-sm text-gray-400">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${cleanPhone(primaryPhone)}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    Call: {primaryPhone}
                  </a>
                  {secondaryPhone && (
                    <a href={`tel:${cleanPhone(secondaryPhone)}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                      Call: {secondaryPhone}
                    </a>
                  )}
                </div>
              </li>
              <li>
                <a href={`mailto:${company.contact.email}`} className="flex items-start gap-3 group">
                  <Mail size={16} className="text-gray-400 group-hover:text-white mt-1 transition-colors flex-shrink-0" />
                  <span className="text-sm text-gray-400 break-all group-hover:text-white transition-colors">Email Us</span>
                </a>
              </li>
              <li>
                <a href={company.contact.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <MapPin size={16} className="text-gray-400 group-hover:text-white mt-1 transition-colors flex-shrink-0" />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{company.contact.address}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10 my-12"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-gray-500">
            Designed & Developed by <a href="https://www.priscilla.co.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">Priscilla J</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
