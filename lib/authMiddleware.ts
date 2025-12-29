import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function authMiddleware() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    // THIS MUST MATCH signToken
    const user = await User.findById(decoded.userId);
    return user || null;
  } catch (err) {
    return null;
  }
}
