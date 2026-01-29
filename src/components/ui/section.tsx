import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: "none" | "sm" | "md" | "lg";
}

export function Section({
  children,
  className,
  spacing = "md",
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: "py-0",
    sm: "py-12 md:py-16",
    md: "py-20 md:py-24",
    lg: "py-28 md:py-32",
  };

  return (
    <section
      className={cn(spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
