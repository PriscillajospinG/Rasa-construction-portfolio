/** All static company information — single source of truth */
export const company = {
  name:     "Rasa Construction",
  tagline:  "Building Strength. Delivering Trust.",
  owner:    "Gurusamy A",
  founded:  2010,
  location: {
    label:   "Rasa Office, Achankuttam",
    pincode: "627861",
    state:   "Tamil Nadu",
    full:    "Rasa Office, Achankuttam – 627861, Tamil Nadu",
  },
  contact: {
    primary:   "+91 98427 66379",
    secondary: "+91 63807 29431",
    email:     "gurusamyrasa@gmail.com",
    whatsapp:  "919842766379",
  },
  stats: [
    { value: "15+",  label: "Years" },
    { value: "500+", label: "Projects" },
    { value: "100+", label: "Equipment" },
    { value: "300+", label: "Clients" },
  ],
  navLinks: [
    { label: "Home",         href: "#home" },
    { label: "About",        href: "#about" },
    { label: "Services",     href: "#services" },
    { label: "Projects",     href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact",      href: "#contact" },
  ],
} as const;
