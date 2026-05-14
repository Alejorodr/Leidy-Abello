const REQUIRED_ENVS = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "SANITY_REVALIDATE_SECRET",
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "DATABASE_URL",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "NEXT_PUBLIC_HCAPTCHA_SITEKEY",
  "HCAPTCHA_SECRET",
  "NEXT_PUBLIC_SITE_URL",
];

// Portal vars — only warn; the marketing site builds without them.
// Add these in Vercel before enabling /login, /portal, /admin.
const PORTAL_ENVS = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "ADMIN_EMAIL",
];

function validate() {
  const missing = REQUIRED_ENVS.filter((env) => !process.env[env]);

  if (missing.length > 0) {
    console.error("❌ ERROR: Missing required environment variables:");
    missing.forEach((env) => console.error(`   - ${env}`));

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    } else {
      console.warn(
        "⚠️ WARNING: Build continuing in development mode despite missing envs.",
      );
    }
  } else {
    console.log("✅ Environment variables validated.");
  }

  const missingPortal = PORTAL_ENVS.filter((env) => !process.env[env]);
  if (missingPortal.length > 0) {
    console.warn("⚠️  Portal env vars not set (portal features will be unavailable):");
    missingPortal.forEach((env) => console.warn(`   - ${env}`));
  }
}

validate();
