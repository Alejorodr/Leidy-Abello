import { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutPageQuery } from "@/lib/sanity/queries";
import { AboutPage as AboutPageType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/common/portable-text";

export const metadata: Metadata = {
  title: "Sobre mí | Leidy Abello",
  description: "Conoce la historia de Leidy Abello y su enfoque de estética consciente.",
};

export default async function AboutPage() {
  const aboutData = await sanityFetch<AboutPageType>({
    query: aboutPageQuery,
    tags: ["aboutPage"]
  });

  if (!aboutData) return null;

  return (
    <section className="mx-auto max-w-5xl space-y-12 px-6 py-16 md:px-10">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] items-center">
        {aboutData.portrait && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-sm">
                <Image
                    src={urlFor(aboutData.portrait).url()}
                    alt={aboutData.portrait.alt || "Leidy Abello"}
                    fill
                    className="object-cover"
                />
            </div>
        )}
        <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
            Sobre mí
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl">{aboutData.title || "Acompañamiento con alma"}</h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
            {aboutData.introduction}
            </p>
        </div>
      </div>

      {aboutData.body && (
          <div className="prose prose-neutral max-w-none prose-lg">
              <PortableText value={aboutData.body} />
          </div>
      )}
    </section>
  );
}
