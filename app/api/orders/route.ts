import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { authMiddleware } from "@/utils/authMiddleware";
import {
  getCheckoutCart,
  normalizeBillingDetails,
  validateBillingDetails,
} from "@/utils/checkout";

// POST
export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = (await req.json().catch(() => ({}))) as {
      billingDetails?: unknown;
      paymentMethod?: "COD" | "ONLINE";
    };

    if (body.paymentMethod && body.paymentMethod !== "COD") {
      return NextResponse.json(
        { message: "Use the Razorpay payment route for online payments." },
        { status: 400 }
      );
    }

    const billingDetails = normalizeBillingDetails(body.billingDetails);
    const billingError = validateBillingDetails(billingDetails);

    if (billingError) {
      return NextResponse.json({ message: billingError }, { status: 400 });
    }

    const { items, totalAmount } = await getCheckoutCart(user.userId);

    const order = await Order.create({
      userId: user.userId,
      items,
      billingDetails,
      totalAmount,
      paymentMethod: "COD",
    });

    await Cart.findOneAndUpdate({ userId: user.userId }, { $set: { items: [] } });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error("ORDER CREATE ERROR:", err);

    const message =
      err instanceof Error ? err.message : "Order creation failed";

    return NextResponse.json(
      { message },
      { status: message === "Cart is empty." ? 400 : 500 }
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
