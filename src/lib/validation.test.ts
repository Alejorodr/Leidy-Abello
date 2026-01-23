import { describe, expect, test } from "vitest";

import { emailRegex, sanitizeText } from "./validation";

describe("validation utilities", () => {
  test("emailRegex matches valid emails", () => {
    expect(emailRegex.test("hola@example.com")).toBe(true);
    expect(emailRegex.test("nombre.apellido+tag@dominio.co")).toBe(true);
  });

  test("emailRegex rejects invalid emails", () => {
    expect(emailRegex.test("holaexample.com")).toBe(false);
    expect(emailRegex.test("hola@")).toBe(false);
    expect(emailRegex.test("hola@dominio")).toBe(false);
    expect(emailRegex.test("hola @dominio.com")).toBe(false);
  });

  test("sanitizeText removes html and trims", () => {
    expect(sanitizeText("  <b> Hola </b>   mundo ")).toBe("Hola mundo");
  });
});
