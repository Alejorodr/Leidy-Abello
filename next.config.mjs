/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  redirects: async () => [
    { source: "/index.html", destination: "/", permanent: true },
    { source: "/aboutme.html", destination: "/sobre-mi", permanent: true },
    { source: "/contacto.html", destination: "/contacto", permanent: true },
    { source: "/asesoriaPersonal.html", destination: "/servicios", permanent: true },
    { source: "/asesoriaEventual.html", destination: "/servicios", permanent: true },
    { source: "/coaching.html", destination: "/servicios", permanent: true },
    { source: "/productos.html", destination: "/servicios", permanent: true },
    { source: "/login.html", destination: "/contacto", permanent: true },
  ],
};

export default nextConfig;
