import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rasa Construction | Scaffolding, Concrete Works & Hoist Rental",
  description: "Rasa Construction provides premium scaffolding rental, centring materials, concrete works, and vertical hoist rental services. Trusted by builders across Tamil Nadu. Contact: +91 98427 66379.",
  keywords: "Rasa Construction, scaffolding rental, centring materials, concrete works, vertical hoist rental, construction company Tamil Nadu, Gurusamy A",
  authors: [{ name: "Rasa Construction" }],
  openGraph: {
    title: "Rasa Construction | Building Strength. Delivering Trust.",
    description: "Premium construction services – Scaffolding, Centring Materials, Concrete Works & Vertical Hoist Rental.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
