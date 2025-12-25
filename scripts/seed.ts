import "dotenv/config";
import { connectDB } from "../lib/db";

import User from "../models/User";
import Category from "../models/Category";
import Product from "../models/Product";
import Cart from "../models/Cart";
import Wishlist from "../models/Wishlist";
import Compare from "../models/Compare";
import Order from "../models/Order";

async function seed() {
    await connectDB();
    console.log("🌱 Seeding clothing website database...");

    // DEV ONLY: clear all collections
    await Promise.all([
        User.deleteMany({}),
        Category.deleteMany({}),
        Product.deleteMany({}),
        Cart.deleteMany({}),
        Wishlist.deleteMany({}),
        Compare.deleteMany({}),
        Order.deleteMany({}),
    ]);

    // 1️⃣ Users
    const admin = await User.create({
        name: "Admin",
        email: "admin@store.com",
        password: "admin123",
        role: "admin",
    });

    const user = await User.create({
        name: "Customer",
        email: "user@store.com",
        password: "user123",
    });

    // 2️⃣ Categories
    const men = await Category.create({ name: "Men", slug: "men", });
    const women = await Category.create({ name: "Women", slug: "women", });

    // 3️⃣ Products (Clothing)
    const tshirt = await Product.create({
        title: "Cotton T-Shirt",
        price: 999,
        image: "/tshirt.png",
        description: "Cotton shirt made with 99% cotton picked by black men",
        categoryId: men._id,
        stock: 15,
        sizes: ["S", "M", "L"],
        colors: ["Black", "White"],
        discount: 20,
        rating: 4
    });

    const dress = await Product.create({
        title: "Floral Summer Dress",
        price: 1899,
        image: "/dress.png",
        description: "Lightweight floral dress made from breathable cotton fabric, perfect for summer wear",
        categoryId: women._id,
        stock: 20,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Red", "Blue", "Pink"],
        rating: 4.3,
    });

    // 4️⃣ Wishlist
    await Wishlist.create({
        userId: user._id,
        products: [tshirt._id],
    });

    // 5️⃣ Compare
    await Compare.create({
        userId: user._id,
        products: [tshirt._id, dress._id],
    });

    // 6️⃣ Cart
    await Cart.create({
        userId: user._id,
        items: [
            {
                productId: tshirt._id,
                title: tshirt.title,
                image: tshirt.image,
                price: tshirt.price,
                quantity: 2,
                size: "M",
                color: "Black",
                stock: tshirt.stock,              // ✅ REQUIRED
                subtotal: tshirt.price * 2,       // ✅ REQUIRED
            },
        ],
    });

    // 7️⃣ Order
    await Order.create({
        userId: user._id,
        items: [
            {
                productId: tshirt._id,
                title: tshirt.title,
                image: tshirt.image,
                price: tshirt.price,
                quantity: 2,
                size: "M",
                color: "Black",
                stock: tshirt.stock,               // ✅ REQUIRED
                subtotal: tshirt.price * 2,        // ✅ REQUIRED
            },
        ],
        totalAmount: 1998,
        paymentMethod: "COD",
        status: "PENDING",
    });

    console.log("✅ All collections created successfully");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
