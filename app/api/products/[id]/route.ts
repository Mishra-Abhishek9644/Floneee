import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { Types } from "mongoose";
import { calculateFinalPrice } from "@/lib/price";


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ MUST await params
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).populate(
      "categoryId",
      "name slug"
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // 🔹 APPLY DISCOUNT (BACKEND SOURCE OF TRUTH)
    const productObj = product.toObject();

    const finalPrice = calculateFinalPrice(
      productObj.price,
      productObj.discount
    );

    return NextResponse.json(
      {
        ...productObj,
        finalPrice: Math.round(finalPrice),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /products/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
