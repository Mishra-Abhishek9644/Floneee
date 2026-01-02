import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/Order";
import { authMiddleware } from "@/utils/authMiddleware";

// POST 
export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { items, totalAmount, paymentMethod } = await req.json();

    if (!items?.length)
      return NextResponse.json({ message: "No items" }, { status: 400 });

    const order = await Order.create({
      userId: user.userId,
      items,
      totalAmount,
      paymentMethod,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error("ORDER CREATE ERROR:", err);
    return NextResponse.json(
      { message: "Order creation failed" },
      { status: 500 }
    );
  }
}


// GET 
export async function GET() {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const orders = await Order.find({ userId: user.userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
