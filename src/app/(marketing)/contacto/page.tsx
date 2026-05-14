import { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  WhatsappLogo,
  InstagramLogo,
  CalendarBlank,
  EnvelopeSimple,
} from "@/components/ui/icons";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SiteSettings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Contacto | Leidy Abello",
  description:
    "Escríbeme por WhatsApp, Instagram, correo o agenda una sesión directamente.",
};

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  const social = settings?.social;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const channels = [
    social?.whatsapp && {
      icon: <WhatsappLogo size={24} weight="fill" />,
      color: "bg-[#25D366]/10 text-[#25D366]",
      border: "border-[#25D366]/20 hover:border-[#25D366]/50",
      title: "WhatsApp",
      desc: "Respuesta rápida en horario de atención. La forma más directa de hablar.",
      cta: "Escribir ahora",
      href: `https://wa.me/${social.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hola Leidy, me gustaría conocer más sobre tus servicios.")}`,
      external: true,
    },
    social?.instagram && {
      icon: <InstagramLogo size={24} weight="fill" />,
      color: "bg-pink-50 text-pink-500",
      border: "border-pink-100 hover:border-pink-300",
      title: "Instagram",
      desc: "Sígueme y envíame un DM para consultas rápidas o para ver mi trabajo.",
      cta: "Ir al perfil",
      href: social.instagram,
      external: true,
    },
    calendlyUrl && {
      icon: <CalendarBlank size={24} weight="fill" />,
      color: "bg-brand-50 text-brand-500",
      border: "border-brand-200 hover:border-brand-400",
      title: "Agendar sesión",
      desc: "Reserva directamente un espacio de 30 minutos sin costo para conocernos.",
      cta: "Ver disponibilidad",
      href: calendlyUrl,
      external: true,
    },
    social?.email && {
      icon: <EnvelopeSimple size={24} weight="fill" />,
      color: "bg-neutral-100 text-neutral-600",
      border: "border-neutral-200 hover:border-neutral-400",
      title: "Correo electrónico",
      desc: "Para propuestas formales, colaboraciones o preguntas detalladas.",
      cta: "Enviar correo",
      href: `mailto:${social.email}`,
      external: false,
    },
  ].filter(Boolean) as {
    icon: React.ReactNode;
    color: string;
    border: string;
    title: string;
    desc: string;
    cta: string;
    href: string;
    external: boolean;
  }[];

  return (
    <Section spacing="sm">
      <Container className="space-y-16">
        {/* Header */}
        <Reveal direction="up" className="max-w-3xl space-y-6">
          <p className="eyebrow">Contacto</p>
          <h1 className="font-serif text-4xl font-medium md:text-6xl">
            Conversemos
          </h1>
          <p className="text-xl leading-relaxed text-neutral-600">
            Elige el canal que más te acomode. Cada mensaje es bienvenido y
            recibe una respuesta amorosa y personalizada.
          </p>
        </Reveal>

        {/* Contact channels */}
        {channels.length > 0 && (
          <RevealGroup
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.08}
          >
            {channels.map((ch) => (
              <RevealItem key={ch.title}>
                <Link
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  className="group block h-full"
                >
                  <Card
                    className={`flex h-full flex-col gap-4 border p-6 transition-all ${ch.border}`}
                    hover={true}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${ch.color}`}
                    >
                      {ch.icon}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <p className="font-serif text-lg font-medium">
                        {ch.title}
                      </p>
                      <p className="text-sm leading-relaxed text-neutral-500">
                        {ch.desc}
                      </p>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors group-hover:text-brand-500">
                      {ch.cta} →
                    </p>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {/* Form + questionnaire */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal direction="right">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-medium">
                O déjame un mensaje
              </h2>
              <p className="text-neutral-500">
                Te contactaré con una propuesta personalizada para iniciar tu
                proceso.
              </p>
              <div className="pt-2">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="space-y-8">
              <Card
                className="space-y-8 border-brand-100 bg-brand-50/30 p-8 md:p-10"
                hover={false}
              >
                <div>
                  <h2 className="text-2xl font-medium">
                    Cuestionario extendido
                  </h2>
                  <p className="mt-4 leading-relaxed text-neutral-600">
                    Estas preguntas nos ayudan a entender mejor tu momento
                    actual y diseñar un acompañamiento personalizado desde el
                    primer encuentro.
                  </p>
                </div>
                <div className="space-y-6 text-sm italic text-neutral-500">
                  <p>
                    &ldquo;¿Cómo describirías tu relación actual con tu
                    imagen?&rdquo;
                  </p>
                  <p>
                    &ldquo;¿Qué emociones quieres cultivar al mirarte al
                    espejo?&rdquo;
                  </p>
                  <p>
                    &ldquo;¿Cuál es tu mayor expectativa al iniciar este
                    proceso?&rdquo;
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/cuestionario.pdf" download>
                    DESCARGAR PDF PARA REFLEXIÓN
                  </Link>
                </Button>
              </Card>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
