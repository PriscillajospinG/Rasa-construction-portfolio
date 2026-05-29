/**
 * BlueprintBg
 * ─────────────────────────────────────────────────────────────────
 * Renders a subtle blueprint-style SVG background.
 * Place inside a `position: relative` container.
 * The SVG is absolutely positioned, pointer-events: none.
 *
 * Props:
 *   variant — "light" (dark lines on light bg) | "dark" (light lines on dark bg)
 *   opacity — overall opacity, default 0.045
 */

interface BlueprintBgProps {
  variant?: "light" | "dark";
  opacity?: number;
}

export default function BlueprintBg({
  variant = "light",
  opacity = 0.045,
}: BlueprintBgProps) {
  const lineColor = variant === "dark"
    ? "rgba(216,185,163,1)"    // accent on dark bg
    : "rgba(8,51,53,1)";       // brand green on light bg

  return (
    <div
      className="blueprint-layer"
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Fine 40px grid */}
          <pattern id={`grid-sm-${variant}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={lineColor}
              strokeWidth="0.4"
            />
          </pattern>
          {/* Major 200px grid */}
          <pattern id={`grid-lg-${variant}`} width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill={`url(#grid-sm-${variant})`} />
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke={lineColor}
              strokeWidth="0.9"
            />
          </pattern>
        </defs>

        {/* Grid fill */}
        <rect width="100%" height="100%" fill={`url(#grid-lg-${variant})`} />

        {/* Corner mark — top-left */}
        <g stroke={lineColor} strokeWidth="1.2" fill="none">
          <line x1="20" y1="20" x2="60" y2="20" />
          <line x1="20" y1="20" x2="20" y2="60" />
          <circle cx="20" cy="20" r="3" />
        </g>

        {/* Corner mark — top-right */}
        <g stroke={lineColor} strokeWidth="1.2" fill="none">
          <line x1="calc(100% - 20px)" y1="20" x2="calc(100% - 60px)" y2="20" />
          <line x1="calc(100% - 20px)" y1="20" x2="calc(100% - 20px)" y2="60" />
          <circle cx="calc(100% - 20px)" cy="20" r="3" />
        </g>

        {/* Bottom measurement rule */}
        <g stroke={lineColor} strokeWidth="0.7" fill="none">
          <line x1="20" y1="calc(100% - 18px)" x2="calc(100% - 20px)" y2="calc(100% - 18px)" />
          {/* Tick marks */}
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pct) => (
            <line
              key={pct}
              x1={`${pct}%`}
              y1="calc(100% - 24px)"
              x2={`${pct}%`}
              y2="calc(100% - 14px)"
              strokeWidth={pct % 50 === 0 ? 1.2 : 0.6}
            />
          ))}
        </g>

        {/* Left vertical measurement rule */}
        <g stroke={lineColor} strokeWidth="0.7" fill="none">
          <line x1="18" y1="20" x2="18" y2="calc(100% - 20px)" />
          {[0, 25, 50, 75, 100].map((pct) => (
            <line
              key={pct}
              x1="12"
              y1={`${pct}%`}
              x2="24"
              y2={`${pct}%`}
              strokeWidth={pct % 50 === 0 ? 1.2 : 0.6}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
