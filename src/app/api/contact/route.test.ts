import { beforeEach, describe, expect, test, vi } from "vitest";

const sendMock = vi.hoisted(() => vi.fn());
const createMock = vi.hoisted(() => vi.fn());
const getPrismaMock = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: sendMock,
    },
  })),
}));

vi.mock("@/lib/prisma", () => ({
  getPrisma: getPrismaMock,
}));

const mockFetch = vi.hoisted(() => vi.fn());

beforeEach(() => {
  sendMock.mockReset();
  createMock.mockReset();
  getPrismaMock.mockReset();
  mockFetch.mockReset();
  global.fetch = mockFetch as typeof fetch;
  getPrismaMock.mockReturnValue({
    lead: {
      create: createMock,
    },
  });
  process.env.CONTACT_TO_EMAIL = "destino@example.com";
  process.env.RESEND_API_KEY = "resend-key";
  process.env.HCAPTCHA_SECRET = "secret";
});

const makeRequest = (data: Record<string, string>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.set(key, value));
  return new Request("http://localhost/api/contact", {
    method: "POST",
    body: formData,
  });
};

const buildResponse = (success: boolean) =>
  Promise.resolve({
    json: () => Promise.resolve({ success }),
  }) as Promise<Response>;

const { POST } = await import("./route");

describe("contact API", () => {
  test("returns ok for valid data", async () => {
    mockFetch.mockImplementation(() => buildResponse(true));

    const response = await POST(
      makeRequest({
        name: "Leidy",
        email: "leidy@example.com",
        message: "Hola",
        hcaptchaToken: "token",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(createMock).toHaveBeenCalled();
    expect(sendMock).toHaveBeenCalled();
  });

  test("rejects invalid email", async () => {
    mockFetch.mockImplementation(() => buildResponse(true));

    const response = await POST(
      makeRequest({
        name: "Leidy",
        email: "leidy@",
        message: "Hola",
        hcaptchaToken: "token",
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Email inválido" });
  });

  test("fails when CONTACT_TO_EMAIL is missing", async () => {
    process.env.CONTACT_TO_EMAIL = "";
    mockFetch.mockImplementation(() => buildResponse(true));

    const response = await POST(
      makeRequest({
        name: "Leidy",
        email: "leidy@example.com",
        message: "Hola",
        hcaptchaToken: "token",
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Missing CONTACT_TO_EMAIL env var",
    });
  });

  test("rejects invalid hCaptcha", async () => {
    mockFetch.mockImplementation(() => buildResponse(false));

    const response = await POST(
      makeRequest({
        name: "Leidy",
        email: "leidy@example.com",
        message: "Hola",
        hcaptchaToken: "token",
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "hCaptcha inválido",
    });
  });

  test("fails when database is not configured", async () => {
    getPrismaMock.mockReturnValueOnce(null);
    mockFetch.mockImplementation(() => buildResponse(true));

    const response = await POST(
      makeRequest({
        name: "Leidy",
        email: "leidy@example.com",
        message: "Hola",
        hcaptchaToken: "token",
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Base de datos no configurada",
    });
  });
});
