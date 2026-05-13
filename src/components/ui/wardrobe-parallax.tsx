"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stages = [
  {
    number: "01",
    eyebrow: "Asesoría de imagen",
    title: "Tu imagen auténtica",
    description:
      "Descubrimos juntas tu paleta de colores, morfología y esencia para construir una imagen que te represente genuinamente.",
    imageUrl: "/images/Imagen-ref-Asesoria-de-imagen.png",
    imageAlt: "Asesoría de imagen personal — Leidy Abello",
    href: "/servicios",
  },
  {
    number: "02",
    eyebrow: "Asesoría de estilo",
    title: "Vestir con intención",
    description:
      "Aprendes a combinar prendas con propósito, eligiendo cada look como una extensión natural de tu identidad.",
    imageUrl: "/images/Imagen-ref-Asesoria-de-estilo.png",
    imageAlt: "Asesoría de estilo personal — Leidy Abello",
    href: "/servicios",
  },
  {
    number: "03",
    eyebrow: "Coach personal",
    title: "Tu transformación total",
    description:
      "Un acompañamiento profundo que integra imagen, autoestima y bienestar para mostrarte al mundo desde tu mejor versión.",
    imageUrl: "/images/Imagen-ref-Coach-personal.png",
    imageAlt: "Coaching personal de imagen — Leidy Abello",
    href: "/servicios",
  },
];

export function WardrobeParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const img0Opacity = useTransform(scrollYProgress, [0, 0.22, 0.33], [1, 1, 0]);
  const img1Opacity = useTransform(
    scrollYProgress,
    [0.22, 0.38, 0.55, 0.66],
    [0, 1, 1, 0],
  );
  const img2Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  const img0Scale = useTransform(scrollYProgress, [0, 0.33], [1.0, 1.05]);
  const img1Scale = useTransform(scrollYProgress, [0.22, 0.66], [0.96, 1.04]);
  const img2Scale = useTransform(scrollYProgress, [0.55, 1.0], [0.96, 1.03]);

  const text0Opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.33],
    [1, 1, 0],
  );
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.22, 0.38, 0.55, 0.66],
    [0, 1, 1, 0],
  );
  const text2Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  const text0Y = useTransform(scrollYProgress, [0, 0.33], ["0%", "-6%"]);
  const text1Y = useTransform(
    scrollYProgress,
    [0.22, 0.38, 0.55, 0.66],
    ["4%", "0%", "0%", "-6%"],
  );
  const text2Y = useTransform(scrollYProgress, [0.55, 0.7], ["4%", "0%"]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const dot0Scale = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0.5]);
  const dot1Scale = useTransform(
    scrollYProgress,
    [0.24, 0.38, 0.55, 0.65],
    [0.5, 1, 1, 0.5],
  );
  const dot2Scale = useTransform(scrollYProgress, [0.58, 0.72], [0.5, 1]);

  const dotScales = [dot0Scale, dot1Scale, dot2Scale];
  const imageOpacities = [img0Opacity, img1Opacity, img2Opacity];
  const imageScales = [img0Scale, img1Scale, img2Scale];
  const textOpacities = [text0Opacity, text1Opacity, text2Opacity];
  const textYs = [text0Y, text1Y, text2Y];

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-0 right-0 top-0 z-30 h-[2px] bg-brand-100">
          <motion.div
            className="h-full origin-left bg-brand-500"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="grid h-full grid-rows-[1fr_auto] md:grid-cols-[1fr_1fr] md:grid-rows-1">
          <div className="relative flex items-center overflow-hidden bg-brand-50">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.number}
                className="absolute inset-0 flex flex-col justify-center px-8 py-20 md:px-14 lg:px-20"
                style={{ opacity: textOpacities[i], y: textYs[i] }}
              >
                <p
                  className="select-none font-serif text-[clamp(6rem,14vw,11rem)] font-medium leading-none text-brand-100"
                  aria-hidden
                >
                  {stage.number}
                </p>

                <div className="mt-2 space-y-5">
                  <p className="eyebrow">{stage.eyebrow}</p>
                  <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight text-neutral-900">
                    {stage.title}
                  </h2>
                  <p className="max-w-sm text-base leading-relaxed text-neutral-600 md:text-lg">
                    {stage.description}
                  </p>
                  <div className="pt-2">
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href={stage.href}>Conocer más</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-10 left-8 z-10 flex items-center gap-3 md:left-14 lg:left-20">
              {stages.map((_, i) => (
                <motion.span
                  key={i}
                  className="block h-1.5 w-1.5 rounded-full bg-brand-400"
                  style={{ scale: dotScales[i] }}
                />
              ))}
            </div>

            <div className="absolute right-0 top-[15%] hidden h-[70%] w-px bg-gradient-to-b from-transparent via-brand-200 to-transparent md:block" />
          </div>

          <div className="relative overflow-hidden bg-brand-100">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.number}
                className="absolute inset-0"
                style={{ opacity: imageOpacities[i] }}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{ scale: imageScales[i] }}
                >
                  <Image
                    src={stage.imageUrl}
                    alt={stage.imageAlt}
                    fill
                    className="object-cover object-center"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </motion.div>
            ))}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-50/30 to-transparent md:block" />
          </div>
        </div>

        <div className="absolute right-6 top-8 z-20 hidden md:block">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400"
            style={{ writingMode: "vertical-rl" }}
          >
            Tu transformación
          </p>
        </div>
      </div>
    </div>
  );
}
