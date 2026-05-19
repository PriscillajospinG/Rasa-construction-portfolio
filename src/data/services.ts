import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id:          "scaffolding",
    title:       "Scaffolding Rental",
    description: "Premium steel scaffolding — inspected, certified, and configured to your project's exact requirements. We handle full setup, safety checks, and takedown.",
    tag:         "Most Popular",
    iconName:    "LayoutGrid",
    image:       "/projects/scaffolding.png",
  },
  {
    id:          "centring",
    title:       "Centring Materials",
    description: "Steel props, plates, and beams for slab formwork and beam casting. Well-maintained, well-stocked, and ready when you need them.",
    tag:         "100+ Varieties",
    iconName:    "Layers",
  },
  {
    id:          "concrete",
    title:       "Concrete Works",
    description: "Expert execution of column casting, slab work, and structural concrete. Precision at every pour, every time.",
    tag:         "Expert Crew",
    iconName:    "Blocks",
  },
  {
    id:          "hoist",
    title:       "Vertical Hoist Rental",
    description: "Industrial material hoists that dramatically cut vertical transport time on site. Daily and monthly rental options available.",
    tag:         "Daily Rental",
    iconName:    "ArrowUpDown",
    image:       "/projects/hoist.png",
  },
  {
    id:          "support",
    title:       "Site Support",
    description: "On-call supervision, safety guidance, and equipment coordination — so you focus on building, not logistics.",
    tag:         "Full Coverage",
    iconName:    "HardHat",
  },
  {
    id:          "maintenance",
    title:       "Equipment Upkeep",
    description: "All rented equipment is regularly serviced. Fast-response technicians keep your project timeline intact.",
    tag:         "24/7 Response",
    iconName:    "Wrench",
  },
];
