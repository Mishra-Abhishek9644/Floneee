"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginUser } from "@/lib/auth";
import { setUser } from "@/Store/Slices/loginSlice";
import { AppDispatch, RootState } from "@/Store";
import { fetchCart } from "@/Store/Slices/cartSlice";
import { fetchCompare } from "@/Store/Slices/compareSlice";
import { fetchWishlist } from "@/Store/Slices/wishlistSlice";

interface LoginForm {
  email: string;
  password: string;
}

const page = () => {
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

      setIsSubmitting(true); // 🔒 disable button

      const res = await loginUser(data);

      dispatch(setUser(res.user));
      dispatch(fetchCart());
      dispatch(fetchCompare());
      dispatch(fetchWishlist());

      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message || "Invalid email or password");
      reset();
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

  /*  SKELETON  */
  if (loading) {
    return (
      <>
        <Breadcrumb />

        <div className="flex justify-center items-center animate-pulse">
          <div className="w-full md:w-3xl p-5 sm:p-20">
            <div className="h-8 w-40 bg-gray-300 mx-auto rounded mb-10" />

            <div className="shadow-xl border border-gray-300 p-5 w-full sm:p-20 my-10 rounded-md">
              <div className="grid gap-4">
                <div className="h-10 w-full bg-gray-300 rounded" />
                <div className="h-10 w-full bg-gray-300 rounded" />
              </div>

              <div className="flex justify-between my-8">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-28 bg-gray-300 rounded" />
              </div>

              <div className="h-10 w-32 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb />

      <div className="flex justify-center items-center">
        <div className="w-full md:w-3xl p-5 sm:p-20">
          <div className="text-center text-2xl font-bold text-purple-600">
            <span className="pr-2">Login</span>
            <Link href={`/register`} className="border-l text-black pl-2">
              Register
            </Link>
          </div>

          <div className="shadow-xl border border-gray-300 p-5 w-full sm:p-20 my-10 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="email"
                  className={`py-2 sm:w-md w-full px-3 outline-hidden border ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}

                <input
                  type="password"
                  className={`py-2 sm:w-md w-full px-3 outline-hidden border ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start my-8">
                <div>
                  <input type="checkbox" />&nbsp; Remember me
                </div>
                <a className="hover:text-purple-600 cursor-pointer">
                  Forgot Password
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-2 uppercase text-sm duration-300 flex items-center justify-center gap-2
    ${isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-purple-600 hover:text-white"
                    }
  `}
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

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
