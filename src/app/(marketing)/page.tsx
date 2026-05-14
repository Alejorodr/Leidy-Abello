import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";
import { ArrowRight } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ParallaxHero } from "@/components/ui/parallax-hero";
import { WardrobeParallax } from "@/components/ui/wardrobe-parallax";
import { MarqueeTicker } from "@/components/ui/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { sanityFetch } from "@/lib/sanity/client";
import { homePageQuery, blogPreviewQuery } from "@/lib/sanity/queries";
import { HomePage as HomePageType, BlogPost } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

const STATS = [
  { value: "+5", label: "Años de experiencia" },
  { value: "+200", label: "Procesos de transformación" },
  { value: "100%", label: "Enfoque personalizado" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Conversación inicial",
    desc: "Hablamos de dónde estás y hacia dónde quieres ir. Sin compromiso, con toda la intención.",
  },
  {
    step: "02",
    title: "Diagnóstico",
    desc: "Analizo tu estilo de vida, colorimetría, morfología y esencia para entender tu identidad profunda.",
  },
  {
    step: "03",
    title: "Proceso personalizado",
    desc: "Trabajamos juntas en sesiones que respetan tu ritmo, tus necesidades y tu presupuesto.",
  },
  {
    step: "04",
    title: "Tu nueva versión",
    desc: "Sales con herramientas concretas para vestirte con intención y reconectarte con quién eres.",
  },
];

export default async function HomePage() {
  const [homeData, latestPosts] = await Promise.all([
    sanityFetch<HomePageType>({
      query: homePageQuery,
      tags: ["homePage", "service"],
    }),
    sanityFetch<BlogPost[]>({
      query: blogPreviewQuery,
      tags: ["blogPost"],
    }),
  ]);

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

      {/* ── 2. Wardrobe Parallax ── */}
      <WardrobeParallax />

      {/* ── 3. Marquee ticker ── */}
      <MarqueeTicker />

      {/* ── 4. Manifesto strip ── */}
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

      {/* ── 4. Stats strip ── */}
      <Section className="bg-brand-500" spacing="md">
        <Container>
          <RevealGroup
            className="grid grid-cols-3 gap-8 text-center text-white"
            staggerDelay={0.12}
          >
            {STATS.map(({ value, label }) => (
              <RevealItem key={label}>
                <p className="font-serif text-5xl font-medium md:text-6xl">
                  {value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-widest text-brand-200">
                  {label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── 5. Services ── */}
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

      {/* ── 6. Process ── */}
      <Section className="bg-brand-50">
        <Container>
          <Reveal direction="up" className="mb-16 space-y-4 text-center">
            <p className="eyebrow">Cómo trabajo</p>
            <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">
              Tu proceso, paso a paso
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-neutral-600">
              Cada persona es única. Por eso diseño cada proceso desde cero,
              escuchando y acompañando sin prisas.
            </p>
          </Reveal>

          <RevealGroup
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.12}
          >
            {PROCESS_STEPS.map(({ step, title, desc }) => (
              <RevealItem key={step}>
                <div className="group relative space-y-5 rounded-2xl p-6 transition-colors hover:bg-white hover:shadow-sm">
                  <p className="font-serif text-7xl font-medium leading-none text-brand-200 transition-colors group-hover:text-brand-300">
                    {step}
                  </p>
                  <h3 className="font-serif text-xl font-medium text-neutral-900">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── 7. About preview ── */}
      <Section className="bg-white" spacing="lg">
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
                <div className="absolute -right-4 -top-4 z-10 h-24 w-24 rounded-full border-2 border-brand-200 opacity-60" />
                <div className="absolute -bottom-4 -left-4 z-10 h-16 w-16 rounded-full bg-brand-100" />
                <Image
                  src="/images/About-me.png"
                  alt="Leidy Abello — Personal Shopper"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 8. Blog preview ── */}
      {latestPosts && latestPosts.length > 0 && (
        <Section className="bg-brand-50">
          <Container>
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <Reveal direction="right" className="space-y-2">
                <p className="eyebrow">Blog</p>
                <h2 className="font-serif text-4xl font-medium">
                  Últimas reflexiones
                </h2>
              </Reveal>
              <Reveal direction="left">
                <Button
                  asChild
                  variant="ghost"
                  className="px-0 text-brand-500 hover:bg-transparent"
                >
                  <Link
                    href="/blog"
                    className="group flex items-center gap-2 font-bold tracking-tight"
                  >
                    VER TODOS{" "}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
              </Reveal>
            </div>

            <RevealGroup
              className="grid gap-6 md:grid-cols-3"
              staggerDelay={0.1}
            >
              {latestPosts.map((post) => (
                <RevealItem key={post.slug.current}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="group block h-full"
                  >
                    <Card className="flex h-full flex-col p-8" hover={true}>
                      <div className="flex-1 space-y-3">
                        {post.publishedAt && (
                          <p className="text-xs uppercase tracking-widest text-neutral-400">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "es-CO",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        )}
                        <h3 className="font-serif text-xl font-medium leading-snug transition-colors group-hover:text-brand-500">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors group-hover:text-brand-500">
                        Leer artículo →
                      </p>
                    </Card>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* ── 9. FAQ ── */}
      <FaqSection />

      {/* ── 10. CTA banner ── */}
      <Section className="bg-white" spacing="md">
        <Container>
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-[48px] bg-brand-500 px-8 py-20 text-center text-white shadow-medium">
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
