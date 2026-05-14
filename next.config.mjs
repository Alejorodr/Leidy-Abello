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
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' https://hcaptcha.com https://*.hcaptcha.com 'unsafe-inline'",
              "frame-src https://hcaptcha.com https://*.hcaptcha.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://cdn.sanity.io",
              "connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://api.resend.com",
              "frame-ancestors 'none'",
            ].join("; "),
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
