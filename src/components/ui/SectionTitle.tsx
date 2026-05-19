import React from "react";

interface SectionTitleProps {
  eyebrow:   string;
  heading:   React.ReactNode;
  /** Optional body copy below heading */
  body?:     React.ReactNode;
  align?:    "left" | "center";
  /** "light" = dark text on light bg, "dark" = white text on dark bg */
  theme?:    "light" | "dark";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  heading,
  body,
  align   = "left",
  theme   = "light",
  className,
}: SectionTitleProps) {
  const isDark     = theme === "dark";
  const isCenter   = align === "center";
  const eyeColor   = isDark ? "var(--clr-accent)" : "var(--clr-primary)";
  const headColor  = isDark ? "white"              : "var(--clr-primary)";
  const bodyColor  = isDark ? "rgba(255,255,255,0.55)" : "var(--clr-text-md)";

  return (
    <div
      className={className}
      style={{ textAlign: isCenter ? "center" : "left" }}
    >
      {/* Eyebrow label with rule */}
      <div
        className="eyebrow t-label"
        style={{
          color: eyeColor,
          justifyContent: isCenter ? "center" : "flex-start",
          marginBottom: "var(--s3)",
        }}
      >
        {eyebrow}
      </div>

      {/* Heading */}
      <h2 className="t-h1" style={{ color: headColor, maxWidth: isCenter ? "600px" : undefined, marginInline: isCenter ? "auto" : undefined }}>
        {heading}
      </h2>

      {/* Optional body */}
      {body && (
        <p
          className="t-body"
          style={{
            color:     bodyColor,
            marginTop: "var(--s3)",
            maxWidth:  "520px",
            marginInline: isCenter ? "auto" : undefined,
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}
