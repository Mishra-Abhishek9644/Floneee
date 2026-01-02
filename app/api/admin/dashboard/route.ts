import { cookies } from "next/headers";
import { verifyToken } from "@/utils/jwt";
import { connectDB } from "@/utils/db";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admin = verifyToken(token);
  if (admin.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const [users, products, orders, recentOrders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5),
  ]);

  const revenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  return NextResponse.json({
    users,
    products,
    orders,
    revenue: revenue[0]?.total || 0,
    recentOrders,
  });
}
