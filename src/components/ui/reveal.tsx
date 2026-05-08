"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
  amount = 0.1,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 48 : 0,
    x: direction === "left" ? 48 : direction === "right" ? -48 : 0,
  };

  const animate = isInView ? { opacity: 1, y: 0, x: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.9, delay, ease }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container — wrap with RevealGroup, children with RevealItem */

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export function RevealGroup({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  amount = 0.1,
}: RevealGroupProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
