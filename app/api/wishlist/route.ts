import { authMiddleware } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { calculateFinalPrice } from "@/lib/price";

/* ================= GET ================= */
export async function GET() {
  await connectDB();

  const user = await authMiddleware();
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const wishlist = await Wishlist
    .findOne({ userId: user.userId })
    .populate("products");

  const productsWithFinalPrice =
    wishlist?.products.map((p: any) => ({
      ...p.toObject(),
price: calculateFinalPrice(p.price, p.discount),
    })) ?? [];

  return Response.json({ products: productsWithFinalPrice });
}

/* ================= POST (TOGGLE) ================= */
export async function POST(req: Request) {
  await connectDB();

  const user = await authMiddleware();
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  let wishlist = await Wishlist.findOne({ userId: user.userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId: user.userId,
      products: [productId],
    });
  } else {
    const exists = wishlist.products.some(
      (id: any) => id.toString() === productId
    );

    if (exists) {
      wishlist.products.pull(productId);
    } else {
      wishlist.products.addToSet(productId);
    }

    await wishlist.save();
  }

  await wishlist.populate("products");

  const productsWithFinalPrice =
    wishlist.products.map((p: any) => ({
      ...p.toObject(),
      price: calculateFinalPrice(p.price, p.discount),
    }));

  return Response.json({ products: productsWithFinalPrice });
}

/* ================= DELETE (CLEAR) ================= */
export async function DELETE() {
  await connectDB();

  const user = await authMiddleware();
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await Wishlist.findOneAndUpdate(
    { userId: user.userId },
    { products: [] }
  );

  // ✅ No products → no price calculation needed
  return Response.json({ products: [] });
}
