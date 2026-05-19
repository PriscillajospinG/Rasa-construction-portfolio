import React from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?:  Variant;
  size?:     Size;
  /** Renders as <button> instead of <a> */
  as?:       "button";
  disabled?: boolean;
  children:  React.ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  dark:    "btn-dark",
  ghost:   "btn-ghost",
};

const sizeStyle: Record<Size, React.CSSProperties> = {
  sm:  { padding: "0.5rem 1.25rem",  fontSize: "0.8rem" },
  md:  { padding: "0.875rem 2rem",   fontSize: "0.875rem" },
  lg:  { padding: "1.1rem 2.5rem",   fontSize: "1rem" },
};

export default function Button({
  variant  = "primary",
  size     = "md",
  as,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cx("btn", variantClass[variant], className);

  if (as === "button") {
    return (
      <button
        type="submit"
        disabled={disabled}
        className={classes}
        style={{ ...sizeStyle[size], opacity: disabled ? 0.75 : 1 }}
      >
        {children}
      </button>
    );
  }

  return (
    <a className={classes} style={sizeStyle[size]} {...props}>
      {children}
    </a>
  );
}
