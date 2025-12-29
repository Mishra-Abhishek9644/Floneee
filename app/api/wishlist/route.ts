import { authMiddleware } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";

export async function GET(req: Request) {
  await connectDB();

  const user = await authMiddleware();
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const wishlist = await Wishlist
    .findOne({ userId: user._id })
    .populate("products");

  return Response.json({
    products: wishlist?.products || [],
  });
}


//post - add wishlist
export async function POST(req: Request) {
  await connectDB();

  const user = await authMiddleware();
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  let wishlist = await Wishlist.findOne({ userId: user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId: user._id,
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

  return Response.json({
    products: wishlist.products,
  });
}


//delete 
export async function DELETE(req: Request) {
  await connectDB();

  const user = await authMiddleware();
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await Wishlist.findOneAndUpdate(
    { userId: user._id },
    { products: [] }
  );

  return Response.json({ products: [] });
}
