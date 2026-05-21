import React from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?:  Variant;
  size?:     Size;
  disabled?: boolean;
  children:  React.ReactNode;
  className?: string;
  style?:    React.CSSProperties;
}

interface ButtonAsAnchor extends ButtonBaseProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: never;
}

interface ButtonAsButton extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  as: "button";
}

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  dark:    "btn-dark",
  ghost:   "btn-ghost",
};

const sizeStyle: Record<Size, React.CSSProperties> = {
  sm:  { padding: "0.5rem 1.5rem",   fontSize: "0.8rem" },
  md:  { padding: "0.875rem 2rem",   fontSize: "0.875rem" },
  lg:  { padding: "1.1rem 2.5rem",   fontSize: "1rem" },
};

/**
 * Unified button/link component.
 * Renders as <a> by default, or <button> when as="button".
 * All variants inherit shared .btn hover/active transitions from globals.css.
 */
export default function Button({
  variant  = "primary",
  size     = "md",
  as,
  disabled,
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  const classes  = cx("btn", variantClass[variant], className);
  const combined = { ...sizeStyle[size], opacity: disabled ? 0.75 : 1, ...style };

  if (as === "button") {
    const { onClick, type, form, name, value, ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        type="submit"
        disabled={disabled}
        className={classes}
        style={combined}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      className={classes}
      style={combined}
      aria-disabled={disabled}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </a>
  );
}
