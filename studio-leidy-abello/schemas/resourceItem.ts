import { defineField, defineType } from "sanity";

export default defineType({
  name: "resourceItem",
  title: "Recurso de Portal",
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
      name: "resourceType",
      title: "Tipo de recurso",
      type: "string",
      options: {
        list: [
          { title: "Video (YouTube)", value: "video" },
          { title: "Podcast / Audio", value: "podcast" },
          { title: "Lookbook / PDF", value: "lookbook" },
          { title: "Artículo", value: "article" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFree",
      title: "Acceso libre",
      description:
        "Si está activado, cualquier usuario registrado puede ver el contenido completo. Si no, solo clientes premium.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "excerpt",
      title: "Descripción corta",
      type: "text",
      rows: 3,
      description: "Visible para todos, incluso sin acceso premium.",
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "youtubeId",
      title: "ID de YouTube",
      type: "string",
      description:
        "Solo el ID del video (ej: dQw4w9WgXcQ), no la URL completa.",
      hidden: ({ document }) => document?.resourceType !== "video",
    }),
    defineField({
      name: "audioUrl",
      title: "URL del audio",
      type: "url",
      description: "Link directo al archivo de audio (MP3, Spotify, etc.).",
      hidden: ({ document }) => document?.resourceType !== "podcast",
    }),
    defineField({
      name: "pdfUrl",
      title: "URL del PDF",
      type: "url",
      description: "Link directo al PDF del lookbook.",
      hidden: ({ document }) => document?.resourceType !== "lookbook",
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => document?.resourceType !== "article",
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "duration",
      title: "Duración",
      type: "string",
      description: "Ej: 45 min, 1h 20min",
      hidden: ({ document }) =>
        document?.resourceType !== "video" &&
        document?.resourceType !== "podcast",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "resourceType",
      isFree: "isFree",
      media: "coverImage",
    },
    prepare({ title, subtitle, isFree, media }) {
      const typeLabels: Record<string, string> = {
        video: "🎬 Video",
        podcast: "🎙 Podcast",
        lookbook: "📖 Lookbook",
        article: "📝 Artículo",
      };
      return {
        title,
        subtitle: `${typeLabels[subtitle] ?? subtitle} · ${isFree ? "Libre" : "Premium"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Más recientes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
