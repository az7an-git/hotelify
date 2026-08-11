import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

function BookingForm({ handleBooking, name, setName, contact, setContact, cnic, setCnic, startDate, setStartDate, endDate, setEndDate, totalRate, loading, onClose, title = "Complete Reservation" }) {
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setToday(formattedDate);
  }, []);

  const inputStyle = {
    backgroundColor: '#070b13',
    color: '#ffffff',
    borderColor: '#334155'
  };

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: '#0f172a', borderColor: '#d4a44c' }}
        className="relative w-full max-w-md border rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-5 text-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <FaCalendarAlt style={{ color: '#fbbf24' }} className="text-lg" />
            <h3 style={{ color: '#ffffff' }} className="text-lg font-bold">
              {title}
            </h3>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{ backgroundColor: '#1e293b', color: '#cbd5e1' }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm hover:text-white"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="space-y-1">
            <label style={{ color: '#94a3b8' }} className="text-[11px] font-bold uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                if (e.target.value.length <= 25) setName(e.target.value);
              }}
              placeholder="e.g. John Doe"
              style={inputStyle}
              className="w-full rounded-xl px-4 py-2.5 outline-none transition-all text-sm border focus:border-amber-400 placeholder-slate-500"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1">
            <label style={{ color: '#94a3b8' }} className="text-[11px] font-bold uppercase tracking-wider">Contact Number</label>
            <input
              type="number"
              value={contact}
              onChange={(e) => {
                if (e.target.value.length <= 12) setContact(e.target.value);
              }}
              placeholder="e.g. 03001234567"
              style={inputStyle}
              className="w-full rounded-xl px-4 py-2.5 outline-none transition-all text-sm border focus:border-amber-400 placeholder-slate-500"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1">
            <label style={{ color: '#94a3b8' }} className="text-[11px] font-bold uppercase tracking-wider">CNIC (no hyphens)</label>
            <input
              type="number"
              value={cnic}
              onChange={(e) => {
                if (e.target.value.length <= 13) setCnic(e.target.value);
              }}
              placeholder="e.g. 4210112345671"
              style={inputStyle}
              className="w-full rounded-xl px-4 py-2.5 outline-none transition-all text-sm border focus:border-amber-400 placeholder-slate-500"
              disabled={loading}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label style={{ color: '#94a3b8' }} className="text-[11px] font-bold uppercase tracking-wider">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={inputStyle}
                className="w-full rounded-xl px-3 py-2 outline-none text-xs border focus:border-amber-400 [color-scheme:dark]"
                max={endDate}
                min={today}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-1">
              <label style={{ color: '#94a3b8' }} className="text-[11px] font-bold uppercase tracking-wider">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={inputStyle}
                className="w-full rounded-xl px-3 py-2 outline-none text-xs border focus:border-amber-400 [color-scheme:dark]"
                min={startDate || today}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Total Rate Display */}
          <div style={{ backgroundColor: '#1e293b', borderColor: 'rgba(245, 158, 11, 0.4)' }} className="p-3 rounded-2xl border text-center my-2">
            <p style={{ color: '#e2e8f0' }} className="text-xs font-semibold">
              Total Calculated Amount: <span style={{ color: '#fbbf24' }} className="text-base font-bold ml-1">${totalRate}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                style={{ backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#475569' }}
                className="w-1/3 py-3 rounded-full text-xs font-bold border transition-all active:scale-95 hover:bg-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ background: 'linear-gradient(to right, #d4a44c, #b8862e)', color: '#070b13' }}
              className={`${onClose ? 'w-2/3' : 'w-full'} py-3.5 rounded-full text-sm font-bold shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Applying...</span>
                </>
              ) : "Apply Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default BookingForm;
