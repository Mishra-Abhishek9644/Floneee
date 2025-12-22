import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: allow all requests for now
  


  return NextResponse.next();
}
