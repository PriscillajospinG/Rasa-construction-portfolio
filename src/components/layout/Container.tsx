import React from "react";

interface ContainerProps {
  children:   React.ReactNode;
  /** Adds section vertical padding via `.s` class */
  section?:   boolean;
  className?: string;
  id?:        string;
  as?:        keyof JSX.IntrinsicElements;
}

/**
 * The ONE container component used by every section.
 * Enforces: max-width 1280px, 80/48/20px horizontal padding (via CSS --container-px).
 */
export default function Container({
  children,
  section = false,
  className = "",
  id,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag id={id} className={`c${section ? " s" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
