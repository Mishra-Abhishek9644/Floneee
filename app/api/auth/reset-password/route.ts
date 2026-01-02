import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Invalid request" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // not expired
    }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "Token expired or invalid" },
        { status: 400 }
      );
    }

    // update password (hash happens automatically)
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Password reset failed" },
      { status: 500 }
    );
  }
}
