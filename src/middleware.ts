import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Admin routes require the owner email
    if (pathname.startsWith("/admin")) {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail || token.email !== adminEmail) {
        return NextResponse.redirect(new URL("/portal", req.url));
      }
    }
  }

  // Redirect logged-in users away from /login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/portal", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/login"],
};
