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
  let width = 86;
  let height = 54;

  if (typeof size === "number") {
    // Treat numeric size as height and calculate width using the 1.60 aspect ratio
    height = size;
    width = Math.round(size * 1.60);
  } else {
    const sizes = {
      sm: { width: 64, height: 40 },
      md: { width: 86, height: 54 },
      lg: { width: 118, height: 74 },
      xl: { width: 256, height: 160 },
    };
    const current = sizes[size] || sizes.md;
    width = current.width;
    height = current.height;
  }

  // light variant = white text → use on dark backgrounds (navbar, loading screen)
  // dark variant  = dark text  → use on light backgrounds (footer)
  const logoSrc =
    variant === "light"
      ? "/logos/rasa-logo-light.png"
      : "/logos/rasa-logo-dark.png";

  return (
    <div className={`relative flex items-center ${className}`} style={{ height: `${height}px` }}>
      <Image
        src={logoSrc}
        alt="Rasa Construction Logo"
        width={width}
        height={height}
        priority
        className="object-contain nav-logo-img"
        style={{ height: "100%", width: "auto" }}
      />
    </div>
  );
}
