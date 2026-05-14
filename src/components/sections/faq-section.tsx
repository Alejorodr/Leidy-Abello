"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CaretDown } from "@/components/ui/icons";

const FAQS = [
  {
    q: "¿Las sesiones son presenciales o virtuales?",
    a: "Ofrezco ambas modalidades. Las sesiones presenciales se realizan en Cali, Colombia, y las virtuales a través de videollamada para clientes de cualquier parte del mundo.",
  },
  {
    q: "¿Necesito tener un estilo definido para empezar?",
    a: "Para nada. Muchas personas llegan sin saber qué quieren ni qué les sienta bien. Comenzamos desde donde estás, sin juicios y con todo el tiempo que necesites.",
  },
  {
    q: "¿Cuánto tiempo dura el proceso?",
    a: "Depende del servicio. Una sesión de asesoría puede durar entre 2 y 4 horas, mientras que un proceso de acompañamiento completo se desarrolla a lo largo de varias semanas.",
  },
  {
    q: "¿Hacen shopping juntas?",
    a: "Sí. El personal shopping incluye acompañamiento real en tiendas físicas o en línea, con una guía clara de qué buscar, dónde y por qué, siempre respetando tu presupuesto.",
  },
  {
    q: "¿Cuánto cuesta una asesoría?",
    a: "Los precios varían según el tipo de servicio y la duración. Escríbeme y te preparo una propuesta personalizada según tus necesidades y posibilidades.",
  },
  {
    q: "¿Qué pasa si no me gusta el resultado?",
    a: "Trabajamos juntas hasta que sientas que el proceso te representa genuinamente. Mi compromiso es que salgas con herramientas reales y una imagen auténticamente tuya.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-brand-500"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg font-medium text-neutral-900">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-brand-400"
        >
          <CaretDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-neutral-600">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="bg-brand-50">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left: heading */}
          <Reveal direction="right" className="space-y-6 lg:sticky lg:top-32">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">
              Todo lo que quieres saber
            </h2>
            <p className="leading-relaxed text-neutral-600">
              Si tienes una pregunta que no está aquí, escríbeme con confianza.
              Cada consulta merece una respuesta honesta.
            </p>
          </Reveal>

          {/* Right: accordion */}
          <Reveal direction="left" delay={0.1}>
            <div
              className={cn(
                "divide-y divide-neutral-100 rounded-[32px] border border-neutral-100 bg-white px-8 shadow-soft",
              )}
            >
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  faq={faq}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
