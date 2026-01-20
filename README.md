# Leidy Abello

Sitio web en Next.js (App Router) para Leidy Abello, con un Studio de Sanity
integrado en la carpeta `studio-leidy-abello/`.

## Requisitos

- Node.js **20 LTS** (recomendado).

Se incluye un archivo `.nvmrc` para fijar la versión local.

## Variables de entorno

```
NEXT_PUBLIC_SITE_URL=https://leidy-abello-neon.vercel.app/
SANITY_PROJECT_ID=x2h90o8o
SANITY_DATASET=production
SANITY_API_VERSION=YYYY-MM-DD
```

## Scripts principales (sitio)

```
npm run dev
npm run build
npm run start
npm run lint
```

## Sanity Studio

El Studio vive en `studio-leidy-abello/` y **no** se compila en el build del
sitio. Usa los comandos:

```
npm run studio:dev
npm run studio:build
```
