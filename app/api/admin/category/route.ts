import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const admin = verifyToken(token);
  if (admin.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { name, slug } = await req.json();

  if (!name || !slug) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const exists = await Category.findOne({ slug });
  if (exists) {
    return NextResponse.json({ message: "Category already exists" }, { status: 409 });
  }

  const category = await Category.create({ name, slug });

  return NextResponse.json({ category }, { status: 201 });
}
