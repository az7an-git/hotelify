import React from "react";
import { FaDownload } from "react-icons/fa";
import { downloadRecordPDF, formatTimestamp } from "../RecordPDF";

function Rooms({ bookingFields, bookings, activeTab }) {
  const handleDownload = (booking) => {
    downloadRecordPDF(booking, activeTab, bookingFields);
  };

  return (
    <div className="w-full overflow-x-auto pb-4 animate-fade-in [transform:rotateX(180deg)]">
      <div className="min-w-[800px] glass-card rounded-2xl overflow-hidden border border-white/60 shadow-sm [transform:rotateX(180deg)]">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="bg-white/40 border-b border-white/60">
              {bookingFields[activeTab].map((field) => (
                <th key={field} className="px-6 py-4 text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {field}
                </th>
              ))}
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40">
            {bookings.map((booking, index) => (
              <tr key={index} className="hover:bg-white/40 transition-colors duration-200">
                {bookingFields[activeTab].map((field) => (
                  <td key={field} className="px-6 py-5 font-bold text-slate-800 capitalize">
                    {field === "status" ? (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-700 border border-blue-500/20 capitalize">
                        {booking[field] || "Pending"}
                      </span>
                    ) : booking[field]?.seconds ? (
                      <span className="text-sm font-medium text-slate-600">{formatTimestamp(booking[field])}</span>
                    ) : (
                      booking[field]?.toString() || <span className="text-slate-400 italic font-medium">N/A</span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-5 text-center">
                  <button
                    className="p-3 bg-white/50 hover:bg-white/80 text-blue-600 rounded-full shadow-sm hover:shadow-md border border-white/60 transition-all transform active:scale-95 flex items-center justify-center mx-auto"
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

export default Rooms;