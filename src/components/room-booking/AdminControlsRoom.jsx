import React, { useEffect, useState } from "react";
import {
  getRoomBookings,
  sendRoomBookingNotification,
  updateRoomOrderStatus,
} from "../../services/roomBookingService";
import Loader from "../common/loader/Loader";

let roomBookingsCache = null;

function AdminControlsRoom({ isActive }) {
  const [rooms, setRooms] = useState(roomBookingsCache || []);
  const [loading, setLoading] = useState(!roomBookingsCache);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchRoomInfo = async () => {
      if (!roomBookingsCache) {
        setLoading(true);
      }
      const appliedRooms = await getRoomBookings();
      roomBookingsCache = appliedRooms;
      setRooms(appliedRooms);
      setLoading(false);
    };
    if (isActive) {
      fetchRoomInfo();
    }
  }, [isActive]);

  const handleStatusChange = async (
    roomId,
    userId,
    newStatus,
    userName,
    roomName,
    bookedFrom,
    bookedUntil,
    actionKey
  ) => {
    try {
      setProcessingId(`${roomId}-${actionKey}`);
      await updateRoomOrderStatus(roomId, newStatus);

      const notificationMessage = {
        booked: "Your booking has been accepted!",
        rejected: "Your booking has been rejected.",
        checkedIn: "Check in successful! Enjoy your stay",
        checkedOut: "Check out successful! Come again",
      };

      await sendRoomBookingNotification(
        userId,
        notificationMessage[newStatus],
        roomName,
        userName,
        bookedFrom,
        bookedUntil,
        newStatus
      );

      const updatedRooms = rooms.map((room) =>
        room.id === roomId ? { ...room, status: newStatus } : room
      );
      roomBookingsCache = updatedRooms;
      setRooms(updatedRooms);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  const activeRooms = rooms.filter(
    (room) => room.status !== "rejected" && room.status !== "checkedOut"
  );

  return loading ? (
    <Loader msg={"Fetching Room Booking Notifications"} />
  ) : (
    <div className="p-4 sm:p-6">
      {activeRooms.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No room bookings pending action.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {activeRooms.map((room) => (
            <div key={room.id} className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Booking from <span className="text-amber-400 font-semibold">{room.name}</span>
                  </h3>
                  <div className="text-sm space-y-2 mb-4 text-slate-300">
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Room:</span>
                      <span className="text-slate-100 font-semibold text-right">{room.room}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Booked From:</span>
                      <span className="text-slate-100 font-semibold">{room.startDate}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Booked Until:</span>
                      <span className="text-slate-100 font-semibold">{room.endDate}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                {room.status === "vacant" && (
                  <>
                    <button
                      disabled={!!processingId}
                      onClick={() =>
                        handleStatusChange(room.id, room.userId, "booked", room.name, room.room, room.startDate, room.endDate, "accept")
                      }
                      className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${room.id}-accept` ? "Processing..." : "Accept"}
                    </button>
                    <button
                      disabled={!!processingId}
                      onClick={() =>
                        handleStatusChange(room.id, room.userId, "rejected", room.name, room.room, room.startDate, room.endDate, "reject")
                      }
                      className="flex-1 px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-rose-600/20 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${room.id}-reject` ? "Processing..." : "Reject"}
                    </button>
                  </>
                )}

                {room.status === "booked" && (
                  <button
                    disabled={!!processingId}
                    onClick={() =>
                      handleStatusChange(room.id, room.userId, "checkedIn", room.name, room.room, room.startDate, room.endDate, "checkin")
                    }
                    className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {processingId === `${room.id}-checkin` ? "Processing..." : "Check In"}
                  </button>
                )}

                {room.status === "checkedIn" && (
                  <button
                    disabled={!!processingId}
                    onClick={() =>
                      handleStatusChange(room.id, room.userId, "checkedOut", room.name, room.room, room.startDate, room.endDate, "checkout")
                    }
                    className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {processingId === `${room.id}-checkout` ? "Processing..." : "Check Out"}
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

export default AdminControlsRoom;
