import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { company } from "@/data/company";

const headingFont = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});
const siteUrl = "https://rasa-construction-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rasa Construction",
  description:
    "Rasa Construction provides scaffolding rental, centring materials, vertical hoist rental, concrete work support, and site material movement across South Tamil Nadu.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Rasa Construction",
    description:
      "Scaffolding, centring materials, vertical hoist rental and construction support across South Tamil Nadu.",
    url: siteUrl,
    siteName: "Rasa Construction",
    images: [
      {
        url: "/og-rasa-construction.png",
        width: 1200,
        height: 630,
        alt: "Rasa Construction company logo and services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasa Construction",
    description:
      "Scaffolding, centring materials, vertical hoist rental and construction support across South Tamil Nadu.",
    images: ["/og-rasa-construction.png"],
  },
  keywords: "Rasa Construction, scaffolding rental, centring materials, concrete works, vertical hoist rental, construction Tamil Nadu, Gurusamy A",
  authors: [{ name: company.name }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased ${headingFont.variable} ${bodyFont.variable}`}>
        <PageWrapper>
          <Navbar />
          {children}
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}

