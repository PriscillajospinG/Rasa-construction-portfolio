export interface WhyItem {
  id:          string;
  title:       string;
  description: string;
  stat?:       string;
  iconName:    string;
}

export const whyChooseUs: WhyItem[] = [
  {
    id:          "owner-involved",
    title:       "Owner-Involved in Every Project",
    description: "Gurusamy A is personally reachable on every job. You speak directly to the person responsible — not a booking agent or middlemen.",
    stat:        "Direct Access",
    iconName:    "UserCheck",
  },
  {
    id:          "maintained-equipment",
    title:       "Inspection-Grade Equipment",
    description: "Every item in our inventory is inspected after return and serviced before the next deployment. Bent tubes, worn threads, and faulty clamps are replaced — not rented.",
    stat:        "100+ Units",
    iconName:    "ShieldCheck",
  },
  {
    id:          "on-time-delivery",
    title:       "Delivery on Your Confirmed Date",
    description: "We don't push deliveries or ask you to 'wait a day.' When your start date is confirmed, equipment arrives on that date, erected and ready for handover.",
    stat:        "500+ Projects",
    iconName:    "Clock",
  },
  {
    id:          "honest-pricing",
    title:       "Transparent Pricing",
    description: "Your quoted price is your final price. No hidden charges at project end, no inflated damage costs for normal wear, no deposit surprises.",
    stat:        "No Hidden Fees",
    iconName:    "BadgeIndianRupee",
  },
  {
    id:          "safety-first",
    title:       "Safety Standards Enforced",
    description: "All scaffold setups follow IS code requirements. We never allow clients to skip base plates, diagonal bracing, or safety checks to save time — even when they ask.",
    stat:        "IS Code Compliant",
    iconName:    "HardHat",
  },
  {
    id:          "district-coverage",
    title:       "Coverage Across South Tamil Nadu",
    description: "Active across Tirunelveli, Kanyakumari, Tenkasi, and Nagercoil districts. We know local site conditions, material access, and contractor timelines in the region.",
    stat:        "4+ Districts",
    iconName:    "MapPin",
  },
];
