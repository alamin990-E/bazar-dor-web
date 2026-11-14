import React from "react";

const DateShow = ({
  colorClass = "text-[#05893E]",
  sizeClass = "text-[11px] sm:text-[12px]",
}) => {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <p
      suppressHydrationWarning
      className={`${sizeClass} ${colorClass} font-medium leading-none`}
    >
      {formattedDate}
    </p>
  );
};

export default DateShow;