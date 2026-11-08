import Link from "next/link";
import Image from "next/image";
import DateShow from "./DateShow";
import Banner from "../assets/bazar-hero.png";

const Hero = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8 rounded-2xl border border-[#e5ebe7] bg-[#f9faf9] p-6 sm:p-8 md:p-10 lg:p-12 shadow-xs">
        {/* Left Content */}
        <div className="w-full md:w-3/5 flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* Date Badge */}
          <div className="mb-4 inline-flex items-center rounded-full bg-[#e6f4ea] px-3.5 py-1 text-xs font-semibold text-[#137333]">
            <DateShow />
          </div>

          {/* Main Heading */}
          <h1 className="mb-3 text-[22px] sm:text-[25px] md:text-[29px] lg:text-4xl font-extrabold tracking-tight text-[#1D271F]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mb-6 max-w-xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-[#5f6d64]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Primary CTA Button */}
          <Link
            href="#সব-পণ্য"
            className="inline-flex items-center justify-center rounded-lg bg-[#008744] hover:bg-[#00733a] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Banner Image */}
        <div className="w-full md:w-2/5 flex items-center justify-center mt-4 md:mt-0">
          <div className="flex items-center justify-center w-80 sm:w-75 md:w-85 lg:w-96 aspect-4/3">
            <Image
              src={Banner}
              alt="বাজার দর হিরো ব্যানার"
              width={384}
              height={288}
              priority
              sizes="(max-width: 768px) 256px, 384px"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
