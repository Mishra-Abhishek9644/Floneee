// lib/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined!");

/**
 * ✅ Single source of truth for JWT payload
 */
export interface AppJwtPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

/* -------- SIGN TOKEN -------- */
export function signToken(payload: AppJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

/* -------- VERIFY TOKEN -------- */
export function verifyToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

  if (
    !decoded ||
    typeof decoded !== "object" ||
    !decoded.userId ||
    !decoded.email ||
    !decoded.role
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId as string,
    email: decoded.email as string,
    role: decoded.role as "user" | "admin",
  };
}
