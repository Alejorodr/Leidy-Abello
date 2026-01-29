import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({
  children,
  className,
  hover = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-neutral-100 bg-white shadow-soft transition-all duration-300",
        hover && "hover:shadow-medium hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
