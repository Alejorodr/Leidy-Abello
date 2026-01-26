import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

import logo from "../../../images/Logo_Leidy_Abello.webp";

import { Button } from "@/components/ui/button";
import { getBlogPosts, getServices, getPortfolioCases } from "@/lib/sanity";
import { BlogPost, Service, PortfolioCase } from "@/lib/sanity.types";

export default async function HomePage() {
  const [services, blogPosts, portfolioCases]: [
    Service[],
    BlogPost[],
    PortfolioCase[],
  ] = await Promise.all([getServices(), getBlogPosts(), getPortfolioCases()]);

  return (
    <div className="space-y-24 pb-24">
      <section className="bg-gradient-to-b from-brand-50 via-brand-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
              Estética consciente
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Tu templo es tu arte
            </h1>
            <p className="text-base text-neutral-700 md:text-lg">
              Acompaño procesos de bienestar, autoestima y estética para que tu
              imagen refleje la belleza que ya habita en ti.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/contacto">Reserva una sesión</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/servicios">Explorar servicios</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] bg-brand-300/10 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,154,154,0.2),_transparent_60%)]" />
            <Image
              src={logo}
              alt="Leidy Abello"
              width={360}
              height={220}
              className="relative mx-auto"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="relative mt-8 space-y-3 text-sm text-neutral-700">
              <p>Consultas personalizadas · Cali, Colombia</p>
              <p>Estética, bienestar emocional y rituales de autocuidado.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.2fr] md:px-10">
        <div className="space-y-4">
          <h2 className="section-title">
            Servicios diseñados para tu bienestar
          </h2>
          <p className="text-neutral-600">
            Cada proceso es íntimo, respetuoso y centrado en tus ritmos.
            Trabajamos desde la escucha y la estética consciente.
          </p>
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/servicios" className="flex items-center gap-2">
              Ver todos los servicios <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6">
          {services.map((service) => (
            <div key={service.slug.current} className="card">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm text-neutral-600">
                {service.description}
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600">
                {service.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-6 w-fit">
                <Link href={`/servicios/${service.slug.current}`}>
                  Conocer más
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Portafolio respetuoso</h2>
            <p className="text-neutral-600">
              Historias de transformación consciente con consentimiento.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/portafolio">Ver casos</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {portfolioCases.map((item) => (
            <div key={item.slug.current} className="card">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600">{item.summary}</p>
              <Button asChild variant="outline" className="mt-6 w-fit">
                <Link href={`/portafolio/${item.slug.current}`}>
                  Leer historia
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Blog y recursos</h2>
            <p className="text-neutral-600">
              Lecturas breves para nutrir tu autoestima y tu imagen.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/blog">Ir al blog</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.slice(0, 2).map((post) => (
            <div key={post.slug.current} className="card">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-300">
                {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {post.readTime}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
              <p className="mt-3 text-sm text-neutral-600">{post.excerpt}</p>
              <Button asChild variant="outline" className="mt-6 w-fit">
                <Link href={`/blog/${post.slug.current}`}>Leer artículo</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="rounded-[32px] bg-brand-300/15 px-8 py-14 text-center">
          <h2 className="text-3xl font-semibold">
            Agenda una conversación inicial
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-700">
            Este es un espacio seguro para explorar tus necesidades, resolver
            dudas y decidir si deseas iniciar un proceso conmigo.
          </p>
          <Button asChild className="mt-6">
            <Link href="/contacto">Hablemos</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
