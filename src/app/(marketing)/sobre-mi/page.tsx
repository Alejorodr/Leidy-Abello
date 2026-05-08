import { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutPageQuery } from "@/lib/sanity/queries";
import { AboutPage as AboutPageType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/common/portable-text";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Sobre mí | Leidy Abello",
  description:
    "Conoce la historia de Leidy Abello y su enfoque de estética consciente.",
};

export default async function AboutPage() {
  const aboutData = await sanityFetch<AboutPageType>({
    query: aboutPageQuery,
    tags: ["aboutPage"],
  });

  return (
    <div>
      {/* ── Hero ── */}
      <Section
        spacing="sm"
        className="bg-gradient-to-b from-brand-100/60 to-brand-50"
      >
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            {/* Portrait */}
            <Reveal direction="right">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-medium">
                {aboutData?.portrait ? (
                  <Image
                    src={urlFor(aboutData.portrait).width(800).url()}
                    alt={aboutData.portrait.alt ?? "Leidy Abello"}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  <div className="h-full w-full bg-brand-100" />
                )}
                {/* Accent rings */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border-2 border-brand-200 opacity-60" />
              </div>
            </Reveal>

            {/* Text intro */}
            <Reveal direction="left" delay={0.15}>
              <div className="space-y-6">
                <p className="eyebrow">Sobre mí</p>
                <h1 className="font-serif text-4xl font-medium md:text-5xl">
                  {aboutData?.title ?? "Acompañamiento con alma"}
                </h1>
                {aboutData?.introduction && (
                  <p className="text-xl leading-relaxed text-neutral-700">
                    {aboutData.introduction}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Body content ── */}
      {aboutData?.body && (
        <Section className="bg-white">
          <Container>
            <Reveal direction="up">
              <div className="prose prose-lg prose-neutral mx-auto max-w-[72ch]">
                <PortableText value={aboutData.body} />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}
    </div>
  );
}
