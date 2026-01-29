# Leidy Abello · Tu templo es tu arte

Sitio web dinámico para Leidy Abello desarrollado con **Next.js 14 (App Router)** y **Sanity CMS**.

## Arquitectura

- **Frontend:** Next.js 14, Tailwind CSS, TypeScript.
- **CMS:** Sanity Studio (v3) en `studio-leidy-abello/`.
- **Base de Datos:** Prisma + PostgreSQL (para leads de contacto).
- **Seguridad:** Rate limiting con Vercel KV + hCaptcha.
- **Email:** Resend.

## Requisitos

- Node.js **20 LTS**.
- Sanity Project ID: `x2h90o8o`.

## Configuración de Entorno

Crea un archivo `.env` en la raíz con las siguientes variables:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=x2h90o8o
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=tu_secreto

# Email
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=tu@email.com

# Database
DATABASE_URL=...

# Rate Limiting (Vercel KV)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# Captcha
NEXT_PUBLIC_HCAPTCHA_SITEKEY=...
HCAPTCHA_SECRET=...
```

## Scripts Principales

### Sitio Web
- `npm install`: Instala dependencias y genera el cliente Prisma.
- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Valida el entorno y genera el build de producción.
- `npm run lint`: Ejecuta el linter.

### Sanity Studio
- `npm run studio:dev`: Inicia el Studio localmente (localhost:3333).
- `npm run studio:build`: Genera el build estático del Studio.
- `npm run studio:deploy`: Despliega el Studio a `leidy-abello.sanity.studio`.

## Revalidación On-demand

El sitio usa revalidación por tags. Para configurar la actualización automática al publicar contenido:
1. Ve a `manage.sanity.io` -> Tu Proyecto -> API -> Webhooks.
2. Crea un nuevo webhook apuntando a `https://tu-dominio.com/api/revalidate`.
3. Usa el `SANITY_REVALIDATE_SECRET` definido en tu entorno.

---

Refactorizado por **Jules** (Autonomous Software Engineering Agent).
