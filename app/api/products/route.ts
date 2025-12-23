import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        // 🔹 Pagination params
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        // 🔹 Filters
        const category = searchParams.get("category");
        const size = searchParams.get("size");
        const color = searchParams.get("color");
        const search = searchParams.get("q");


        const query: any = {};

        if (category) {
            const categoryDoc = await Category.findOne({ slug: category });
            if (categoryDoc) {
                query.categoryId = categoryDoc._id;
            }
        }

        if (size) query.sizes = size;
        if (color) query.colors = color;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // 🔹 Total count (IMPORTANT)
        const totalProducts = await Product.countDocuments(query);

        // 🔹 Paginated products
        const products = await Product.find(query)
            .populate("categoryId", "name slug")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json(
            {
                products,
                pagination: {
                    totalProducts,
                    currentPage: page,
                    totalPages: Math.ceil(totalProducts / limit),
                    hasNextPage: page * limit < totalProducts,
                    hasPrevPage: page > 1,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET /products error:", error);
        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
