import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextRequest } from "next/server";

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

vi.mock("next-sanity/webhook", () => ({
  parseBody: vi.fn(),
}));

describe("Revalidate API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SANITY_REVALIDATE_SECRET = "test-secret";
  });

  it("should return 401 if signature is invalid", async () => {
    (parseBody as any).mockResolvedValueOnce({
      body: null,
      isValidSignature: false,
    });

    const req = new NextRequest("http://localhost/api/revalidate", {
      method: "POST",
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
    expect(await response.text()).toBe("Invalid signature");
  });

  it("should return 400 if body type is missing", async () => {
    (parseBody as any).mockResolvedValueOnce({
      body: {},
      isValidSignature: true,
    });

    const req = new NextRequest("http://localhost/api/revalidate", {
      method: "POST",
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
    expect(await response.text()).toBe("Bad Request");
  });

  it("should revalidate tags and return 200 if signature is valid", async () => {
    (parseBody as any).mockResolvedValueOnce({
      body: { _type: "blogPost", slug: { current: "test-post" } },
      isValidSignature: true,
    });

    const req = new NextRequest("http://localhost/api/revalidate", {
      method: "POST",
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.revalidated).toBe(true);
    expect(revalidateTag).toHaveBeenCalledWith("blogPost");
    expect(revalidateTag).toHaveBeenCalledWith("blogPost:test-post");
    expect(revalidateTag).toHaveBeenCalledWith("siteSettings");
    expect(revalidateTag).toHaveBeenCalledWith("homePage");
  });
});
