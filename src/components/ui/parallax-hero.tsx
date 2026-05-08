"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ParallaxHero({
  title,
  subtitle,
  heroImageUrl,
  heroImageAlt,
}: ParallaxHeroProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-brand-100"
    >
      {/* ── Parallax background image ── */}
      <motion.div
        className="absolute inset-0 z-0 origin-top scale-[1.35]"
        style={{ y: bgY }}
      >
        <Image
          src={heroImageUrl}
          alt={heroImageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-50/90 via-brand-50/60 to-brand-50/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-50/70 via-transparent to-transparent" />
      </motion.div>

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 flex min-h-[100svh] items-center"
        style={{ y: textY, opacity }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 pb-32 pt-24 md:px-10">
          <div className="max-w-xl space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="eyebrow"
            >
              Estética consciente
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              className="text-[clamp(3.5rem,9vw,7rem)] font-medium leading-[1.03]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="text-lg leading-relaxed text-neutral-700 md:text-xl"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button asChild size="lg">
                <Link href="/contacto">Reserva una sesión</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/servicios">Explorar servicios</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Location badge (bottom-left) ── */}
      <motion.div
        className="absolute bottom-16 left-6 z-10 md:left-10"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1, ease }}
        style={{ opacity }}
      >
        <Card
          className="max-w-[220px] border border-brand-200/60 bg-white/90 p-6 shadow-medium backdrop-blur-sm"
          hover={false}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-800">
            Consultas personalizadas
          </p>
          <p className="mt-2 text-sm leading-snug text-neutral-500">
            Cali, Colombia · Presencial y Virtual
          </p>
        </Card>
      </motion.div>

      {/* ── Scroll indicator (bottom-right) ── */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-3 md:right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        style={{ opacity }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.25em] text-neutral-400"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="h-14 w-px origin-top bg-gradient-to-b from-neutral-400 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
