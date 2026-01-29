import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

// Mock Ratelimit
vi.mock("@/lib/ratelimit", () => ({
  contactLimiter: {
    limit: vi.fn().mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 1000,
    }),
  },
}));

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  default: {
    lead: {
      create: vi.fn(),
    },
  },
}));

// Mock Resend
vi.mock("resend", () => {
  const ResendMock = vi.fn();
  ResendMock.prototype.emails = {
    send: vi.fn(),
  };
  return { Resend: ResendMock };
});

// Mock fetch for hCaptcha
global.fetch = vi.fn();

describe("Contact API", () => {
  const resendInstance = new Resend();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.HCAPTCHA_SECRET = "test-secret";
    process.env.CONTACT_TO_EMAIL = "to@example.com";
    process.env.NODE_ENV = "test";
  });

  it("should return 400 if fields are missing", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Todos los campos son obligatorios.");
  });

  it("should return 400 if email is invalid", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test",
        email: "invalid-email",
        message: "Hello",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("El correo no es válido.");
  });

  it("should return 400 if captchaToken is missing when secret exists", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test",
        email: "test@example.com",
        message: "Hello",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("CAPTCHA requerido.");
  });

  it("should return 200 on success path", async () => {
    // Mock hCaptcha success
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    // Mock prisma success
    (prisma.lead.create as any).mockResolvedValueOnce({});

    // Mock Resend success
    (Resend.prototype.emails.send as any).mockResolvedValueOnce({ data: { id: "123" }, error: null });

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Hello there!",
        captchaToken: "valid-token",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(prisma.lead.create).toHaveBeenCalledWith({
      data: {
        name: "Test User",
        email: "test@example.com",
        message: "Hello there!",
      },
    });
  });

  it("should return 500 if email sending fails", async () => {
     // Mock hCaptcha success
     (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    // Mock prisma success
    (prisma.lead.create as any).mockResolvedValueOnce({});

    // Mock Resend failure
    (Resend.prototype.emails.send as any).mockResolvedValueOnce({ data: null, error: { message: "Failed" } });

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Hello there!",
        captchaToken: "valid-token",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("No se pudo enviar la notificación por correo.");
  });

  it("should bypass hCaptcha in dev if bypass flag is set", async () => {
    delete process.env.HCAPTCHA_SECRET;
    process.env.NODE_ENV = "development";
    process.env.HCAPTCHA_BYPASS = "true";

    // Mock prisma success
    (prisma.lead.create as any).mockResolvedValueOnce({});

    // Mock Resend success
    (Resend.prototype.emails.send as any).mockResolvedValueOnce({ data: { id: "123" }, error: null });

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Hello there!",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
