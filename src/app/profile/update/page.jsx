"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-pulse">
        
          <div className="h-4 w-32 bg-gray-200 rounded mb-6"></div>

         
          <div className="h-7 w-48 bg-gray-200 rounded mb-6"></div>

          <div className="space-y-5">
            
            <div>
              <div className="h-3 w-12 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
            </div>

            <div className="h-11 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <Link
          href="/profile"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          প্রোফাইলে ফিরে যান
        </Link>

        <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F] mb-6">
          তথ্য পরিবর্তন করুন
        </h2>

        <UpdateForm key={user.id} initialName={user.name || ""} />
      </div>
    </div>
  );
};

const UpdateForm = ({ initialName }) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নামের ঘরটি পূরণ করুন!");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("প্রোফাইল আপডেট করা হচ্ছে...");

    try {
      const res = await updateUser({ name: name.trim() });

      if (res?.error) {
        toast.error(res.error.message || "প্রোফাইল আপডেট করা যায়নি!", {
          id: loadingToast,
        });
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!", { id: loadingToast });
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("একটি অপ্রত্যাশিত সমস্যা হয়েছে!", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-[#1D271F] mb-2">
          নাম
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm text-gray-800"
          placeholder="আপনার নাম লিখুন"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 flex items-center justify-center rounded-lg bg-green-700 hover:bg-green-800 text-white font-medium text-sm transition disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
            আপডেট হচ্ছে...
          </>
        ) : (
          "তথ্য আপডেট করুন"
        )}
      </button>
    </form>
  );
};

export default UpdateProfilePage;