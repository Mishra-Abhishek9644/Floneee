"use client";
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '@/Store/Slices/loginSlice'
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';


interface RegisterForm {
  username: string;
  email: string;
  password: string;
  password2: string;
}



const page = () => {
  const dispatch = useDispatch()
  const { register, reset, handleSubmit,formState: { errors } } = useForm<RegisterForm>()
  const route = useRouter()

  const { users } = useSelector(
    (state: any) => state.login
  );


  const onSubmit = (data: any) => {
    if (data.password !== data.password2) {
      toast.error("Passwords do not match");
      return;
    }

    const userExists = users.some(
      (u: any) => u.username === data.username && u.email === data.email
    );
    if (userExists) {
      toast.error("User Already has an account");
    }
    else {
      dispatch(signup({
        username: data.username,
        email: data.email,
        password: data.password
      }));
      toast.success("Signed Up Successfully");
      route.push("/login")
      reset();
    }
  }

  return (
    <>
      <Breadcrumb />

      <div className="flex justify-center items-center">
        <div className="w-full md:w-fit p-5 sm:p-20">

          <div className="text-center text-2xl font-bold">
            <Link className='pr-2' href="/login">Login</Link>
            <span className="border-l text-purple-600 pl-2">Register</span>
          </div>

          <div className="shadow-xl border border-gray-300 p-5 w-full sm:p-20 my-10 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">

                <input
                  type="text"
                  className={`py-2 sm:w-md w-full px-3 outline-hidden border ${errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Username"
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}

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
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <input
                  type="password"
                  className={`py-2 sm:w-md w-full px-3 outline-hidden border ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                <input
                  type="password"
                  className={`py-2 sm:w-md w-full px-3 outline-hidden border ${errors.password2 ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Enter Password Again"
                  {...register("password2", {
                    required: "Please confirm your password",
                  })}
                />
                {errors.password2 && (
                  <p className="text-red-500 text-sm">{errors.password2.message}</p>
                )}
              </div>

              <div className="mt-10">
                <button
                  className="bg-gray-200 hover:bg-purple-600 hover:text-white px-8 py-2 uppercase text-sm duration-700"
                  type='submit'
                >
                  Register
                </button>

              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default page;
