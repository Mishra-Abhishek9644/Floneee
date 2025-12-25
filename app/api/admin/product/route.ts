import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const admin = verifyToken(token);
  if (admin.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const body = await req.json();

  const product = await Product.create({
    title: body.title,
    price: body.price,
    image: body.image,
    description: body.description,
    categoryId: body.categoryId,
    stock: body.stock,
    sizes: body.sizes,
    colors: body.colors,
    rating: body.rating || 0,
  });

  return NextResponse.json({ product }, { status: 201 });
}
