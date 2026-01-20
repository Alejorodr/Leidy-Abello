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
CONTACT_TO_EMAIL=contacto@leidyabello.com
RESEND_API_KEY=tu_api_key
DATABASE_URL=postgresql://usuario:password@localhost:5432/db
HCAPTCHA_SECRET=tu_hcaptcha_secret
NEXT_PUBLIC_HCAPTCHA_SITEKEY=tu_hcaptcha_sitekey
```

> Crea un archivo `.env.local` (no se versiona) con estas variables para
> desarrollo local. `CONTACT_TO_EMAIL` es obligatorio para que la API de
> contacto no devuelva 500.

## Scripts principales (sitio)

```
npm run dev
npm run start
```

> Ejecuta siempre `npm install` antes de `npm run build` o `npm run lint` para
> asegurar que existan las dependencias locales.

```
npm install
npm run build
```

```
npm install
npm run lint
```

## Sanity Studio

El Studio vive en `studio-leidy-abello/` y **no** se compila en el build del
sitio. Usa los comandos:

```
npm run studio:dev
npm run studio:build
```

El contenido actual en `src/modules/*/data.ts` sigue funcionando como
**fallback** hasta que se conecte el CMS de Sanity en producción.
