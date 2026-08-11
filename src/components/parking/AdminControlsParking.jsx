import React, { useEffect, useState } from "react";
import {
  getParkingBookings,
  sendParkingBookingNotification,
  updateParkingBookingStatus,
} from "../../services/parkingService";
import Loader from "../common/loader/Loader";

let parkingBookingsCache = null;

function AdminControlsParking({ isActive }) {
  const [bookings, setBookings] = useState(parkingBookingsCache || []);
  const [loading, setLoading] = useState(!parkingBookingsCache);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchParkingInfo = async () => {
      if (!parkingBookingsCache) {
        setLoading(true);
      }
      const appliedBookings = await getParkingBookings();
      parkingBookingsCache = appliedBookings;
      setBookings(appliedBookings);
      setLoading(false);
    };
    if (isActive) {
      fetchParkingInfo();
    }
  }, [isActive]);

  const handleStatusChange = async (
    bookingId,
    userId,
    newStatus,
    userName,
    spotName,
    startDate,
    endDate,
    actionKey
  ) => {
    try {
      setProcessingId(`${bookingId}-${actionKey}`);
      await updateParkingBookingStatus(bookingId, newStatus);

      const notificationMessage = {
        accepted: "Your Parking Spot booking has been accepted!",
        rejected: "Your Parking Spot booking has been rejected.",
        checkedIn: "Parking Check-In successful! Spot ready.",
        checkedOut: "Parking Check-Out successful! Thank you.",
      };

      await sendParkingBookingNotification(
        userId,
        notificationMessage[newStatus],
        spotName,
        userName,
        startDate,
        endDate,
        newStatus
      );

      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      parkingBookingsCache = updatedBookings;
      setBookings(updatedBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  const activeBookings = bookings.filter(
    (b) => b.status !== "rejected" && b.status !== "checkedOut"
  );

  return loading ? (
    <Loader msg={"Fetching Parking Booking Notifications"} />
  ) : (
    <div className="p-4 sm:p-6">
      {activeBookings.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No parking bookings pending action.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {activeBookings.map((booking) => (
            <div key={booking.id} className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Booking from <span className="text-amber-400 font-semibold">{booking.userName}</span>
                  </h3>
                  <div className="text-sm space-y-2 mb-4 text-slate-300">
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Spot Name:</span>
                      <span className="text-slate-100 font-semibold text-right">{booking.spotName}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Category:</span>
                      <span className="text-slate-100 font-semibold text-right">{booking.spotCategory}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Booked From:</span>
                      <span className="text-slate-100 font-semibold">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Booked Until:</span>
                      <span className="text-slate-100 font-semibold">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Total Rate:</span>
                      <span className="text-amber-400 font-bold">${booking.totalRate}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                {booking.status === "pending" && (
                  <>
                    <button
                      disabled={!!processingId}
                      onClick={() =>
                        handleStatusChange(
                          booking.id,
                          booking.userId,
                          "accepted",
                          booking.userName,
                          booking.spotName,
                          booking.startDate,
                          booking.endDate,
                          "accept"
                        )
                      }
                      className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${booking.id}-accept` ? "Processing..." : "Accept"}
                    </button>
                    <button
                      disabled={!!processingId}
                      onClick={() =>
                        handleStatusChange(
                          booking.id,
                          booking.userId,
                          "rejected",
                          booking.userName,
                          booking.spotName,
                          booking.startDate,
                          booking.endDate,
                          "reject"
                        )
                      }
                      className="flex-1 px-4 py-2 bg-rose-500 hover:bg-rose-450 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-rose-500/10 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${booking.id}-reject` ? "Processing..." : "Reject"}
                    </button>
                  </>
                )}

                {booking.status === "accepted" && (
                  <button
                    disabled={!!processingId}
                    onClick={() =>
                      handleStatusChange(
                        booking.id,
                        booking.userId,
                        "checkedIn",
                        booking.userName,
                        booking.spotName,
                        booking.startDate,
                        booking.endDate,
                        "checkin"
                      )
                    }
                    className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-amber-500/10 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {processingId === `${booking.id}-checkin` ? "Processing..." : "Check In"}
                  </button>
                )}

                {booking.status === "checkedIn" && (
                  <button
                    disabled={!!processingId}
                    onClick={() =>
                      handleStatusChange(
                        booking.id,
                        booking.userId,
                        "checkedOut",
                        booking.userName,
                        booking.spotName,
                        booking.startDate,
                        booking.endDate,
                        "checkout"
                      )
                    }
                    className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-purple-500/10 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {processingId === `${booking.id}-checkout` ? "Processing..." : "Check Out"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminControlsParking;
