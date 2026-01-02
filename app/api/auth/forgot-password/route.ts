import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/utils/db";
import User from "@/models/User";
import { sendResetEmail } from "@/utils/mail"; // we’ll create this next

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // SECURITY: don't reveal email existence
      return NextResponse.json({
        message: "If this email exists, a reset link was sent",
      });
    }

    // 🔐 Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // ⏰ Token expiry (15 minutes)
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    // 🔗 Reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // 📧 Send email
    await sendResetEmail(user.email, resetLink);

    return NextResponse.json({
      message: "Password reset link sent",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
