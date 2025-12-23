// lib/jwt.ts
import jwt, { JwtPayload as JWTVerifyPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined!");

export interface JwtPayload {
  id: unknown;
  userId: string;
  role: "user" | "admin";
}

// Generate JWT
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// Verify JWT
export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as JWTVerifyPayload;

  // Extra safety: check required fields
  if (!decoded || typeof decoded !== "object" || !("userId" in decoded) || !("role" in decoded)) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId as string,
    role: decoded.role as "user" | "admin",
  };
}
