// Rasa Construction — Architectural Building Logo
// Inline SVG for perfect scaling at any size

export default function RasaLogo({
  size = 48,
  color = "#D8B9A3",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rasa Construction logo"
    >
      {/* Left outer tall column */}
      <rect x="2"  y="4"  width="11" height="72" rx="1.5" stroke={color} strokeWidth="2.5" />
      {/* Left inner shorter column */}
      <rect x="16" y="22" width="9"  height="54" rx="1.5" stroke={color} strokeWidth="2.5" />
      {/* Right inner shorter column */}
      <rect x="47" y="22" width="9"  height="54" rx="1.5" stroke={color} strokeWidth="2.5" />
      {/* Right outer tall column */}
      <rect x="59" y="4"  width="11" height="72" rx="1.5" stroke={color} strokeWidth="2.5" />
      {/* Arch connecting inner columns — architectural gateway */}
      <path
        d="M25 58 C25 36 47 36 47 58"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
