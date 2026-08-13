import { useState, useEffect, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getBookingsByDateRange } from "../../services/reportsService";
import { downloadReport } from "./reportsPdf";
import Tabs from "./Tabs";
import DateRange from "./DateRange";
import Loader from "../common/loader/Loader";
import { toast } from "sonner";

const getReportFields = (booking, activeTab) => {
  const title = booking.name || booking.userName || booking.hallName || booking.vehicleName || booking.room || "Guest Booking";
  const contact = booking.contact || booking.phone || booking.phoneNumber || booking.email || booking.cnic || "N/A";

  let itemInfo = null;
  if (activeTab === "Food Orders" && Array.isArray(booking.items)) {
    itemInfo = booking.items.map(i => `${i.name} (x${i.quantity})`).join(", ");
  } else if (activeTab === "Rental Orders") {
    itemInfo = booking.vehicleName || booking.orderedVehicle || null;
  } else if (activeTab === "Room Orders") {
    itemInfo = booking.room || booking.roomName || null;
  } else if (activeTab === "Hall Orders") {
    itemInfo = booking.hallName || null;
  }

  let dateDisplay = "N/A";
  if (booking.applyDate) {
    if (booking.applyDate.seconds) {
      dateDisplay = new Date(booking.applyDate.seconds * 1000).toLocaleDateString();
    } else if (booking.applyDate.toDate) {
      dateDisplay = booking.applyDate.toDate().toLocaleDateString();
    } else if (typeof booking.applyDate === "string") {
      dateDisplay = booking.applyDate;
    }
  } else if (booking.startDate && booking.endDate) {
    dateDisplay = `${booking.startDate} - ${booking.endDate}`;
  } else if (booking.startDate) {
    dateDisplay = booking.startDate;
  } else if (booking.createdAt) {
    if (booking.createdAt.seconds) {
      dateDisplay = new Date(booking.createdAt.seconds * 1000).toLocaleDateString();
    } else if (booking.createdAt.toDate) {
      dateDisplay = booking.createdAt.toDate().toLocaleDateString();
    }
  }

  const totalRate = booking.totalRate || booking.totalPrice || booking.price || null;
  const status = booking.status || "Pending";

  return { title, contact, itemInfo, dateDisplay, totalRate, status };
};

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Food Orders");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBookingsByDateRange(activeTab, startDate, endDate);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching report data:", error);
      toast.error("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }, [activeTab, startDate, endDate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleDownloadReport = () => {
    if (!bookings || bookings.length === 0) {
      toast.error("No data available to download.");
      return;
    }
    downloadReport(activeTab, bookings);
  };

  return (
    <div className="p-4 sm:p-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <DateRange
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        fetchBookings={fetchBookings}
        handleDownloadReport={handleDownloadReport}
      />

      <div className="p-6 md:p-8 glass-card h-auto border border-gold-400/20 shadow-xl backdrop-blur-xl rounded-2xl">
        <h2 className="text-xl md:text-2xl font-extrabold text-white text-center mb-8 pb-4 border-b border-white/10">
          Booking Report for <span className="text-amber-400 italic">{activeTab}</span>
        </h2>
        {loading ? (
          <Loader msg={"Fetching Reports..."} />
        ) : bookings.length < 1 ? (
          <p className="font-semibold text-slate-400 text-center py-12 italic">
            No bookings found {startDate || endDate ? "for the selected date range." : "for this category."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {bookings.map((booking) => {
              const { title, contact, itemInfo, dateDisplay, totalRate, status } = getReportFields(booking, activeTab);

              return (
                <div
                  key={booking.id}
                  className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 hover:border-gold-400/40 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3 pb-2 border-b border-white/10 flex justify-between items-center gap-2">
                      <span className="truncate">{title}</span>
                      {totalRate && (
                        <span className="text-amber-400 font-extrabold text-sm shrink-0">${totalRate}</span>
                      )}
                    </h4>
                    <div className="space-y-2.5 text-sm">
                      <p className="flex justify-between items-center gap-4">
                        <span className="font-semibold !text-amber-400">Status:</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${status === "vacant" || status === "paid" || status === "accepted" || status === "Accepted" || status === "delivered"
                              ? "bg-emerald-500/20 !text-emerald-300 border-emerald-500/30"
                              : status === "rejected" || status === "Rejected"
                                ? "bg-rose-500/20 !text-rose-300 border-rose-500/30"
                                : "bg-amber-500/20 !text-amber-300 border-amber-500/30"
                            }`}
                        >
                          {status}
                        </span>
                      </p>
                      {itemInfo && (
                        <p className="flex justify-between items-center gap-4">
                          <span className="font-semibold !text-amber-400">Details:</span>
                          <span className="!text-white font-bold text-right truncate max-w-[65%]">{itemInfo}</span>
                        </p>
                      )}
                      <p className="flex justify-between items-center gap-4">
                        <span className="font-semibold !text-amber-400">Contact:</span>
                        <span className="!text-white font-bold text-right">{contact}</span>
                      </p>
                      <p className="flex justify-between items-center gap-4">
                        <span className="font-semibold !text-amber-400">Date:</span>
                        <span className="!text-white font-bold text-right">{dateDisplay}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;