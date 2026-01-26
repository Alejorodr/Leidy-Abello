// scripts/verify-env.mjs
import process from "node:process";

const requiredEnvVars = [
  "SANITY_PROJECT_ID",
  "SANITY_DATASET",
  "RESEND_API_KEY",
  "HCAPTCHA_SECRET",
  "NEXT_PUBLIC_HCAPTCHA_SITEKEY",
  "CONTACT_TO_EMAIL",
  "DATABASE_URL",
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName],
);

if (missingEnvVars.length > 0) {
  console.error(
    `Error: Faltan las siguientes variables de entorno requeridas: ${missingEnvVars.join(
      ", ",
    )}`,
  );
  console.error(
    "Por favor, asegúrate de que todas las variables de entorno estén definidas en tu entorno de Vercel.",
  );
  process.exit(1);
}

console.log("Verificación de variables de entorno completada con éxito.");
