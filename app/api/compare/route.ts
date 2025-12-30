import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Compare from "@/models/Compare";
import { authMiddleware } from "@/lib/authMiddleware";
import mongoose from "mongoose";
import { calculateFinalPrice } from "@/lib/price";

// GET 
export async function GET() {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const compare = await Compare.findOne({ userId: user.userId })
      .populate("products");

    const productsWithFinalPrice =
      compare?.products.map((p: any) => ({
        ...p.toObject(),
        price: calculateFinalPrice(p.price, p.discount),
      })) ?? [];

    return NextResponse.json({ products: productsWithFinalPrice });
  } catch (err) {
    console.error("COMPARE GET ERROR:", err);
    return NextResponse.json(
      { message: "Failed to load compare" },
      { status: 500 }
    );
  }
}

// TOGGLE 
export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    let compare = await Compare.findOne({ userId: user.userId });

    if (!compare) {
      compare = await Compare.create({
        userId: user.userId,
        products: [productId],
      });
    } else {
      const exists = compare.products.some(
        (p: any) => p.toString() === productId
      );

      if (exists) {
        compare.products = compare.products.filter(
          (p: any) => p.toString() !== productId
        );
      } else {
        compare.products.push(productId);
      }

      await compare.save();
    }

    const populated = await Compare.findOne({ userId: user.userId })
      .populate("products");

    const productsWithFinalPrice =
      populated?.products.map((p: any) => ({
        ...p.toObject(),
        price: calculateFinalPrice(p.price, p.discount),
      })) ?? [];

    return NextResponse.json({ products: productsWithFinalPrice });
  } catch (err) {
    console.error("COMPARE POST ERROR:", err);
    return NextResponse.json(
      { message: "Compare update failed" },
      { status: 500 }
    );
  }
}

// CLEAR
export async function DELETE() {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await Compare.findOneAndUpdate(
      { userId: user.userId },
      { products: [] },
      { upsert: true }
    );

    return NextResponse.json({ products: [] });
  } catch (err) {
    console.error("COMPARE CLEAR ERROR:", err);
    return NextResponse.json(
      { message: "Clear failed" },
      { status: 500 }
    );
  }
}
