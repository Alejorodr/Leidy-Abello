import { execSync } from "node:child_process";

const isCi = process.env.CI === "true" || process.env.CI === "1";
const isVercel = process.env.VERCEL === "1";
const huskyDisabled = process.env.HUSKY === "0";

if (isCi || isVercel || huskyDisabled) {
  process.exit(0);
}

execSync("husky install", { stdio: "inherit" });
