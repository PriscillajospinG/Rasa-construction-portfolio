import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { company } from "@/data/company";

const headingFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Rasa Construction",
  description: "Scaffolding, centring materials, concrete works, and vertical hoist rental services in Tamil Nadu.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
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
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">
        <PageWrapper>
          <Navbar />
          {children}
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}

