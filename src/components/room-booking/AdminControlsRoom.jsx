import React, { useEffect, useState } from "react";
import {
  getRoomBookings,
  sendRoomBookingNotification,
  updateRoomOrderStatus,
} from "../../services/roomBookingService";
import Loader from "../common/loader/Loader";

function AdminControlsRoom() {
  const [rooms, setRooms] = useState([]);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomInfo = async () => {
      const appliedRooms = await getRoomBookings();
      setRooms(appliedRooms);
      setLoading(false);
    };
    fetchRoomInfo();
  }, []);
  const handleStatusChange = async (
    roomId,
    userId,
    newStatus,
    userName,
    roomName,
    bookedFrom,
    bookedUntil
  ) => {
    await updateRoomOrderStatus(roomId, newStatus);

    const notificationMessage = {
      booked: "Your Booking has been accepted!",
      rejected: "Your booking has been rejected.",
      checkedIn: "Check in successfull! Enjoy your stay",
      checkedOut: "Check out successfull! come again",
    };
    const RoomStatus = newStatus;

    await sendRoomBookingNotification(
      userId,
      notificationMessage[newStatus],
      roomName,
      userName,
      bookedFrom,
      bookedUntil,
      RoomStatus
    );
    setRooms((prevOrders) =>
      prevOrders.map((room) =>
        room.id === roomId ? { ...room, status: newStatus } : room
      )
    );
  };
  return (
    loading ? <Loader msg={"Fetching Room Booking Notifications"} /> :
    <div className="p-6 space-y-6 flex flex-wrap justify-between items-center ">
    {rooms.map((room, i) => (
      room.status !== "rejected" && room.status !== "checkedOut" && (
        <div
          key={i}
          className="p-5 border rounded-lg shadow-md bg-white hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="text-lg font-semibold text-gray-800 mb-2">Booking from {room.name}</div>
          <p className="text-gray-700">
            <span className="font-medium">Room:</span> {room.room}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Booked From:</span> {room.startDate}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Booked Until:</span> {room.endDate}
          </p>

          <div className="mt-4 space-x-3">
            {room.status === "vacant" && (
              <>
                <button
                  onClick={() =>
                    handleStatusChange(room.id, room.userId, "booked", room.name, room.room, room.startDate, room.endDate)
                  }
                  className="px-4 py-2 bg-green-500 text-slate-800 rounded-full transition duration-200 transform hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring focus:ring-green-200"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(room.id, room.userId, "rejected", room.name, room.room, room.startDate, room.endDate)
                  }
                  className="px-4 py-2 bg-red-500 text-slate-800 rounded-full transition duration-200 transform hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring focus:ring-red-200"
                >
                  Reject
                </button>
              </>
            )}

            {room.status === "booked" && (
              <button
                onClick={() =>
                  handleStatusChange(room.id, room.userId, "checkedIn", room.name, room.room, room.startDate, room.endDate)
                }
                className="px-4 py-2 bg-blue-500 text-slate-800 rounded-full transition duration-200 transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Check In
              </button>
            )}

            {room.status === "checkedIn" && (
              <button
                onClick={() =>
                  handleStatusChange(room.id, room.userId, "checkedOut", room.name, room.room, room.startDate, room.endDate)
                }
                className="px-4 py-2 bg-purple-500 text-slate-800 rounded-full transition duration-200 transform hover:bg-purple-600 hover:scale-105 focus:outline-none focus:ring focus:ring-purple-200"
              >
                Check Out
              </button>
            )}
          </div>
        </div>
      )
    ))}
  </div>
  );
}

export default AdminControlsRoom;
