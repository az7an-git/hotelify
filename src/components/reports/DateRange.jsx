import React from "react";
import DatePicker from "react-datepicker";

function DateRange({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  fetchBookings,
  handleDownloadReport,
}) {
  return (
    <div className="flex gap-4 items-center mb-6 flex-wrap max-md:space-y-3">
      <div>
        <label className="block font-semibold mb-1">Start Date:</label>
        <DatePicker
          maxDate={endDate}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="border p-2 rounded "
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">End Date:</label>
        <DatePicker
          minDate={startDate}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={fetchBookings}
        className="bg-green-500 text-white px-4 py-2 rounded lg:mt-7"
      >
        Generate Report
      </button>
      <button
        onClick={handleDownloadReport}
        className="bg-blue-500 text-white px-4 py-2 rounded lg:mt-7"
      >
        Download Report
      </button>
    </div>
  );
}

export default DateRange;