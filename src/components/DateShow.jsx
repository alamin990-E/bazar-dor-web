import React from "react";

const DateShow = () => {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <p
      suppressHydrationWarning
      className="text-[10px] text-[#1D271F] sm:text-[12px] font-medium"
    >
      {formattedDate}
    </p>
  );
};

export default DateShow;