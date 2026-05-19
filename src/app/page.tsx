// ─────────────────────────────────────────────────────────
// app/page.tsx — Main page assembly
// All sections imported from their canonical locations.
// No logic lives here — purely compositional.
// ─────────────────────────────────────────────────────────
import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Services     from "@/components/sections/Services";
import Projects     from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Contact      from "@/components/sections/Contact";
import CTA          from "@/components/sections/CTA";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { company }  from "@/data/company";

export const metadata = {
  title:       `${company.name} | Scaffolding, Concrete & Hoist Rental – Tamil Nadu`,
  description: `${company.name} offers premium scaffolding rental, centring materials, concrete works, and vertical hoist rental across Tamil Nadu. Founded by ${company.owner}. Call ${company.contact.primary}.`,
  keywords:    "scaffolding rental, centring materials, vertical hoist, concrete works, Tamil Nadu, Tirunelveli, construction equipment",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <CTA />
      <Testimonials />
      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
