"use client";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// Google Icon
const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দুটিই দিন!");
      return;
    }

    setIsLoading(true);

    try {
      const { data: resData, error } = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
        return;
      }

      if (resData?.user) {
        toast.success("স্বাগতম সফলভাবে সাইন ইন হয়েছে");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("সমস্যা হয়েছে! আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google দিয়ে সাইন ইন করা সম্ভব হয়নি!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করা সম্ভব হয়নি!");
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f6f4] flex flex-col justify-center my-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
            সাইন ইন
          </h1>
          <p className="text-sm text-gray-700 mt-2">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Card section */}
        <div className="w-full max-w-107 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-white border-gray-200 rounded-lg text-sm text-gray-700 "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input input-bordered w-full bg-white border-gray-200 rounded-lg text-sm text-gray-700 "
              />
            </div>

            {/* SignIn Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-sm sm:btn-md w-full bg-[#05893e] hover:bg-[#087347] border-none text-white font-medium rounded-lg text-sm sm:text-base shadow-sm transition-all duration-150 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-5 items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink-0 mx-3 text-xs text-gray-700">অথবা</span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* Github and Google signin Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-sm sm:btn-md btn-outline border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-normal rounded-lg normal-case flex items-center justify-center gap-2 cursor-pointer"
            >
              <GoogleIcon />
              <span className="text-xs font-semibold">
                Google দিয়ে চালিয়ে যান
              </span>
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="btn btn-sm sm:btn-md btn-outline border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-normal rounded-lg normal-case flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaGithub className="text-gray-700 text-sm shrink-0" />
              <span className="text-xs font-semibold">
                GitHub দিয়ে চালিয়ে যান
              </span>
            </button>
          </div>

          {/* Bottom Link */}
          <div className="text-center mt-6 text-sm text-gray-700">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="text-emerald-700 font-semibold hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </div>
        </div>

        {/* Back to HomePage Link */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
