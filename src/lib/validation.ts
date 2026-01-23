export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeText(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
