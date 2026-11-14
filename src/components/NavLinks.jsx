"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLinks = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
        );

        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      aria-label="Category Navigation"
      className="flex items-center gap-2 sm:gap-4 md:gap-6 py-2.5 border-t border-gray-200 overflow-x-auto scrollbar-thin"
    >
      {categories.map((cat) => {
        const isActive =
          pathname === `/${cat.slug}` || pathname === `/category/${cat.slug}`;

        return (
          <Link
            prefetch={false}
            key={cat.id}
            href={`/category/${cat.slug}`}
            title={cat.descriptionBn}
            className={`flex shrink-0 items-center rounded-lg gap-1 px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#047C37] text-white"
                : "bg-white hover:bg-gray-300 text-[#1D271F]"
            }`}
          >
            <span className="text-sm sm:text-base leading-none">
              {cat.icon}
            </span>
            <span>{cat.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
