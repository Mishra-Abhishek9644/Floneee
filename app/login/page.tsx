"use client";
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup,login } from '@/Store/Slices/loginSlice'
import toast from "react-hot-toast";
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";



const page = () => {
 
  const users = useSelector(
    (state: any) => state.login.users
  );

  const router = useRouter();
  const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    const user = users.find(
      (u: any) =>
        u.email === data.email && u.password === data.password
    );

    if (user) {
      dispatch(login(user));
      toast.success("Logged in successfully");
      router.push("/");
    } else {
      toast.error("No user found");
      reset();
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className=' flex justify-center items-center'>
        <div className='w-full md:w-fit p-5 sm:p-20 '>
          <div className='text-center text-2xl font-bold text-purple-600 '>
            <span className='pr-2' >Login</span> <Link href={`/register`} className='border-l text-black pl-2'>Register</Link>
          </div>
          <div className='shadow-xl border border-gray-300 p-5 w-full sm:p-20 my-10 rounded-md'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-4'>
              <input type="email"  className='py-2 sm:w-md  w-full px-3 outline-hidden border  border-gray-300' placeholder='Email'  {...register("email", { required: true })} />
              <input type="text"  className='py-2 sm:w-md w-full px-3 outline-hidden border border-gray-300' placeholder='Password' {...register("password", { required: true })}/>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 justify-between items-start my-8 '>
              <div>
                <input type="checkbox" />&nbsp; Remember me
              </div>
              <a className='hover:text-purple-600 cursor-pointer'>Forgot Password</a>
            </div>
            <div>
              <button className='bg-gray-200 hover:bg-purple-600 hover:text-white px-8 py-2 uppercase text-sm duration-700' type='submit'>Login</button>
            </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default page