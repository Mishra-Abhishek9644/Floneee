// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded: any = verifyToken(token);

    // Admin-only routes
    if (pathname.startsWith("/account/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/account/user", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Node.js runtime is required for jsonwebtoken
export const config = {
  runtime: "nodejs",
  matcher: ["/account/:path*"],
};
