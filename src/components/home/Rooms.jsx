import React, { useEffect, useState } from "react";
import { fetchRooms } from "../../services/roomRegService";
import RoomBooking from "../room-booking/RoomBookingForm";
import { auth } from "../../firebase/Firebase";
import { FaBed } from "react-icons/fa";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const RoomsSection = () => {
  const [rooms, setRooms] = useState();
  const [selRoom, setSelRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getRooms = async () => {
      const allRooms = await fetchRooms();
      setRooms(allRooms);
    };
    getRooms();
  }, []);
  const handleBookNow = (room) => {
    if (auth.currentUser) {
      setShowForm(!showForm);
      setSelRoom(room);
    } else {
      toast.error(NOTIFICATIONS.ROOM_BOOKING_LOGIN_REQUIRED);
    }
  };

  return (
    <section className="py-12 md:py-24 my-8 md:my-12 text-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-center">
          Our Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Rooms & Suites</span>
        </h2>
        {rooms && rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm sm:max-w-none mx-auto">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group rounded-3xl overflow-hidden glass-card w-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-white/60 flex flex-col"
              >
                <div className="overflow-hidden h-56 relative w-full shrink-0">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-md text-blue-700 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg border border-white">
                    Featured
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">{room.name}</h3>
                      <p
                        title="No. of Beds"
                        className="text-sm font-bold text-slate-700 flex items-center bg-blue-50/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm shrink-0 ml-2"
                      >
                        {room.beds}{" "}
                        <span className="ms-2 text-blue-600">
                          <FaBed size={16} />
                        </span>
                      </p>
                    </div>
                    <p className="text-slate-500 font-medium text-sm sm:text-base line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200/60 mt-4">
                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      ${room.price}/day
                    </span>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="glass-button-primary px-6 py-2.5 rounded-full font-bold shadow-blue-500/20 hover:shadow-blue-500/40 text-sm transition-all transform active:scale-95 whitespace-nowrap ml-2"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {showForm && <RoomBooking room={selRoom} />}
          </div>
        ) : rooms ? (
          <p className="text-slate-600 font-medium italic text-center">No featured rooms available yet.</p>
        ) : (
          <p className="text-blue-600 animate-pulse font-semibold text-center">Loading Rooms...</p>
        )}
      </div>
    </section>
  );
};

export default RoomsSection;