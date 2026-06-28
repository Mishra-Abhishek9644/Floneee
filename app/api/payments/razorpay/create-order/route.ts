import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/Order";
import { authMiddleware } from "@/utils/authMiddleware";
import {
  createRazorpayOrder,
  getRazorpayCheckoutKey,
} from "@/utils/razorpay";
import {
  getCheckoutCart,
  normalizeBillingDetails,
  validateBillingDetails,
} from "@/utils/checkout";

export async function POST(req: Request) {
  let localOrderId: string | null = null;

  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      billingDetails?: unknown;
    };

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
      paymentMethod: "ONLINE",
      status: "PENDING",
      paymentDetails: {
        provider: "RAZORPAY",
      },
    });

    localOrderId = order._id.toString();

    const razorpayOrder = await createRazorpayOrder({
      amountInRupees: totalAmount,
      receipt: localOrderId,
      notes: {
        appOrderId: localOrderId,
        userId: user.userId,
      },
    });

    order.paymentDetails = {
      provider: "RAZORPAY",
      gatewayOrderId: razorpayOrder.id,
    };

    await order.save();

    return NextResponse.json({
      orderId: localOrderId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
      razorpayKey: getRazorpayCheckoutKey(),
      customer: {
        name: billingDetails.name,
        email: billingDetails.email,
        phone: billingDetails.phone,
      },
    });
  } catch (error) {
    if (localOrderId) {
      await Order.findByIdAndDelete(localOrderId).catch(() => null);
    }

    console.error("RAZORPAY CREATE ORDER ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Failed to start payment.";

    const status = message === "Cart is empty." ? 400 : 500;

    return NextResponse.json({ message }, { status });
  }
}
