"use client";
import React from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';

const Breadcrumb = () => {
  const pathname = usePathname();  
  const parts = pathname.split("/").filter(Boolean);

  const breadcrumbParts = parts.map((p) =>
    /^\d+$/.test(p) ? null : p
  ).filter(Boolean);

  return (
    <div className='flex justify-center items-center py-10 bg-[#f7f7f7] md:mt-16 mt-0'>
      <div className='uppercase flex gap-2'>
        <Link href="/" className='text-gray-500 hover:text-black'>Home</Link>
        {breadcrumbParts.map((p, index) => (
          <React.Fragment key={index}>
            <span>/</span>
            <span className="text-black">{p}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
