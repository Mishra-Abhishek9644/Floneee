"use client";
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '@/Store/Slices/loginSlice'
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";


const page = () => {
  const dispatch = useDispatch()
  const { register, reset, handleSubmit } = useForm()

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
                  type="username"
                  className="py-2 sm:w-md w-full px-3 outline-hidden border border-gray-300"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                <input
                  type="email"
                  className="py-2 sm:w-md w-full px-3 outline-hidden border border-gray-300"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <input
                  type="password"
                  className="py-2 sm:w-md w-full px-3 outline-hidden border border-gray-300"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <input
                  type="password2"
                  className="py-2 sm:w-md w-full px-3 outline-hidden border border-gray-300"
                  placeholder="Enter Password Again"
                  {...register("password2", { required: true })}
                />
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
