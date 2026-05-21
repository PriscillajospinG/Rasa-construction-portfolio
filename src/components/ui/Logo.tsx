import Image from "next/image";

interface RasaLogoProps {
  size?: number | "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
  className?: string;
  color?: string; // Kept for backward compatibility
}

/**
 * Rasa Construction brand logo.
 * Uses Next.js Image component to load the cropped transparent logo assets.
 */
export default function RasaLogo({
  size = "md",
  variant = "light",
  className = "",
}: RasaLogoProps) {
  let width = 94;
  let height = 54;

  if (typeof size === "number") {
    // Treat numeric size as height and calculate width using the 1.74 aspect ratio
    height = size;
    width = Math.round(size * 1.74);
  } else {
    const sizes = {
      sm: { width: 70, height: 40 },
      md: { width: 94, height: 54 },
      lg: { width: 129, height: 74 },
      xl: { width: 278, height: 160 },
    };
    const current = sizes[size] || sizes.md;
    width = current.width;
    height = current.height;
  }

  const logoSrc = variant === "light" ? "/logos/rasa-logo-flat-light.png" : "/logos/rasa-logo-flat-dark.png";

  return (
    <div className={`relative flex items-center ${className}`} style={{ height: `${height}px` }}>
      <Image
        src={logoSrc}
        alt="Rasa Construction Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
        style={{ width: "auto", height: `${height}px` }}
      />
    </div>
  );
}
