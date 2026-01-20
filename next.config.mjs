/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  redirects: async () => [
    {
      source: "/index.html",
      destination: "/",
      permanent: true,
    },
    {
      source: "/aboutme.html",
      destination: "/sobre-mi",
      permanent: true,
    },
    {
      source: "/contacto.html",
      destination: "/contacto",
      permanent: true,
    },
    {
      source: "/asesoriaPersonal.html",
      destination: "/servicios/asesoria-imagen",
      permanent: true,
    },
    {
      source: "/asesoriaEventual.html",
      destination: "/servicios/ritual-identidad",
      permanent: true,
    },
    {
      source: "/coaching.html",
      destination: "/servicios/reconectar-cuerpo",
      permanent: true,
    },
    {
      source: "/productos.html",
      destination: "/servicios",
      permanent: true,
    },
    {
      source: "/login.html",
      destination: "/contacto",
      permanent: true,
    },
  ],
};

export default nextConfig;
