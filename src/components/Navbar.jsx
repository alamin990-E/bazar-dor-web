"use client";


import Link from "next/link";

import { GiShoppingCart } from "react-icons/gi";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import DateShow from "./DateShow";
import { FaUser } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { LogOut } from "lucide-react";
import NavLinks from "./NavLinks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const router = useRouter();
 
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const user = isSigningOut ? null : session?.user;

 

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            setTimeout(() => {
              setIsSigningOut(true);
              router.push("/signin");
              router.refresh();
            }, 1000);
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করা যায়নি!");
    }
  };
  return (
    <nav className="bg-white border-b border-gray-200 px-4 sticky top-0 z-50 shadow-xs">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between py-3 mb-2">
          {/* Logo and Date */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#047C37] text-white flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:bg-[#03632C] transition-colors shrink-0">
              <GiShoppingCart size={22} className="scale-x-[-1] sm:hidden" />
              <GiShoppingCart
                size={24}
                className="scale-x-[-1] hidden sm:block"
              />
            </div>

            <div className="leading-tight">
              <h1 className="font-extrabold text-[#1D271F] text-[14px] sm:text-xl tracking-tight">
                বাজার দর
              </h1>
              <DateShow colorClass="text-[#1D271F]"></DateShow>
            </div>
          </Link>

          <div className="flex items-center">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
            ) : user ? (
              <details className="dropdown dropdown-end">
                <summary className="flex cursor-pointer list-none items-center gap-2 p-1">
                  <img
                    src={user?.image || "/avatar.png"}
                    alt={user?.name || "User"}
                    className="h-10 w-10 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-sm font-semibold text-gray-800 hidden sm:inline">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <span className="text-[14px] text-gray-400">
                    <AiFillCaretDown />
                  </span>
                </summary>

                <div className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl">
                  <div className="mb-4 px-3 py-2">
                    <h3 className="text-[14px] md:text-[16px] font-bold text-[#1D271F] leading-tight">
                      {user?.name || "User"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-[13px] md:text-[15px] font-medium px-3 py-2 text-[#1D271F] hover:bg-green-50 rounded-[10px] hover:text-green-700 transition-colors"
                    >
                      <span>
                        <FaUser className="w-4 h-4" />
                      </span>
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-[13px] md:text-[15px] text-sm font-medium text-red-500 hover:text-red-600 hover:bg-[#fef2f2] px-3 py-2 rounded-[10px] transition-colors cursor-pointer text-left"
                    >
                      <span className="leading-none">
                        <LogOut className="w-4 h-4" />
                      </span>
                      সাইন আউট
                    </button>
                  </div>
                </div>
              </details>
            ) : (
              /* Buttons */
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/signin"
                  className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#1D271F] hover:bg-green-100 rounded-lg transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-[#047C37] hover:bg-[#03632C] text-white rounded-lg shadow-xs transition-colors"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
        <NavLinks></NavLinks>
      </div>
    </nav>
  );
};

export default Navbar;
