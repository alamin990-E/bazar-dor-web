"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.push("/signin");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করা যায়নি!");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-100 sm:max-w-140 mx-auto text-center sm:text-start animate-pulse">
          <div className="h-8 w-44 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-5 w-60 bg-gray-200 rounded-md mb-8"></div>

          <div className="bg-white p-6 rounded-xl gap-5 shadow-md flex flex-col sm:flex-row items-center sm:justify-between mb-6 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
              <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0"></div>
              <div className="space-y-2 w-full sm:w-auto">
                <div className="h-5 w-36 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
              </div>
            </div>
            <div className="h-9 w-24 bg-gray-200 rounded-md shrink-0"></div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md w-full">
            <div className="h-5 w-16 bg-gray-200 rounded-md mb-4"></div>
            <div className="mb-4">
              <div className="h-3 w-10 bg-gray-200 rounded-md mb-1"></div>
              <div className="w-full h-10 rounded-lg bg-gray-100"></div>
            </div>
            <div className="w-full h-10 rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-100 sm:max-w-140 mx-auto text-center sm:text-start">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F] mb-2">
          আমার প্রোফাইল
        </h1>
        <p className="text-[14px] sm:text-[16px] text-[#1D271F] mb-8">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl gap-5 shadow-md flex flex-col sm:flex-row items-center sm:justify-between mb-6 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div>
              <div className="w-16 h-16 rounded-full ring-2 ring-green-500 ring-offset-2 overflow-hidden flex items-center justify-center bg-[#be185d] text-white text-2xl font-bold">
                {user?.image && user.image.trim() !== "" ? (
                  <Image
                    width={100}
                    height={100}
                    src={user.image}
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span>{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                )}
              </div>
            </div>
            <div className="text-center sm:text-start">
              <h2 className="text-[16px] sm:text-xl font-semibold text-[#1D271F]">
                {user?.name}
              </h2>
              <p className="text-[14px] sm:text-[16px] text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>

          {/* SignOut Button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-outline btn-error btn-sm cursor-pointer hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            সাইন আউট
          </button>
        </div>

        {/* Update Profile */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md w-full">
          <h2 className="text-base font-bold text-[#1D271F] mb-4">তথ্য</h2>

          <div>
            <label className="block text-xs font-semibold text-[#1D271F] mb-1">
              নাম
            </label>
            <div className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center text-sm text-[#1D271F] mb-4">
              {user?.name}
            </div>
          </div>

          <Link
            href="/profile/update"
            className="block w-full h-10 leading-10 text-center rounded-lg bg-green-700 hover:bg-green-800 text-white font-medium text-sm transition"
          >
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
