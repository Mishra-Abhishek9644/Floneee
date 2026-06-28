"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { AppDispatch, RootState } from "@/Store";
import { clearCartList } from "@/Store/Slices/cartSlice";
import { placeOrder } from "@/Store/Slices/orderSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type PaymentMethod = "COD" | "ONLINE";
type ErrorState = Record<string, string>;

type BillingState = {
    name: string;
    company: string;
    country: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    notes: string;
};

type RazorpayOrderResponse = {
    orderId: string;
    amount: number;
    currency: string;
    razorpayOrderId: string;
    razorpayKey: string;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
};

type RazorpaySuccessResponse = {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
};

type RazorpayFailureResponse = {
    error: {
        description?: string;
    };
};

type RazorpayOptions = {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    notes: {
        appOrderId: string;
    };
    theme: {
        color: string;
    };
    modal: {
        ondismiss: () => void;
    };
    handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
};

type RazorpayInstance = {
    open: () => void;
    on: (
        event: "payment.failed",
        callback: (response: RazorpayFailureResponse) => void
    ) => void;
};

declare global {
    interface Window {
        Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

const initialBillingState: BillingState = {
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
};

let razorpayScriptPromise: Promise<boolean> | null = null;

function loadRazorpayScript() {
    if (typeof window === "undefined") {
        return Promise.resolve(false);
    }

    if (window.Razorpay) {
        return Promise.resolve(true);
    }

    if (razorpayScriptPromise) {
        return razorpayScriptPromise;
    }

    razorpayScriptPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

    return razorpayScriptPromise;
}

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const currentUser = useSelector(
        (state: RootState) => state.login.currentUser
    );
    const cartItems = useSelector((state: RootState) => state.cartList.items);

    const [errors, setErrors] = useState<ErrorState>({});
    const [billing, setBilling] = useState<BillingState>(initialBillingState);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const paymentCompletedRef = useRef(false);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    useEffect(() => {
        if (currentUser?.email || currentUser?.name) {
            setBilling((prev) => ({
                ...prev,
                email: currentUser?.email ?? "",
                name: currentUser?.name ?? "",
            }));
        }
    }, [currentUser]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setBilling((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: ErrorState = {};

        if (!billing.name.trim()) newErrors.name = "Full name is required";
        if (!billing.company.trim()) newErrors.company = "Company is required";
        if (!billing.country.trim()) newErrors.country = "Country is required";
        if (!billing.address1.trim()) newErrors.address1 = "Address is required";
        if (!billing.city.trim()) newErrors.city = "City is required";
        if (!billing.state.trim()) newErrors.state = "State is required";
        if (!billing.zip.trim()) newErrors.zip = "Zip is required";
        if (!billing.phone.trim()) newErrors.phone = "Phone is required";

        if (!billing.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(billing.email)) {
            newErrors.email = "Invalid email";
        }

        if (cartItems.length === 0) {
            newErrors.cart = "Cart is empty";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCodOrder = async () => {
        const response = await dispatch(
            placeOrder({
                paymentMethod: "COD",
                billingDetails: billing,
            })
        );

        if (placeOrder.fulfilled.match(response)) {
            dispatch(clearCartList());
            router.push("/account/user");
        }
    };

    const handleOnlinePayment = async () => {
        const isScriptLoaded = await loadRazorpayScript();
        const RazorpayCheckout = window.Razorpay;

        if (!isScriptLoaded || !RazorpayCheckout) {
            toast.error("Failed to load Razorpay checkout.");
            setIsSubmitting(false);
            return;
        }

        const createResponse = await fetch("/api/payments/razorpay/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                billingDetails: billing,
            }),
        });

        const createData = (await createResponse.json()) as
            | RazorpayOrderResponse
            | { message?: string };

        if (!createResponse.ok) {
            throw new Error(
                "message" in createData && createData.message
                    ? createData.message
                    : "Failed to start Razorpay payment."
            );
        }

        const paymentData = createData as RazorpayOrderResponse;

        paymentCompletedRef.current = false;

        const razorpay = new RazorpayCheckout({
            key: paymentData.razorpayKey,
            amount: paymentData.amount,
            currency: paymentData.currency,
            name: "FASHION-ERA",
            description: `Order #${paymentData.orderId.slice(-6)}`,
            order_id: paymentData.razorpayOrderId,
            prefill: {
                name: paymentData.customer.name,
                email: paymentData.customer.email,
                contact: paymentData.customer.phone,
            },
            notes: {
                appOrderId: paymentData.orderId,
            },
            theme: {
                color: "#7c3aed",
            },
            modal: {
                ondismiss: () => {
                    if (!paymentCompletedRef.current) {
                        toast.error("Payment window closed before completion.");
                        setIsSubmitting(false);
                    }
                },
            },
            handler: async (response) => {
                paymentCompletedRef.current = true;

                try {
                    const verifyResponse = await fetch("/api/payments/razorpay/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({
                            orderId: paymentData.orderId,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = (await verifyResponse.json()) as {
                        message?: string;
                    };

                    if (!verifyResponse.ok) {
                        throw new Error(
                            verifyData.message || "Payment verification failed."
                        );
                    }

                    toast.success("Payment completed successfully.");
                    dispatch(clearCartList());
                    router.push("/account/user");
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "Payment verification failed.";

                    toast.error(message);
                } finally {
                    setIsSubmitting(false);
                }
            },
        });

        razorpay.on("payment.failed", (response) => {
            paymentCompletedRef.current = true;
            toast.error(response.error.description || "Payment failed.");
            setIsSubmitting(false);
        });

        razorpay.open();
    };

    const handlePlaceOrder = async () => {
        if (!validate() || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (paymentMethod === "ONLINE") {
                await handleOnlinePayment();
                return;
            }

            await handleCodOrder();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Checkout failed.";

            toast.error(message);
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(false);
    };

    const inputClass = (field: string) =>
        `border py-2 px-4 w-full ${errors[field] ? "border-red-500" : "border-gray-300"
        }`;

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
                                name="name"
                                value={billing.name}
                                onChange={handleChange}
                                className={inputClass("name")}
                            />
                            {errors.name && (
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

                            {cartItems.map((item) => (
                                <div
                                    key={`${item.productId}-${item.size}-${item.color}`}
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

                        <div className="space-y-3 mt-6">
                            <p className="font-semibold">Payment Method</p>

                            <label className="flex items-start gap-3 border border-gray-300 rounded-lg p-4 bg-white">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={() => setPaymentMethod("COD")}
                                    className="mt-1"
                                />
                                <span>
                                    <span className="block font-medium">Cash on Delivery</span>
                                    <span className="block text-sm text-gray-500">
                                        Place the order now and collect payment offline.
                                    </span>
                                </span>
                            </label>

                            <label className="flex items-start gap-3 border border-gray-300 rounded-lg p-4 bg-white">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="ONLINE"
                                    checked={paymentMethod === "ONLINE"}
                                    onChange={() => setPaymentMethod("ONLINE")}
                                    className="mt-1"
                                />
                                <span>
                                    <span className="block font-medium">Pay Online</span>
                                    <span className="block text-sm text-gray-500">
                                        Open Razorpay Checkout in test mode and verify the payment.
                                    </span>
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting}
                            className="bg-purple-600 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed duration-500 text-white py-4 w-full my-6 rounded-full text-sm uppercase"
                        >
                            {isSubmitting
                                ? "Processing..."
                                : paymentMethod === "ONLINE"
                                    ? "Pay With Razorpay"
                                    : "Place Order"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
