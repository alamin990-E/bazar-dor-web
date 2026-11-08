import Hero from "@/components/Hero";
import PriceMarquee from "@/components/PriceMarquee";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <PriceMarquee></PriceMarquee>
        <Hero></Hero>
    </div>
  );
}
