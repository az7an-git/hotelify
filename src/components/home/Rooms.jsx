import React, { useEffect, useState } from "react";
import { fetchRooms } from "../../services/roomRegService";
import RoomBooking from "../room-booking/RoomBookingForm";
import { auth } from "../../firebase/Firebase";
import { FaBed } from "react-icons/fa";

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
      alert("Please log in to book a room");
    }
  };

  return (
    <section className="py-12 max-md:mt-5 lg:py-24 glass-panel my-12 mx-4 rounded-3xl text-slate-800 border-t border-white/50">
      <div className="md:container mx-auto px-4 nd:px-4 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-12 text-center">
          Our Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Rooms & Suites</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {rooms &&
            rooms.map((room) => (
              <div
                key={room.id}
                className="group rounded-2xl overflow-hidden glass-card transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="overflow-hidden h-56 relative">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md border border-white/50/80 backdrop-blur-md text-blue-600 text-sm font-semibold px-3 py-1 rounded-full border border-white/60">
                    Featured
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between h-56">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{room.name}</h3>
                      <p
                        title="No. of Beds"
                        className="text-sm font-medium text-slate-600 font-medium flex items-center bg-white/40 backdrop-blur-md border border-white/50 px-2.5 py-1 rounded-lg border border-white/60"
                      >
                        {room.beds}{" "}
                        <span className="ms-1.5 text-blue-600">
                          <FaBed />
                        </span>
                      </p>
                    </div>
                    <p className="text-slate-600 font-medium text-sm line-clamp-2 font-light italic mb-4">
                      {room.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/60">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                      ${room.price}/day
                    </span>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="bg-blue-500 hover:bg-blue-600 text-slate-950 px-4.5 py-2 rounded-full font-bold shadow-md shadow-teal-500/10 hover:shadow-teal-500/20 transition-all duration-200 transform active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {showForm && <RoomBooking room={selRoom} />}

        </div>
      </div>
    </section>
  );
};

export default RoomsSection;