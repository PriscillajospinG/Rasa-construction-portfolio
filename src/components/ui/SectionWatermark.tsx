/**
 * SectionWatermark
 * ─────────────────────────────────────────────────────────────────
 * Renders huge faded text as a background watermark.
 * Position: absolute, covers the full section width.
 * pointer-events: none, user-select: none.
 *
 * Props:
 *   text    — the watermark word(s), e.g. "SERVICES" or "OUR JOURNEY"
 *   opacity — default 0.025
 *   align   — horizontal alignment: "left" | "center" | "right"
 *   variant — "light" | "dark"
 */

interface SectionWatermarkProps {
  text: string;
  opacity?: number;
  align?: "left" | "center" | "right";
  variant?: "light" | "dark";
  top?: string;
}

export default function SectionWatermark({
  text,
  opacity = 0.025,
  align = "right",
  variant = "light",
  top = "50%",
}: SectionWatermarkProps) {
  const color = variant === "dark" ? "#D8B9A3" : "#083335";

  const alignMap = {
    left: { left: "0", right: "auto", textAlign: "left" as const },
    center: { left: "50%", transform: "translateX(-50%)", textAlign: "center" as const },
    right: { right: "0", left: "auto", textAlign: "right" as const },
  };

  return (
    <div
      aria-hidden="true"
      className="section-watermark"
      style={{
        position: "absolute",
        top,
        transform: align === "center" ? `translateY(-50%) translateX(-50%)` : "translateY(-50%)",
        pointerEvents: "none",
        userSelect: "none",
        opacity,
        color,
        fontFamily: "var(--font-heading), serif",
        fontSize: "clamp(8rem, 18vw, 22rem)",
        fontWeight: 700,
        lineHeight: 0.85,
        letterSpacing: "-0.04em",
        whiteSpace: "nowrap",
        zIndex: 0,
        ...alignMap[align],
      }}
    >
      {text}
    </div>
  );
}
