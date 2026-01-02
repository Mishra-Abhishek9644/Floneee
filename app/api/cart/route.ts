import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { authMiddleware } from "@/lib/authMiddleware";
import { Types } from "mongoose";
import { calculateFinalPrice } from "@/lib/price";

/* ================= GET CART ================= */
export async function GET() {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cart = await Cart.findOne({ userId: user.userId });
    console.log("GET userId:", user.userId);

    return NextResponse.json({
      items: cart?.items || [],
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load cart" },
      { status: 500 }
    );
  }
}

/* ================= ADD / UPDATE ITEM ================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      productId,
      quantity,
      color,
      size,
    }: {
      productId: string;
      quantity: number;
      color: string;
      size: string;
    } = await req.json();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({ userId: user.userId });

    if (!cart) {
      cart = await Cart.create({
        userId: user.userId,
        items: [],
      });
    }

    const index = cart.items.findIndex(
      (i: {
        productId: Types.ObjectId;
        color: string;
        size: string;
      }) =>
        i.productId.toString() === productId &&
        i.color === color &&
        i.size === size
    );

    const price = calculateFinalPrice(
      product.price,
      product.discount
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
      cart.items[index].subtotal =
        cart.items[index].quantity * price;
    } else {
      cart.items.push({
        productId: new Types.ObjectId(productId),
        title: product.title,
        image: product.image,
        price,
        quantity,
        color,
        size,
        stock: product.stock,
        subtotal: quantity * price,
      });
    }

    await cart.save();

    return NextResponse.json({ items: cart.items });
  } catch {
    return NextResponse.json(
      { message: "Cart update failed" },
      { status: 500 }
    );
  }
}

/* ================= REMOVE ITEM ================= */
/* ================= REMOVE ITEM / CLEAR CART ================= */
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Body is optional
    const body = await req.json().catch(() => ({}));
    const { index } = body as { index?: number };

    const cart = await Cart.findOne({ userId: user.userId });
    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    // ✅ CASE 1: CLEAR ENTIRE CART
    if (index === undefined) {
      cart.items = [];
      console.log("DELETE userId:", user.userId);
    }

    // ✅ CASE 2: REMOVE SINGLE ITEM
    else {
      if (index < 0 || index >= cart.items.length) {
        return NextResponse.json(
          { message: "Invalid index" },
          { status: 400 }
        );
      }
      console.log("DELETE userId:", user.userId);

      cart.items.splice(index, 1);
    }

    await cart.save();
    return NextResponse.json({ items: cart.items });
  } catch {
    return NextResponse.json(
      { message: "Cart update failed" },
      { status: 500 }
    );
  }
}

