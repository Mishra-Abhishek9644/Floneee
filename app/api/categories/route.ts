import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find()
      .select("name slug")
      .sort({ name: 1 });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET /categories error:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
