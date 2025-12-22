"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  // number (id) wale part hata do
  const breadcrumbParts = parts.filter((p) => !/^\d+$/.test(p));

  return (
    <div className="flex justify-center items-center py-10 bg-[#f7f7f7] mt-20">
      <div className="uppercase flex gap-2 text-sm">
        {/* Home */}
        <Link href="/" className="text-gray-500 hover:text-black">
          Home
        </Link>

        {breadcrumbParts.map((part, index) => {
          // yaha tak ka path banao
          const href = "/" + breadcrumbParts.slice(0, index + 1).join("/");

          return (
            <React.Fragment key={index}>
              <span>/</span>

              {index === breadcrumbParts.length - 1 ? (
                // last item → clickable nahi
                <span className="text-black">{part}</span>
              ) : (
                // middle items → clickable
                <Link
                  href={href}
                  className="text-gray-500 hover:text-black"
                >
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
