"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          size === "sm" && "px-4 py-2 text-xs uppercase tracking-widest",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",

          variant === "default" && "bg-brand-500 text-white shadow-soft hover:bg-brand-600 hover:shadow-medium",
          variant === "gold" && "bg-brand-gold text-white shadow-soft hover:opacity-90 hover:shadow-medium",
          variant === "outline" && "border-2 border-brand-200 text-brand-500 hover:border-brand-500 hover:bg-brand-50",
          variant === "ghost" && "text-neutral-600 hover:bg-white/70 hover:text-brand-500",

          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
