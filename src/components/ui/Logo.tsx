interface RasaLogoProps {
  size?:      number;
  color?:     string;
  className?: string;
}

/**
 * Rasa Construction architectural building mark.
 * Inline SVG — scales perfectly, recolorable via `color` prop.
 */
export default function RasaLogo({ size = 48, color = "#D8B9A3", className = "" }: RasaLogoProps) {
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
      <rect x="2"  y="4"  width="11" height="72" rx="1.5" stroke={color} strokeWidth="2.5" />
      <rect x="16" y="22" width="9"  height="54" rx="1.5" stroke={color} strokeWidth="2.5" />
      <rect x="47" y="22" width="9"  height="54" rx="1.5" stroke={color} strokeWidth="2.5" />
      <rect x="59" y="4"  width="11" height="72" rx="1.5" stroke={color} strokeWidth="2.5" />
      <path d="M25 58 C25 36 47 36 47 58" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
