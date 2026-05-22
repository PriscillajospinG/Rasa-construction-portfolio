// ─────────────────────────────────────────────────────────
// app/page.tsx — Main page assembly
// All sections imported from their canonical locations.
// No logic lives here — purely compositional.
// ─────────────────────────────────────────────────────────
import Hero          from "@/components/sections/Hero";
import Services      from "@/components/sections/Services";
import Projects      from "@/components/sections/Projects";
import Equipment     from "@/components/sections/Equipment";
import About         from "@/components/sections/About";
import Testimonials  from "@/components/sections/Testimonials";
import Contact       from "@/components/sections/Contact";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { company }   from "@/data/company";

export const metadata = {
  title:       `${company.name} | Scaffolding, Centring & Concrete Works – Tamil Nadu`,
  description: `${company.name} offers reliable scaffolding rental, centring materials, vertical hoist rental, and concrete works across Tamil Nadu. Led by ${company.owner}. Call ${company.contact.primary}.`,
  keywords:    "scaffolding rental Tamil Nadu, centring materials, vertical hoist rental, concrete works, Tirunelveli construction, Rasa Construction, Gurusamy A",
};

export default function Home() {
  return (
    <main>
      {/* 1. Hero — cinematic opening, identity + CTA */}
      <Hero />

      {/* 2. Services — 5-card layout under services we offer */}
      <Services />

      {/* 3. Projects — masonry gallery with filter */}
      <Projects />

      {/* 4. Equipment — rental inventory grid */}
      <Equipment />

      {/* 5. About — company story, founder, differentiators */}
      <About />

      {/* 6. Testimonials — 3-tier client reviews */}
      <Testimonials />

      {/* 7. Contact — form + contact list + map */}
      <Contact />

      {/* Floating WhatsApp button */}
      <WhatsAppFloat />
    </main>
  );
}
