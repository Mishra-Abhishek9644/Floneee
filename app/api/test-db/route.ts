import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export async function GET() {
  await connectDB();
  return NextResponse.json({ success: true, message: "MongoDB connected" });
}
