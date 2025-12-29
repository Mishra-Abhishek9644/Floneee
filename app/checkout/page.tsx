"use client";
import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "@/Store/Slices/orderSlice";
import { removeFromCart } from "@/Store/Slices/cartSlice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/Store";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const currentUser = useSelector((state: any) => state.login.currentUser);
    const cartCount = useSelector((state: any) => state.cartList.items);
    const user = useSelector((state: any) => state.login.currentUser);
    type ErrorState = Record<string, string>;
    const [errors, setErrors] = useState<ErrorState>({});

    const total = cartCount.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
    );

    const [billing, setBilling] = useState({
        name: "",
        company: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        notes: "",
    });

    useEffect(() => {
        if (user?.email || user?.name) {
            setBilling((prev) => ({ ...prev, email: user.email, name: user.name }));
        }
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setBilling((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: any = {};
        if (!billing.name) newErrors.name = "Full name is required";
        if (!billing.company) newErrors.company = "Company is required";
        if (!billing.country) newErrors.country = "Country is required";
        if (!billing.address1) newErrors.address1 = "Address is required";
        if (!billing.city) newErrors.city = "City is required";
        if (!billing.state) newErrors.state = "State is required";
        if (!billing.zip) newErrors.zip = "Zip is required";
        if (!billing.phone) newErrors.phone = "Phone is required";
        if (!billing.email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(billing.email)) {
            newErrors.email = "Invalid email";
        }
        if (cartCount.length === 0) newErrors.cart = "Cart is empty";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validate()) return;

        const order = {
            id: Date.now().toString(),
            items: cartCount,
            total,
            billing,
            date: new Date().toLocaleString(),
            status: "Pending",
        };

        dispatch(placeOrder(order));
        dispatch(removeFromCart(currentUser._id));
        router.push("/account");
    };

    const inputClass = (field: string) =>
        `border py-2 px-4 w-full capitalize ${errors[field] ? "border-red-500" : "border-gray-300"}`;

    return (
        <>
            <Breadcrumb />
            <div className="md:px-36 md:py-20 px-5 py-10">
                <div className="w-full grid md:grid-cols-2 gap-10">

                    {/* Billing */}
                    <div>
                        <h2 className="my-4 text-xl font-semibold">Billing Details</h2>

                        <label className="flex flex-col gap-2 mb-6">
                            Full Name
                            <input
                                name="username"
                                readOnly
                                value={billing.name}
                                onChange={handleChange}
                                className={inputClass("username")}
                            />
                            {errors.username && (
                                <span className="text-red-500 text-xs">{errors.name}</span>
                            )}
                        </label>

                        <label className="flex flex-col gap-2 mb-6">
                            Company Name
                            <input
                                name="company"
                                value={billing.company}
                                onChange={handleChange}
                                className={inputClass("company")}
                            />
                            {errors.company && (
                                <span className="text-red-500 text-xs">{errors.company}</span>
                            )}
                        </label>

                        <label className="flex flex-col gap-2 mb-6">
                            Country
                            <input
                                name="country"
                                value={billing.country}
                                onChange={handleChange}
                                className={inputClass("country")}
                            />
                            {errors.country && (
                                <span className="text-red-500 text-xs">{errors.country}</span>
                            )}
                        </label>

                        <label className="flex flex-col gap-2 mb-6">
                            Street Address
                            <input
                                name="address1"
                                value={billing.address1}
                                onChange={handleChange}
                                className={inputClass("address1")}
                            />
                            {errors.address1 && (
                                <span className="text-red-500 text-xs">{errors.address1}</span>
                            )}
                            <input
                                name="address2"
                                placeholder="Apartment, suite, unit etc."
                                value={billing.address2}
                                onChange={handleChange}
                                className="border border-gray-300 py-2 px-4 w-full mt-3"
                            />
                        </label>

                        <label className="flex flex-col gap-2 mb-6">
                            Town / City
                            <input
                                name="city"
                                value={billing.city}
                                onChange={handleChange}
                                className={inputClass("city")}
                            />
                            {errors.city && (
                                <span className="text-red-500 text-xs">{errors.city}</span>
                            )}
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <label className="flex flex-col gap-2">
                                State
                                <input
                                    name="state"
                                    value={billing.state}
                                    onChange={handleChange}
                                    className={inputClass("state")}
                                />
                                {errors.state && (
                                    <span className="text-red-500 text-xs">{errors.state}</span>
                                )}
                            </label>

                            <label className="flex flex-col gap-2">
                                Postcode / Zip
                                <input
                                    name="zip"
                                    type="number"
                                    value={billing.zip}
                                    onChange={handleChange}
                                    className={inputClass("zip")}
                                />
                                {errors.zip && (
                                    <span className="text-red-500 text-xs">{errors.zip}</span>
                                )}
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <label className="flex flex-col gap-2">
                                Phone
                                <input
                                    name="phone"
                                    type="number"
                                    value={billing.phone}
                                    onChange={handleChange}
                                    className={inputClass("phone")}
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-xs">{errors.phone}</span>
                                )}
                            </label>

                            <label className="flex flex-col gap-2">
                                Email Address
                                <input
                                    name="email"
                                    readOnly
                                    value={billing.email}
                                    onChange={handleChange}
                                    className={inputClass("email")}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-xs">{errors.email}</span>
                                )}
                            </label>
                        </div>

                        <label className="flex flex-col gap-2 mb-6">
                            Order Notes
                            <textarea
                                name="notes"
                                value={billing.notes}
                                onChange={handleChange}
                                className="border border-gray-300 py-2 px-4 w-full"
                                placeholder="Notes about your order"
                            />
                        </label>
                    </div>

                    {/* Order */}
                    <div>
                        <h2 className="my-4 text-xl font-semibold">Your Order</h2>

                        <div className="bg-[#f6f6f6] px-6 py-8 rounded-lg space-y-4">
                            <div className="flex justify-between font-semibold border-b border-gray-300 pb-4">
                                <p>Product</p>
                                <p>Total</p>
                            </div>

                            {cartCount.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between border-b border-gray-300 pb-4 w-full"
                                >
                                    <p className="w-2/3">
                                        {item.title} × {item.quantity}
                                    </p>
                                    <p>₹{item.price * item.quantity}</p>
                                </div>
                            ))}

                            <div className="flex justify-between border-b border-gray-300 pb-4">
                                <p>Shipping</p>
                                <p>Free Shipping</p>
                            </div>

                            <div className="flex justify-between font-semibold border-b border-gray-300 pb-4">
                                <p>Total</p>
                                <p>₹{total}</p>
                            </div>
                        </div>

                        {errors.cart && (
                            <p className="text-red-500 text-xs mt-2">{errors.cart}</p>
                        )}

                        <button
                            onClick={handlePlaceOrder}
                            className="bg-purple-600 hover:bg-black duration-500 text-white py-4 w-full my-6 rounded-full text-sm uppercase"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
