import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id:       "high-rise-scaffold",
    title:    "High-Rise Scaffolding Setup",
    category: "Scaffolding",
    location: "Tirunelveli, TN",
    image:    "/hero/hero.png",
    tall:     true,
  },
  {
    id:       "residential-concrete",
    title:    "Residential Complex – Concrete",
    category: "Concrete",
    location: "Achankuttam, TN",
    image:    "/projects/concrete.png",
    tall:     false,
  },
  {
    id:       "commercial-scaffold",
    title:    "Commercial Building Scaffold",
    category: "Scaffolding",
    location: "Tamil Nadu",
    image:    "/projects/scaffolding.png",
    tall:     false,
  },
  {
    id:       "multistorey-hoist",
    title:    "Vertical Hoist – Multistorey",
    category: "Hoist Rental",
    location: "Tirunelveli, TN",
    image:    "/projects/hoist.png",
    tall:     true,
  },
  {
    id:       "site-coordination",
    title:    "Site Support & Coordination",
    category: "Site Support",
    location: "Tamil Nadu",
    image:    "/team/about-team.png",
    tall:     false,
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;
