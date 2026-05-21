import React from "react";
import { cx } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "green";
  className?: string;
  style?:     React.CSSProperties;
}

const styles: Record<string, React.CSSProperties> = {
  light: { background: "rgba(216,185,163,0.12)", border: "1px solid rgba(216,185,163,0.25)", color: "var(--clr-accent)" },
  dark:  { background: "rgba(8,51,53,0.08)",     border: "1px solid rgba(8,51,53,0.15)",     color: "var(--clr-primary)" },
  green: { background: "rgba(37,211,102,0.12)",  border: "1px solid rgba(37,211,102,0.25)",  color: "#16a34a" },
};

export default function Badge({ children, variant = "dark", className, style }: BadgeProps) {
  return (
    <span
      className={cx("t-label", className)}
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "100px",
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
