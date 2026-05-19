import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title:       `${company.name} | Scaffolding, Concrete Works & Hoist Rental – Tamil Nadu`,
  description: `${company.name} provides premium scaffolding rental, centring materials, concrete works, and vertical hoist rental. Trusted by builders across Tamil Nadu. Contact: ${company.contact.primary}.`,
  keywords:    "Rasa Construction, scaffolding rental, centring materials, concrete works, vertical hoist rental, construction Tamil Nadu, Gurusamy A",
  authors:     [{ name: company.name }],
  openGraph: {
    title:       `${company.name} | Building Strength. Delivering Trust.`,
    description: "Premium construction services – Scaffolding, Centring Materials, Concrete Works & Vertical Hoist Rental.",
    type:        "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
