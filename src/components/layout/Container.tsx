import React from "react";

interface ContainerProps {
  children:   React.ReactNode;
  /** Adds section vertical padding via `.s` class */
  section?:   boolean;
  className?: string;
  style?:     React.CSSProperties;
  id?:        string;
  ref?:       React.Ref<HTMLDivElement>;
  as?:        keyof JSX.IntrinsicElements;
}

/**
 * The ONE container component used by every section.
 * Enforces: max-width 1280px, 80/48/20px horizontal padding (via CSS --container-px).
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  {
    children,
    section = false,
    className = "",
    style,
    id,
    as: Tag = "div",
  },
  ref
) {
  return (
    <Tag
      id={id}
      ref={ref as React.Ref<HTMLDivElement>}
      style={style}
      className={`c${section ? " s" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
});

export default Container;
