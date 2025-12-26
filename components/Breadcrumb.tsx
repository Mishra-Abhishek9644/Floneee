"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  // Remove ID parts (MongoDB ObjectId)
  const breadcrumbParts = parts.filter(
    (p) => !/^[a-f0-9]{24}$/i.test(p)
  );

  return (
    <div className="flex justify-center items-center py-10 bg-[#f7f7f7] mt-20">
      <div className="uppercase flex gap-2 text-sm">
        <Link href="/" className="text-gray-500 hover:text-black">
          Home
        </Link>

        {breadcrumbParts.map((part, index) => {
          const href = "/" + breadcrumbParts.slice(0, index + 1).join("/");

          return (
            <React.Fragment key={href}>
              <span>/</span>

              {index === breadcrumbParts.length - 1 ? (
                <span className="text-black">{part}</span>
              ) : (
                <Link href={href} className="text-gray-500 hover:text-black">
                  {part}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
