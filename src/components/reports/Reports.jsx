import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getBookingsByDateRange } from "../../services/reportsService";
import { downloadReport } from "./reportsPdf";
import Tabs from "./Tabs";
import DateRange from "./DateRange";
import Loader from "../common/loader/Loader";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Food Orders");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
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

      <div className="p-6 bg-gray-100 h-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Booking Report for <span className="italic">{activeTab}</span>
        </h2>
        {bookings.length < 1 ? (
          <p className="font-semibold text-lg text-center"> No Bookings yet </p>
        ) : loading ? (
          <Loader msg={"Fetching Reports"} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <h4 className="text-xl font-semibold mb-2 text-gray-800">
                  {booking.name ? (
                    <span> {booking.name} </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </h4>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Status:</span> {booking.status}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Contact:</span>{" "}
                  {booking.contact}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Applied Date:</span>{" "}
                  {new Date(
                    booking.applyDate.seconds * 1000
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;