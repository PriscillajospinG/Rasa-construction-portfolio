/** App-wide constants — pull from company.ts for business data */

export const SITE_URL       = "https://rasaconstruction.in";
export const DEFAULT_LOCALE = "en-IN";

export const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;

/** Maps service iconName strings (from data/services.ts) to Lucide component names */
export const ICON_MAP = {
  LayoutGrid:  "LayoutGrid",
  Layers:      "Layers",
  Blocks:      "Blocks",
  ArrowUpDown: "ArrowUpDown",
  HardHat:     "HardHat",
  Wrench:      "Wrench",
  Users:       "Users",
  Clock:       "Clock",
  ShieldCheck: "ShieldCheck",
  IndianRupee: "IndianRupee",
  Truck:       "Truck",
  Star:        "Star",
} as const;
