import React, { useState, useEffect } from "react";
import { toggleParkingAvailability, bookParkingSpot } from "../../services/parkingService";
import { useAuth } from "../../contexts/authContext";
import { ADMIN_UID } from "../../firebase/Firebase";
import CustomDatePicker from "../common/forms/CustomDatePicker";
import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const ParkingCard = ({ vehicle }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalRate, setTotalRate] = useState(0);
  const [booking, setBooking] = useState(false);
  const { currentUser } = useAuth();
  const [isAvailable, setIsAvailable] = useState(vehicle.isAvailable);

  // Calculate the rate based on selected dates
  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = endDate - startDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const days = diffDays === 0 ? 1 : diffDays;
      const rate = days * vehicle.rate;
      setTotalRate(rate > 0 ? rate : 0);
    } else {
      setTotalRate(0);
    }
  }, [startDate, endDate, vehicle.rate]);

  // Toggle Availability (Admin only)
  const handleToggleAvailability = async () => {
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    await toggleParkingAvailability(vehicle.id, newAvailability);
  };

  // Book parking spot (regular users)
  const handleBooking = async () => {
    if (!currentUser) {
      toast.error(NOTIFICATIONS.PARKING_BOOKING_LOGIN_REQUIRED);
      return;
    }
    if (!startDate || !endDate) {
      toast.error(NOTIFICATIONS.PARKING_BOOKING_DATES_REQUIRED);
      return;
    }
    if (!isAvailable) {
      toast.error("This parking spot is currently unavailable.");
      return;
    }
    try {
      setBooking(true);
      await bookParkingSpot({
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email,
        spotId: vehicle.id,
        spotName: vehicle.name,
        spotCategory: vehicle.category,
        startDate,
        endDate,
        totalRate,
      });
      toast.success(NOTIFICATIONS.PARKING_BOOKING_SUCCESS);
      setStartDate(null);
      setEndDate(null);
    } catch {
      toast.error(NOTIFICATIONS.PARKING_BOOKING_ERROR);
    } finally {
      setBooking(false);
    }
  };

  const isAdmin = currentUser && currentUser.uid === ADMIN_UID;

  return (
    <div className="glass-card max-w-sm w-full mx-auto p-4 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform duration-300">
      <div className="space-y-4 flex flex-col flex-grow">
        <div className="relative rounded-xl overflow-hidden shadow-sm border border-white/50 bg-white/20 flex items-center justify-center h-48 flex-shrink-0">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/60 shadow-sm">
            ${vehicle.rate}/day
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-between space-y-2">
          <div className="px-2">
            <div className="flex justify-between items-center font-semibold text-slate-800 text-xl">
              <div className="capitalize">{vehicle.name}</div>
            </div>
            <p className="text-slate-500 italic py-2 text-sm line-clamp-2">
              {vehicle.category}
            </p>
          </div>

          <div className="space-y-3 mt-2 px-2 pb-2">
            <div className="flex justify-between items-center gap-2">
              <label className="text-slate-600 font-medium text-sm flex-shrink-0">Start Date:</label>
              <div className="w-[150px] flex-shrink-0">
                <CustomDatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (endDate && date >= endDate) {
                      setEndDate(null);
                    }
                  }}
                  minDate={new Date()}
                  placeholderText="Select start date"
                  className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md rounded-xl px-2 py-1.5 outline-none focus:border-amber-400 focus:bg-white/80 text-sm w-full"
                  wrapperClassName="w-full"
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <label className="text-slate-600 font-medium text-sm flex-shrink-0">End Date:</label>
              <div className="w-[150px] flex-shrink-0">
                <CustomDatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                  placeholderText="Select end date"
                  className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md rounded-xl px-2 py-1.5 outline-none focus:border-amber-400 focus:bg-white/80 text-sm w-full"
                  wrapperClassName="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 pt-2 border-t border-white/40 flex-shrink-0 space-y-3">
        <p className="text-slate-800 font-semibold text-lg flex justify-between items-center">
          <span>Total Rate:</span>
          <span className="text-amber-700 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-200/50">${totalRate}</span>
        </p>

        {isAdmin ? (
          // Admin: toggle availability button
          <button
            className={`w-full py-2.5 rounded-xl transition-all duration-300 shadow-md border ${
              isAvailable
                ? "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 border-emerald-300/50 text-white"
                : "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 border-rose-300/50 text-white"
            } font-semibold backdrop-blur-sm`}
            onClick={handleToggleAvailability}
          >
            {isAvailable ? "Mark Unavailable" : "Mark Available"}
          </button>
        ) : (
          // Regular user: status badge + Book Now button
          <>
            <div className="flex justify-between items-center px-1">
              <span className="text-slate-600 font-semibold text-sm">Status:</span>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold border tracking-wider uppercase ${
                  isAvailable
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
            <button
              onClick={handleBooking}
              disabled={booking || !isAvailable}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md border ${
                !isAvailable
                  ? "bg-white/10 text-slate-500 border-white/20 cursor-not-allowed"
                  : booking
                  ? "bg-amber-600/60 text-white border-amber-500/30 cursor-wait"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-amber-400/50 text-white active:scale-95"
              }`}
            >
              {booking ? "Booking..." : !isAvailable ? "Not Available" : "Book Now"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ParkingCard;