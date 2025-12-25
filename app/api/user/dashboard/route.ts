import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Wishlist from "@/models/Wishlist";
import Compare from "@/models/Compare";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = verifyToken(token);

  const [cart, wishlist, compare, orders] = await Promise.all([
    Cart.findOne({ userId: user.userId }),
    Wishlist.findOne({ userId: user.userId }),
    Compare.findOne({ userId: user.userId }),
    Order.find({ userId: user.userId }).sort({ createdAt: -1 }).limit(5),
  ]);

  return NextResponse.json({
    cartCount: cart?.items.length || 0,
    wishlistCount: wishlist?.products.length || 0,
    compareCount: compare?.products.length || 0,
    ordersCount: orders.length,
    recentOrders: orders,
  });
}
