import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { authMiddleware } from "@/utils/authMiddleware";
import { verifyRazorpaySignature } from "@/utils/razorpay";

type VerifyPayload = {
  orderId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await authMiddleware();
    if (!user?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as VerifyPayload;

    if (
      !body.orderId ||
      !body.razorpayOrderId ||
      !body.razorpayPaymentId ||
      !body.razorpaySignature
    ) {
      return NextResponse.json(
        { message: "Missing payment verification data." },
        { status: 400 }
      );
    }

    const order = await Order.findOne({
      _id: body.orderId,
      userId: user.userId,
      paymentMethod: "ONLINE",
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found." }, { status: 404 });
    }

    if (
      order.paymentDetails?.gatewayOrderId &&
      order.paymentDetails.gatewayOrderId !== body.razorpayOrderId
    ) {
      return NextResponse.json(
        { message: "Payment order mismatch." },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature({
      razorpayOrderId: body.razorpayOrderId,
      razorpayPaymentId: body.razorpayPaymentId,
      razorpaySignature: body.razorpaySignature,
    });

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid payment signature." },
        { status: 400 }
      );
    }

    order.status = "PAID";
    order.paymentDetails = {
      provider: "RAZORPAY",
      gatewayOrderId: body.razorpayOrderId,
      gatewayPaymentId: body.razorpayPaymentId,
      gatewaySignature: body.razorpaySignature,
      paidAt: new Date(),
    };

    await order.save();
    await Cart.findOneAndUpdate({ userId: user.userId }, { $set: { items: [] } });

    return NextResponse.json({
      message: "Payment verified successfully.",
      order,
    });
  } catch (error) {
    console.error("RAZORPAY VERIFY ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Payment verification failed.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
