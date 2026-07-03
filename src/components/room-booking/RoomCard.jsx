// src/components/RoomCard.js
import React, { useState } from "react";
import { auth } from "../../firebase/Firebase";
import RoomBooking from "./RoomBookingForm";
import Auth from "../common/auth/Index";
import SubmitButton from "../common/button/SubmitButton";
import { FaBed } from "react-icons/fa";

import { toast } from "sonner";

const RoomCard = ({ room }) => {
  const [showForm, setShowForm] = useState(false);

  const handleBookNow = () => {
    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      toast.error("Please log in to book a room");
      return <Auth />;
    }
  };
  console.log("room object:", room);

  return (
    <div className="glass-card max-w-sm mx-auto p-4 space-y-4">
      <div className="overflow-hidden rounded-xl h-44 relative">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={room.imageUrl}
          alt="room"
        />
        <div className="absolute top-3 right-3 bg-white/40 backdrop-blur-md border border-white/50/80 backdrop-blur-md text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/60">
          Luxury Suite
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-800">
            {room.name}
          </h3>
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            ${room.price}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-600 font-medium">
          <p className="italic font-light line-clamp-2 pr-4">{room.description}</p>
          <div
            title="No. of Beds"
            className="flex items-center space-x-1 bg-white/40 backdrop-blur-md border border-white/50 px-2 py-1 rounded-md border border-white/60 flex-shrink-0"
          >
            <span className="font-semibold">{room.beds}</span>
            <span className="text-blue-600">
              <FaBed />
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/60/60 flex justify-center" onClick={handleBookNow}>
        <SubmitButton callToAction={"Book Now"} />
      </div>
      {showForm && <RoomBooking room={room} />}
    </div>
  );
};

export default RoomCard;
