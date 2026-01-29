import { defineField, defineType } from "sanity";

export const podcastEpisode = defineType({
  name: "podcastEpisode",
  title: "Episodio de podcast",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumen",
      type: "text",
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha publicación",
      type: "datetime",
    }),
    defineField({
      name: "duration",
      title: "Duración",
      type: "string",
    }),
    defineField({
      name: "audioUrl",
      title: "URL del audio/Spotify",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Notas del episodio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Título" },
        { name: "description", type: "text", title: "Descripción" },
        {
          name: "ogImage",
          type: "image",
          title: "Imagen Open Graph",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
