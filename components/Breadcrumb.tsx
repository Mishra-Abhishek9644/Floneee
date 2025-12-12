"use client";
import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link';


const Breadcrumb = () => {
    const pathname = usePathname();
    const page = pathname.replace("/", "");
    return (
        <>
            <div className='flex justify-center items-center py-10 bg-[#f7f7f7] mt-16'>
                <div className='uppercase'>
                    <Link href="/" className='text-gray-500 hover:text-black'>Home</Link>
                    <span className='px-2'> / </span>
                    {page}
                </div>
            </div>
        </>
    )
}

export default Breadcrumb