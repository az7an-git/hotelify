import React, { useEffect, useState } from 'react'

function BookingForm({ handleBooking, name, setName, contact, setContact, cnic, setCnic, startDate, setStartDate, endDate, setEndDate, totalRate, loading }) {
  const [today, setToday] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setToday(formattedDate);
  }, []);
  const inputClass = "w-full bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-3 outline-none transition-colors text-sm disabled:opacity-50 mb-3";
  const dateInputClass =
    "w-full bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors text-sm disabled:opacity-50";

  return (
    <form onSubmit={handleBooking} className="mt-4 flex flex-col justify-center items-center w-full max-w-sm mx-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 15) {
            setName(e.target.value);
          }
        }}
        placeholder="Name"
        className={inputClass}
        disabled={loading}
        required
      />
      <input
        type="number"
        value={contact}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 11) {
            setContact(e.target.value);
          }
        }}
        placeholder="Contact Number"
        className={inputClass}
        disabled={loading}
        required
      />
      <input
        type="number"
        value={cnic}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 13) {
            setCnic(e.target.value)
          }
        }}
        placeholder="CNIC (no hyphens)"
        className={inputClass}
        disabled={loading}
        required
      />
      <div className="w-full flex flex-col gap-1 mb-3">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);r
          }}
          className={dateInputClass}
          max={endDate}
          min={today}
          disabled={loading}
          required
        />
      </div>
      <div className="w-full flex flex-col gap-1 mb-4">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          className={dateInputClass}
          min={startDate}
          disabled={loading}
          required
        />
      </div>

      <div className="mb-4 bg-white/40 border border-white/60 px-6 py-2 rounded-full shadow-sm backdrop-blur-md">
        <p className='font-bold text-slate-700 text-sm'>Total: <span className="text-amber-600">${totalRate}</span></p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="glass-button-primary w-full py-3.5 rounded-full text-base font-bold shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform active:scale-95 mt-3 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Applying...</span>
          </>
        ) : "Apply Booking"}
      </button>
    </form>
  )
}

export default BookingForm
