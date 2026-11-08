"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavLinks = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="border-t border-gray-200 py-1.5">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-start gap-2 sm:gap-3 min-w-max">
     
        {isLoading ? (
          <div className="flex items-center gap-3 py-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-16 bg-[#eef3ef] rounded-full animate-pulse"
              />
            ))}
          </div>
        ) : (
          categories.map((category) => {
            const categoryPath = `/category/${category.slug}`;
            const isActive = pathname === categoryPath;

            return (
              <Link
                key={category.id}
                href={categoryPath}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-[#107c41] text-white shadow-sm font-semibold"
                    : "text-[#464746] hover:bg-[#f0fdf4] hover:text-[#107c41]"
                }`}
              >
                <span className="text-sm leading-none">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NavLinks;