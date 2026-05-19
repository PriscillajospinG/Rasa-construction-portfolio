// ─────────────────────────────────────────────────────────
// app/page.tsx — Main page assembly
// All sections imported from their canonical locations.
// No logic lives here — purely compositional.
// ─────────────────────────────────────────────────────────
import Hero          from "@/components/sections/Hero";
import About         from "@/components/sections/About";
import WhyChooseUs   from "@/components/sections/WhyChooseUs";
import Services      from "@/components/sections/Services";
import Equipment     from "@/components/sections/Equipment";
import Process       from "@/components/sections/Process";
import Projects      from "@/components/sections/Projects";
import CTA           from "@/components/sections/CTA";
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

      {/* 2. About — company story, founder, differentiators */}
      <About />

      {/* 3. Why Choose Us — 6 operational differentiators */}
      <WhyChooseUs />

      {/* 4. Services — 3-tier layout with feature card */}
      <Services />

      {/* 5. Equipment — rental inventory grid */}
      <Equipment />

      {/* 6. Process — how we work timeline */}
      <Process />

      {/* 7. Projects — masonry gallery with filter */}
      <Projects />

      {/* 8. CTA — parallax mid-page call to action */}
      <CTA />

      {/* 9. Testimonials — 3-tier client reviews */}
      <Testimonials />

      {/* 10. Contact — form + contact list + map */}
      <Contact />

      {/* Floating WhatsApp button */}
      <WhatsAppFloat />
    </main>
  );
}
