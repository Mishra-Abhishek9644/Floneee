import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function authMiddleware() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
      email: string;
      role: string;
    };

    return decoded;
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return null;
  }
}
