import React from "react";
import { FaDownload } from "react-icons/fa";
import { downloadRecordPDF, formatTimestamp } from "../RecordPDF";

function FoodOrder({ bookingFields, bookings, activeTab }) {
  const handleDownload = (booking) => {
    downloadRecordPDF(booking, activeTab, bookingFields);
  };

  return (
    <div className="w-full overflow-x-auto pb-4 animate-fade-in">
      <div className="min-w-[800px] glass-card rounded-2xl overflow-hidden border border-white/60 shadow-sm">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="bg-white/40 border-b border-white/60">
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider w-full">Items</th>
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40">
            {bookings.map((booking, index) => (
              <tr key={index} className="hover:bg-white/40 transition-colors duration-200">
                <td className="px-6 py-5 font-bold text-slate-800 capitalize">
                  {booking.name || <span className="text-slate-400 italic font-medium">N/A</span>}
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20 capitalize">
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-slate-600">
                  {booking.applyDate?.seconds
                    ? formatTimestamp(booking.applyDate)
                    : booking.applyDate?.toString() || "N/A"}
                </td>
                <td className="px-6 py-5 min-w-[300px] whitespace-normal">
                  <div className="flex flex-col gap-2">
                    {booking.items &&
                      booking.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/50 p-2.5 rounded-xl border border-white/60 shadow-sm">
                          <span className="font-bold text-slate-800 capitalize flex-1 line-clamp-1" title={item.name}>{item.name}</span>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-500/10 px-2 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                          <span className="text-sm font-bold text-slate-600 bg-slate-200/50 px-2 py-0.5 rounded-md">x{item.quantity}</span>
                          <span className="text-sm font-bold text-emerald-600">${item.price}</span>
                        </div>
                      ))}
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <button
                    className="p-3 bg-white/50 hover:bg-white/80 text-amber-700 rounded-full shadow-sm hover:shadow-md border border-white/60 transition-all transform active:scale-95 flex items-center justify-center mx-auto"
                    onClick={() => handleDownload(booking)}
                    title="Download Receipt"
                  >
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodOrder;