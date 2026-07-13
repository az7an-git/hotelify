import React from "react";
import DatePicker from "react-datepicker";

function CustomDatePicker({
  selected,
  onChange,
  minDate,
  maxDate,
  placeholderText,
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
      className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm w-full md:w-auto"
      {...props}
    />
  );
}

export default CustomDatePicker;
