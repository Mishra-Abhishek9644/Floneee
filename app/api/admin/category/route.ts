import { cookies } from "next/headers";
import { verifyToken } from "@/utils/jwt";
import { connectDB } from "@/utils/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

//Get or Fetch category
export async function GET(req: Request) {
  await connectDB();

  const categories = await Category.find().sort({ createAt: -1 });
  return NextResponse.json(categories, { status: 200 });
}


//Post or add category
export async function POST(req: Request) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const admin = verifyToken(token);
  if (admin.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { name } = await req.json();
  const slug = name.trim().toLowerCase().replace(/\s+/g, "-");
  if (!name) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const exists = await Category.findOne({ slug });
  if (exists) {
    return NextResponse.json({ message: "Category already exists" }, { status: 409 });
  }

  const category = await Category.create({ name, slug });

  return NextResponse.json({ category }, { status: 201 });
}


//Delete category
export async function DELETE(req: Request) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admin = verifyToken(token);
  if (admin.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Category id required" },
      { status: 400 }
    );
  }

  // SAFETY CHECK
  const productExists = await Product.findOne({ categoryId: id });
  if (productExists) {
    return NextResponse.json(
      { message: "Category has products. Cannot delete." },
      { status: 409 }
    );
  }

  await Category.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Category deleted" },
    { status: 200 }
  );
}
