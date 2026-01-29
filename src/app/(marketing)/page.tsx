import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { HomePage as HomePageType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default async function HomePage() {
  const homeData = await sanityFetch<HomePageType>({
    query: homePageQuery,
    tags: ["homePage", "service"]
  });

  const {
    heroTitle = "Tu templo es tu arte",
    heroSubtitle = "Acompaño procesos de bienestar, autoestima y estética.",
    heroImage,
    featuredServices = [],
  } = homeData || {};

  return (
    <div className="pb-24">
      <Section spacing="none" className="bg-gradient-to-b from-brand-100/50 to-transparent">
        <Container className="grid gap-16 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24 items-center">
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500">
                Estética consciente
                </p>
                <h1 className="text-5xl font-medium leading-[1.1] md:text-7xl">
                {heroTitle}
                </h1>
                <p className="max-w-lg text-lg text-neutral-600 md:text-xl leading-relaxed">
                {heroSubtitle}
                </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contacto">Reserva una sesión</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/servicios">Explorar servicios</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(212,177,177,0.2),_transparent_70%)]" />
            <div className="relative h-full w-full overflow-hidden rounded-[40px] shadow-medium">
                <Image
                src={heroImage ? urlFor(heroImage).url() : logo}
                alt={heroImage?.alt || "Leidy Abello"}
                fill
                className="object-cover"
                priority
                />
            </div>
            <Card className="absolute -bottom-6 -left-6 max-w-[240px] p-6 md:-left-12 shadow-medium border border-brand-200/50" hover={false}>
                <p className="text-xs font-bold text-neutral-800 uppercase tracking-widest">Consultas personalizadas</p>
                <p className="mt-2 text-sm text-neutral-500 leading-snug">Cali, Colombia · Presencial y Virtual</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="servicios">
        <Container>
          <div className="grid gap-20 md:grid-cols-[0.8fr_1.2fr] items-start">
            <div className="space-y-8 sticky top-32">
                <h2 className="text-4xl font-medium leading-tight md:text-5xl">
                    Servicios diseñados para tu bienestar
                </h2>
                <Button asChild variant="ghost" className="px-0 hover:bg-transparent text-brand-500">
                    <Link href="/servicios" className="group flex items-center gap-2 font-bold tracking-tight">
                    VER TODOS LOS SERVICIOS <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
            <div className="grid gap-8">
              {featuredServices.map((service) => (
                <Card key={service.slug.current} className="group p-10">
                  <h3 className="text-2xl font-medium md:text-3xl">{service.title}</h3>
                  <p className="mt-4 text-neutral-600 leading-relaxed">
                    {service.excerpt}
                  </p>
                  <div className="mt-8">
                    <Button asChild variant="outline" className="rounded-xl border-neutral-200 text-neutral-600 hover:border-brand-300 hover:text-brand-500">
                        <Link href={`/servicios/${service.slug.current}`}>
                        Conocer más detalles
                        </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container>
            <div className="rounded-[48px] bg-brand-500 px-8 py-20 text-center text-white shadow-medium relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />
                </div>
                <h2 className="text-4xl font-medium md:text-6xl relative z-10">
                    Tu transformación <br className="hidden md:block" /> empieza aquí
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-brand-100 relative z-10">
                    Este es un espacio seguro para explorar tus necesidades, resolver
                    dudas y decidir si deseas iniciar un proceso conmigo.
                </p>
                <div className="mt-10 relative z-10">
                    <Button asChild variant="gold" size="lg" className="rounded-full shadow-lg">
                        <Link href="/contacto">AGENDAR CONVERSACIÓN INICIAL</Link>
                    </Button>
                </div>
            </div>
        </Container>
      </Section>
    </div>
  );
}
