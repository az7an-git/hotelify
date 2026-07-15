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
    <div className="p-6">
      {activeRooms.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No room bookings pending action.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {activeRooms.map((room) => (
            <div key={room.id} className="glass-card p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-slate-800 mb-3">
                Booking from <span className="italic capitalize text-amber-700">{room.name}</span>
              </h3>
              <div className="text-slate-600 font-medium text-sm space-y-2 mb-4">
                <p className="flex justify-between items-center gap-4">
                  <span className="font-semibold text-slate-600">Room:</span>
                  <span className="text-slate-700 text-right">{room.room}</span>
                </p>
                <p className="flex justify-between items-center gap-4">
                  <span className="font-semibold text-slate-600">Booked From:</span>
                  <span className="text-slate-700">{room.startDate}</span>
                </p>
                <p className="flex justify-between items-center gap-4">
                  <span className="font-semibold text-slate-600">Booked Until:</span>
                  <span className="text-slate-700">{room.endDate}</span>
                </p>
              </div>

              <div className="flex gap-3 pt-3 border-t border-white/60">
                {room.status === "vacant" && (
                  <>
                    <button
                      disabled={!!processingId}
                      onClick={() =>
                        handleStatusChange(room.id, room.userId, "booked", room.name, room.room, room.startDate, room.endDate, "accept")
                      }
                      className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${room.id}-accept` ? "Processing..." : "Accept"}
                    </button>
                    <button
                      disabled={!!processingId}
                      onClick={() =>
                        handleStatusChange(room.id, room.userId, "rejected", room.name, room.room, room.startDate, room.endDate, "reject")
                      }
                      className="flex-1 px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-rose-500/10 disabled:opacity-50 disabled:cursor-wait"
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
                    className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-amber-500/10 disabled:opacity-50 disabled:cursor-wait"
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
                    className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold transition duration-200 active:scale-95 text-xs shadow-md shadow-purple-500/10 disabled:opacity-50 disabled:cursor-wait"
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
