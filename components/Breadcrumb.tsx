"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 bg-[#f7f7f7] mt-20 animate-pulse">
        <div className="flex gap-3">
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>
      </div>
    );
  }

  const parts = pathname.split("/").filter(Boolean);

  // Remove MongoDB ObjectId parts
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
