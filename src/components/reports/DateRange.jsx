import React from "react";
import CustomDatePicker from "../common/forms/CustomDatePicker";

function DateRange({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  fetchBookings,
  handleDownloadReport,
}) {
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-end mb-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
        <div className="flex flex-col space-y-1.5 w-full">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Start Date</label>
          <CustomDatePicker
            maxDate={endDate}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="flex flex-col space-y-1.5 w-full">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">End Date</label>
          <CustomDatePicker
            minDate={startDate}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center w-full md:w-auto pt-2 md:pt-0">
        <button
          onClick={fetchBookings}
          className="flex-1 sm:flex-none px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition duration-200 text-sm shadow-lg shadow-amber-600/20 active:scale-95 text-center"
        >
          Filter Report
        </button>
        {(startDate || endDate) && (
          <button
            onClick={handleClear}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold transition duration-200 text-sm active:scale-95 text-center"
          >
            Clear Dates
          </button>
        )}
        <button
          onClick={handleDownloadReport}
          className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-gold-400/20 hover:border-gold-400/40 rounded-xl font-bold transition duration-200 text-sm active:scale-95 text-center"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default DateRange;