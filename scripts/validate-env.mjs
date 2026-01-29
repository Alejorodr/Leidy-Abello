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
}

validate();
