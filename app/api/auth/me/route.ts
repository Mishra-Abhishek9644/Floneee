import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = verifyToken(token);

    return NextResponse.json({
      user: {
        _id: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
