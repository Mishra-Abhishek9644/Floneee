"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/auth";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Signed up successfully");
      reset();
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  /* ================= SKELETON ================= */
  if (loading) {
    return (
      <>
        <Breadcrumb />
        <div className="min-h-[60vh] flex items-center justify-center animate-pulse">
          <div className="w-full max-w-md border p-6 rounded">
            <div className="h-6 w-40 bg-gray-300 rounded mb-6" />
            <div className="h-10 w-full bg-gray-300 rounded mb-4" />
            <div className="h-10 w-full bg-gray-300 rounded mb-4" />
            <div className="h-10 w-full bg-gray-300 rounded mb-4" />
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
            Register
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter your username"
              className={`border w-full p-2 mb-3 ${errors.username ? "border-red-500" : ""
                }`}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mb-2">
                {errors.username.message}
              </p>
            )}

            <input
              type="email"
              placeholder="Enter your email"
              className={`border w-full p-2 mb-3 ${errors.email ? "border-red-500" : ""
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
              className={`border w-full p-2 mb-3 ${errors.password ? "border-red-500" : ""
                }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Confirm your password"
              className={`border w-full p-2 mb-3 ${errors.password2 ? "border-red-500" : ""
                }`}
              {...register("password2", {
                required: "Please confirm your password",
              })}
            />
            {errors.password2 && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password2.message}
              </p>
            )}

            <div className="flex justify-between items-center mb-4 text-sm">
              <Link href="/login" className="hover:underline">
                Already have an account?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-2 disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
