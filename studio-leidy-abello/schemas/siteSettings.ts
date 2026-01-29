import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título del sitio",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción del sitio",
      type: "text",
    }),
    defineField({
      name: "navigation",
      title: "Navegación",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            { name: "label", type: "string", title: "Etiqueta" },
            { name: "href", type: "string", title: "Enlace" },
            { name: "order", type: "number", title: "Orden" },
          ],
        },
      ],
    }),
    defineField({
      name: "social",
      title: "Redes sociales",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "whatsapp", type: "string", title: "WhatsApp" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "email", type: "email", title: "Email" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO global",
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
