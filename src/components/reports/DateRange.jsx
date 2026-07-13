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
  return (
    <div className="flex gap-4 items-center mb-8 flex-wrap">
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Start Date</label>
        <CustomDatePicker
          maxDate={endDate}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">End Date</label>
        <CustomDatePicker
          minDate={startDate}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <div className="flex gap-3 items-end pt-4 lg:pt-5 w-full md:w-auto">
        <button
          onClick={fetchBookings}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-full font-bold transition duration-200 text-sm shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
        >
          Generate Report
        </button>
        <button
          onClick={handleDownloadReport}
          className="bg-slate-850 hover:bg-slate-800 text-slate-700 border border-slate-750 px-6 py-2.5 rounded-full font-bold transition duration-200 text-sm"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default DateRange;