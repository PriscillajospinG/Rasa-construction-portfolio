export interface ProcessStep {
  step:  string;
  label: string;
  desc:  string;
}

export const processSteps: ProcessStep[] = [
  {
    step:  "01",
    label: "Site Requirement Discussion",
    desc:  "We talk through your project — floor count, construction type, material quantities, and timeline — before anything moves. No guesswork, no generic packages.",
  },
  {
    step:  "02",
    label: "Material & Work Planning",
    desc:  "We recommend the right scaffolding system, centring configuration, or hoist type for your specific site. Equipment is reserved and confirmed.",
  },
  {
    step:  "03",
    label: "Delivery & Setup",
    desc:  "Equipment is delivered on your agreed date. Our crew handles erection and safety checks — handover happens only when everything is verified.",
  },
  {
    step:  "04",
    label: "Execution & Site Coordination",
    desc:  "We stay available throughout your rental period. Adjustments, reconfigurations, and replacements are handled without delay.",
  },
  {
    step:  "05",
    label: "Completion & Takedown",
    desc:  "When your work is complete, we disassemble and remove all equipment promptly so your finishing and cladding work isn't held up.",
  },
];
