import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


//Adding
export async function POST(req: Request) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const admin = verifyToken(token);
  if (admin.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const formData = await req.formData();

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const sizes = (formData.get("sizes") as string).split(",");
  const colors = (formData.get("colors") as string).split(",");
  const image = formData.get("image") as File;
  const rawDiscount = formData.get("discount");

  const discount =
    rawDiscount === null || rawDiscount === ""
      ? 0
      : Number(rawDiscount);

  if (Number.isNaN(discount) || discount < 0 || discount > 100) {
    return NextResponse.json(
      { message: "Invalid discount" },
      { status: 400 }
    );
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  const imageUrl = uploadResult.secure_url;


  const product = await Product.create({
    title,
    price,
    image: imageUrl,
    description,
    categoryId,
    stock,
    sizes,
    colors,
    discount,
    rating: 0,
  });

  return NextResponse.json({ product }, { status: 201 });
}


//Deleting
export async function DELETE(req: Request) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const admin = verifyToken(token);
  if (admin.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Product id requierd" }, { status: 400 });
  }

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ message: "Product deleted" }, { status: 200 });

}

// Updating
export async function PUT(req: Request) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admin = verifyToken(token);
  if (admin.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Product id required" },
      { status: 400 }
    );
  }

  const formData = await req.formData();

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const sizes = (formData.get("sizes") as string).split(",");
  const colors = (formData.get("colors") as string).split(",");
  const image = formData.get("image") as File | null;
  const rawDiscount = formData.get("discount");

  const discount =
    rawDiscount === null || rawDiscount === ""
      ? 0
      : Number(rawDiscount);

  if (Number.isNaN(discount) || discount < 0 || discount > 100) {
    return NextResponse.json(
      { message: "Invalid discount" },
      { status: 400 }
    );
  }


  const updateData: any = {
    title,
    price,
    stock,
    description,
    categoryId,
    sizes,
    colors,
    discount,
  };

  // IMAGE IS OPTIONAL IN EDIT
  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    updateData.image = uploadResult.secure_url;
  }

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ product }, { status: 200 });
}
