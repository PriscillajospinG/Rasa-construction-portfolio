/** All static company information — single source of truth */
export const company = {
  name:     "Rasa Construction",
  tagline:  "Building Strength. Delivering Trust.",
  owner:    "Gurusamy A",
  founded:  2010,
  location: {
    label:   "Achankuttam, Tamil Nadu",
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

  /** About section narrative */
  story: {
    headline:    "Built on site. Earned over years.",
    paragraphs: [
      "Rasa Construction was founded in 2010 by Gurusamy A, who began his career as a hands-on site contractor in the Tirunelveli region. What started as a small scaffolding supply operation grew through consistent delivery and word-of-mouth trust into one of the most relied-upon construction support services in South Tamil Nadu.",
      "Today we supply scaffolding, centring materials, vertical hoists, and expert concrete works to contractors, developers, and site engineers across Tirunelveli, Kanyakumari, Tenkasi, and Nagercoil districts. The business has grown, but the philosophy hasn't changed: show up when you say you will, supply what you promise, and own the outcome.",
    ],
    philosophy:  "We don't treat construction support as a transaction. When a contractor calls Rasa, they're getting equipment and experience — someone who's been on enough sites to know what actually goes wrong and how to prevent it.",
    ownerQuote:  "I started on site. I know what it means when equipment fails at pour time, or when scaffolding isn't plumb and work slows down. That's why we maintain what we supply and stand behind every rental.",
  },

  /** Why Choose Us — editorial list */
  differentiators: [
    {
      title:       "Owner-Operated",
      description: "Gurusamy sir is personally reachable on every project. No middlemen, no dropped calls.",
    },
    {
      title:       "Maintained Equipment",
      description: "Every scaffold tube, prop, and hoist is inspected before deployment. Failed inspection means replacement, not rental.",
    },
    {
      title:       "Honest Pricing",
      description: "Quoted price is final price. No hidden damage charges for normal wear, no inflated deposits.",
    },
    {
      title:       "Same-Day Response",
      description: "Emergency replacements within the district typically arrive within 4 hours of the call.",
    },
    {
      title:       "Safety First",
      description: "All scaffold setups follow IS code requirements. We don't let clients skip base plates or bracing to save time.",
    },
    {
      title:       "District Coverage",
      description: "Active across Tirunelveli, Kanyakumari, Tenkasi, and Nagercoil. We know the local terrain, conditions, and contractor community.",
    },
  ],

  /** Work process steps */
  process: [
    { step: "01", label: "Site Assessment",  desc: "We visit or discuss your project layout, floor count, and timeline before quoting." },
    { step: "02", label: "Equipment Plan",   desc: "We propose the right combination of scaffolding, centring, or hoist based on actual need." },
    { step: "03", label: "Scheduled Delivery", desc: "Equipment arrives on your confirmed start date — not whenever it's convenient for us." },
    { step: "04", label: "On-Site Setup",    desc: "Our crew handles erection, safety checks, and handover to your team." },
    { step: "05", label: "Active Support",   desc: "We remain reachable throughout your rental period for adjustments or replacements." },
    { step: "06", label: "Clean Takedown",   desc: "Timely disassembly and removal so your finishing work isn't delayed." },
  ],

  navLinks: [
    { label: "Home",         href: "#home" },
    { label: "About",        href: "#about" },
    { label: "Services",     href: "#services" },
    { label: "Equipment",    href: "#equipment" },
    { label: "Projects",     href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact",      href: "#contact" },
  ],
} as const;
