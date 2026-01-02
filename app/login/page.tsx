"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginUser } from "@/utils/auth";
import { setUser } from "@/Store/Slices/loginSlice";
import { AppDispatch, RootState } from "@/Store";
import { fetchCart } from "@/Store/Slices/cartSlice";
import { fetchCompare } from "@/Store/Slices/compareSlice";
import { fetchWishlist } from "@/Store/Slices/wishlistSlice";

interface LoginForm {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.login.currentUser);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsSubmitting(true);

      const res = await loginUser(data);

      dispatch(setUser(res.user));
      dispatch(fetchCart());
      dispatch(fetchCompare());
      dispatch(fetchWishlist());

      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message || "Invalid email or password");
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "user") {
      router.replace("/account/user");
    } else {
      router.replace("/account/admin");
    }
  }, [user, router]);

  /* ================= SKELETON ================= */
  if (loading) {
    return (
      <>
        <Breadcrumb />
        <div className="min-h-[60vh] flex items-center justify-center animate-pulse">
          <div className="w-full max-w-md border p-6 rounded">
            <div className="h-6 w-32 bg-gray-300 rounded mb-6" />
            <div className="h-10 w-full bg-gray-300 rounded mb-4" />
            <div className="h-10 w-full bg-gray-300 rounded mb-6" />
            <div className="h-10 w-full bg-gray-300 rounded" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb />

      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-md border p-6 rounded">
          <h1 className="text-xl font-bold mb-4 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Enter your email"
              className={`border w-full p-2 mb-3 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Enter your password"
              className={`border w-full p-2 mb-3 ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}

            <div className="flex justify-between items-center mb-4 text-sm">
              <Link
                href="/forgot-password"
                className="hover:underline"
              >
                Forgot Password?
              </Link>

              <Link
                href="/register"
                className="hover:underline"
              >
                Register
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-2 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
