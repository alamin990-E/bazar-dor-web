import MarqueeText from "react-marquee-text";

const PriceMarquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    return (
      <div className="-mx-4 w-[calc(100%+2rem)] text-center py-2.5 text-xs text-[#1D271F] bg-[#f9faf9] ">
        বাজার দরের লাইভ আপডেট বর্তমানে পাওয়া যাচ্ছে না।
      </div>
    );
  }

  const products = await res.json();

  return (
    <div className="-mx-4 w-[calc(100%+2rem)] border-none  py-3 bg-white overflow-hidden">
      <MarqueeText
        direction="right"
        duration={20}
        playOnlyInView={false}
        pauseOnHover={false}
        className="price-marquee"
      >
        {products.map((product) => {
          const change = product.change?.pct ?? 0;
          const direction = product.change?.dir;

          return (
            <span
              key={product.id}
              className="inline-flex items-center whitespace-nowrap"
            >
              {/* Product Icon */}
              <span className="mr-1.5 text-[14px]">
                {product.image || product.categoryIcon}
              </span>

              {/* Product Name */}
              <span className="font-normal text-[12px] text-black">
                {product.nameBn}
              </span>

              {/* Product Price */}
              <span
                className="ml-1.5 text-[12px] text-[#1D271F]"
              >
                {formatBanglaNumber(product.today)} টাকা/
                {getUnit(product.unit)}
              </span>
              

              {/* Price Change */}
              <span
                className={`ml-1.5 text-[12px] font-bold ${
                  direction === "up"
                    ? "text-[#e54b3d]"
                    : direction === "down"
                      ? "text-[#159447]"
                      : "text-[#858b87]"
                }`}
              >
                {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}
                {formatBanglaNumber(Math.abs(change))}%
              </span>

              {/* Separator */}
              <span className="mx-5 text-[#c7cec9]">•</span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default PriceMarquee;

// Bengali Number
function formatBanglaNumber(value) {
  return new Intl.NumberFormat("bn-BD").format(Number(value) || 0);
}

// Convert Bengali
function getUnit(unit) {
  const units = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit] || unit || "একক";
}
