import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { sanityFetch } from "@/lib/sanity/client";
import { blogPostsQuery } from "@/lib/sanity/queries";
import { BlogPost } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Blog | Leidy Abello",
  description: "Reflexiones sobre autoestima, estética consciente y bienestar.",
};

export default async function BlogPage() {
  const blogPosts = await sanityFetch<BlogPost[]>({
    query: blogPostsQuery,
    tags: ["blogPost"],
  });

  return (
    <div>
      {/* ── Header ── */}
      <Section
        spacing="sm"
        className="bg-gradient-to-b from-brand-100/60 to-brand-50"
      >
        <Container>
          <Reveal direction="up" className="max-w-3xl space-y-6">
            <p className="eyebrow">Blog</p>
            <h1 className="font-serif text-4xl font-medium md:text-6xl">
              Ideas que acompañan
            </h1>
            <p className="text-xl leading-relaxed text-neutral-600">
              Contenido para nutrir tu relación con la belleza, el cuerpo y la
              autoestima.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Posts ── */}
      <Section className="bg-white">
        <Container>
          {blogPosts && blogPosts.length > 0 ? (
            <RevealGroup
              className="grid gap-8 md:grid-cols-2"
              staggerDelay={0.1}
            >
              {blogPosts.map((post) => (
                <RevealItem key={post.slug.current}>
                  <Card className="flex h-full flex-col p-8 md:p-10">
                    <div className="flex-1 space-y-4">
                      <p className="eyebrow text-brand-400">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "es-CO",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                        {post.readTime && (
                          <span className="text-neutral-400">
                            {" "}
                            · {post.readTime}
                          </span>
                        )}
                      </p>
                      <h2 className="font-serif text-2xl font-medium">
                        {post.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {post.excerpt}
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-8 w-fit"
                    >
                      <Link href={`/blog/${post.slug.current}`}>
                        Leer artículo
                      </Link>
                    </Button>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal direction="up" className="py-16 text-center">
              <p className="text-neutral-500">
                Próximamente: reflexiones y artículos para acompañarte.
              </p>
            </Reveal>
          )}
        </Container>
      </Section>
    </div>
  );
}
