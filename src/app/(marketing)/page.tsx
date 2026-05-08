import Link from "next/link";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";
import { ArrowRight } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ParallaxHero } from "@/components/ui/parallax-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { sanityFetch } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { HomePage as HomePageType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

export default async function HomePage() {
  const homeData = await sanityFetch<HomePageType>({
    query: homePageQuery,
    tags: ["homePage", "service"],
  });

  const {
    heroTitle = "Tu templo es tu arte",
    heroSubtitle = "Acompaño procesos de bienestar, autoestima y estética.",
    heroImage,
    featuredServices = [],
  } = homeData || {};

  const heroImageUrl = heroImage
    ? urlFor(heroImage).width(1600).url()
    : logo.src;
  const heroImageAlt = heroImage?.alt ?? "Leidy Abello";

  return (
    <div>
      {/* ── 1. Parallax Hero ── */}
      <ParallaxHero
        title={heroTitle}
        subtitle={heroSubtitle}
        heroImageUrl={heroImageUrl}
        heroImageAlt={heroImageAlt}
      />

      {/* ── 2. Manifesto strip ── */}
      <Section className="bg-brand-50" spacing="md">
        <Container>
          <Reveal direction="up" className="text-center">
            <div className="divider-brand mb-10" />
            <p className="mx-auto max-w-3xl font-serif text-[clamp(1.6rem,3.5vw,2.75rem)] font-medium leading-snug text-neutral-900">
              &ldquo;La imagen es el primer lenguaje que hablas antes de abrir
              la boca.&rdquo;
            </p>
            <div className="divider-brand mt-10" />
          </Reveal>
        </Container>
      </Section>

      {/* ── 3. Services ── */}
      <Section id="servicios" className="bg-white">
        <Container>
          <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            {/* Left sticky column */}
            <Reveal direction="right" className="space-y-8 md:sticky md:top-32">
              <p className="eyebrow">Servicios</p>
              <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">
                Servicios diseñados para tu bienestar
              </h2>
              <p className="leading-relaxed text-neutral-600">
                Cada proceso es una experiencia íntima creada para honrar tu
                identidad y potenciar tu autoestima.
              </p>
              <Button
                asChild
                variant="ghost"
                className="px-0 text-brand-500 hover:bg-transparent"
              >
                <Link
                  href="/servicios"
                  className="group flex items-center gap-2 font-bold tracking-tight"
                >
                  VER TODOS LOS SERVICIOS{" "}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </Reveal>

            {/* Right stagger cards */}
            <RevealGroup className="grid gap-6" staggerDelay={0.12}>
              {featuredServices.map((service) => (
                <RevealItem key={service.slug.current}>
                  <Card className="group p-8 md:p-10">
                    <h3 className="font-serif text-2xl font-medium md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-neutral-600">
                      {service.excerpt}
                    </p>
                    <div className="mt-8">
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-neutral-200 text-neutral-600 hover:border-brand-300 hover:text-brand-500"
                      >
                        <Link href={`/servicios/${service.slug.current}`}>
                          Conocer más detalles
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* ── 4. About preview strip ── */}
      <Section className="bg-brand-50" spacing="lg">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <Reveal direction="right">
              <div className="space-y-6">
                <p className="eyebrow">Sobre mí</p>
                <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">
                  Acompañamiento con alma
                </h2>
                <p className="text-lg leading-relaxed text-neutral-600">
                  Soy personal shopper y asesora de imagen. Mi enfoque va más
                  allá de la ropa: trabajo desde la autoestima y el bienestar
                  para que te reconectes con quién eres.
                </p>
                <Button asChild variant="outline">
                  <Link href="/sobre-mi">Conocer mi historia</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-medium">
                {/* Decorative accent */}
                <div className="absolute -right-4 -top-4 z-10 h-24 w-24 rounded-full border-2 border-brand-200 opacity-60" />
                <div className="absolute -bottom-4 -left-4 z-10 h-16 w-16 rounded-full bg-brand-100" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/About-me.png"
                  alt="Leidy Abello — Personal Shopper"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 5. CTA banner ── */}
      <Section className="bg-white" spacing="md">
        <Container>
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-[48px] bg-brand-500 px-8 py-20 text-center text-white shadow-medium">
              {/* Decorative radial blob */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                <div className="absolute -left-[20%] top-[-50%] h-[200%] w-[100%] bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />
              </div>

              <p className="eyebrow relative z-10 text-brand-200">
                Empieza tu proceso
              </p>
              <h2 className="relative z-10 mt-4 font-serif text-4xl font-medium md:text-6xl">
                Tu transformación <br className="hidden md:block" /> empieza
                aquí
              </h2>
              <p className="relative z-10 mx-auto mt-6 max-w-xl text-lg text-brand-100">
                Este es un espacio seguro para explorar tus necesidades,
                resolver dudas y decidir si deseas iniciar un proceso conmigo.
              </p>
              <div className="relative z-10 mt-10">
                <Button
                  asChild
                  variant="gold"
                  size="lg"
                  className="rounded-full shadow-lg"
                >
                  <Link href="/contacto">AGENDAR CONVERSACIÓN INICIAL</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
