import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/Order";
import { authMiddleware } from "@/utils/authMiddleware";

export async function GET() {
  try {
    await connectDB();

    const user = await authMiddleware();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("ADMIN ORDERS ERROR:", err);
    return NextResponse.json(
      { message: "Failed to load orders" },
      { status: 500 }
    );
  }
}
