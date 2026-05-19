export interface EquipmentItem {
  id:          string;
  name:        string;
  description: string;
  /** What sizes/variants are available */
  variants?:   string;
  iconName:    string;
}

export const equipment: EquipmentItem[] = [
  {
    id:          "scaffold-tubes",
    name:        "Scaffold Tubes & Clamps",
    description: "MS tubular steel scaffolding — 48.3mm diameter, available in multiple lengths. Used for modular scaffolding systems on any structure height.",
    variants:    "2m, 3m, 4m, 6m lengths",
    iconName:    "Columns",
  },
  {
    id:          "scaffold-frames",
    name:        "Scaffold Frame Sets",
    description: "Walk-through and narrow frame systems for clean facade access and interior scaffold setups. Load-tested and structurally verified.",
    variants:    "Standard & walk-through frames",
    iconName:    "LayoutGrid",
  },
  {
    id:          "centring-props",
    name:        "Adjustable Steel Props",
    description: "Telescopic steel props (acrow props) for slab and beam shuttering support. Thread-checked before every deployment.",
    variants:    "2m–4m adjustable range",
    iconName:    "AlignVerticalJustifyCenter",
  },
  {
    id:          "ms-plates",
    name:        "MS Shuttering Plates",
    description: "Mild steel plates for slab and beam formwork. Available in standard sizes for efficient layout planning.",
    variants:    "0.9m × 0.6m, 1.2m × 0.6m, 1.2m × 0.9m",
    iconName:    "Layers",
  },
  {
    id:          "h-frames",
    name:        "H-Frames & Channel Sections",
    description: "Steel H-frames and channel sections used to bridge centring spans and support large slab areas. Reused and maintained regularly.",
    variants:    "Standard & heavy-duty",
    iconName:    "Minus",
  },
  {
    id:          "vertical-hoist",
    name:        "Electric Vertical Hoist",
    description: "Industrial material hoists for efficient vertical transport on multi-floor construction sites. Capacities up to 500 kg per trip.",
    variants:    "Daily & monthly rental",
    iconName:    "ArrowUpDown",
  },
  {
    id:          "base-plates",
    name:        "Base Plates & U-Jacks",
    description: "Scaffold base plates for stable footing on uneven surfaces. U-jacks for adjustable top connections to ledgers and transoms.",
    variants:    "150mm, 200mm base plates",
    iconName:    "Square",
  },
  {
    id:          "couplers",
    name:        "Scaffold Couplers & Accessories",
    description: "Right-angle couplers, swivel couplers, sleeve couplers, and putlog couplers. All accessories maintained and replaced when worn.",
    variants:    "Full coupler range",
    iconName:    "Settings",
  },
];
