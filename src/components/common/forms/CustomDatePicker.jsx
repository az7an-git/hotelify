import React from "react";
import DatePicker from "react-datepicker";

function CustomDatePicker({
  selected,
  onChange,
  minDate,
  maxDate,
  placeholderText,
  className,
  wrapperClassName,
  ...props
}) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      placeholderText={placeholderText}
      onKeyDown={(e) => e.preventDefault()}
      className={className || "bg-slate-900/80 text-white border border-gold-400/20 focus:border-gold-400/60 focus:ring-2 focus:ring-amber-400/20 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-sm w-full placeholder-slate-400"}
      wrapperClassName={wrapperClassName || "w-full"}
      {...props}
    />
  );
}

export default CustomDatePicker;
