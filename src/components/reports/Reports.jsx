import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getBookingsByDateRange } from "../../services/reportsService";
import { downloadReport } from "./reportsPdf";
import Tabs from "./Tabs";
import DateRange from "./DateRange";
import Loader from "../common/loader/Loader";
import { toast } from "sonner";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Food Orders");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    const filteredBookings = await getBookingsByDateRange(
      activeTab,
      startDate,
      endDate
    );
    setBookings(filteredBookings);
    setLoading(false);
  };

  const handleDownloadReport = () => {
    downloadReport(activeTab, bookings);
  };

  return (
    <div className="p-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <DateRange
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        fetchBookings={fetchBookings}
        handleDownloadReport={handleDownloadReport}
      />

      <div className="p-6 md:p-8 glass-card h-auto">
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 text-center mb-8 pb-4 border-b border-white/60/60">
          Booking Report for <span className="text-blue-600 italic">{activeTab}</span>
        </h2>
        {bookings.length < 1 ? (
          <p className="font-semibold text-slate-600 font-medium text-center py-6 italic"> No bookings found for this range </p>
        ) : loading ? (
          <Loader msg={"Fetching Reports"} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/40 backdrop-blur-md border border-white/50 border border-slate-850 p-6 rounded-2xl shadow-lg hover:border-white/60 transition-all duration-200"
              >
                <h4 className="text-lg font-bold text-slate-700 mb-3 pb-2 border-b border-slate-900">
                  {booking.name ? (
                    <span>{booking.name}</span>
                  ) : (
                    <span className="text-slate-600 font-medium italic">N/A</span>
                  )}
                </h4>
                <div className="space-y-1.5 text-sm">
                  <p className="text-slate-600 font-medium">
                    <span className="text-slate-600 font-medium font-semibold uppercase tracking-wider text-xs mr-2">Status:</span> 
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      booking.status === 'vacant' || booking.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {booking.status}
                    </span>
                  </p>
                  <p className="text-slate-600 font-medium">
                    <span className="text-slate-600 font-medium font-semibold uppercase tracking-wider text-xs mr-2">Contact:</span> {booking.contact}
                  </p>
                  <p className="text-slate-600 font-medium">
                    <span className="text-slate-600 font-medium font-semibold uppercase tracking-wider text-xs mr-2">Applied:</span>{" "}
                    {new Date(
                      booking.applyDate.seconds * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;