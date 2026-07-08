// src/components/ParkingCard.js

import React, { useState, useEffect } from "react";
import { toggleParkingAvailability } from "../../services/parkingService";
import { useAuth } from "../../contexts/authContext";
import { ADMIN_UID } from "../../firebase/Firebase";

const ParkingCard = ({ vehicle }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRate, setTotalRate] = useState(0);
  const [today , setToday] = useState("");
  const { currentUser } = useAuth();
  const [isAvailable, setIsAvailable] = useState(vehicle.isAvailable);

  // Calculate the rate based on selected dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = (end - start) / (1000 * 60 * 60 * 24);
      const rate = days * vehicle.rate;
      setTotalRate(rate);
    }
  }, [startDate, endDate, vehicle.rate]);

   useEffect(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0]; 
      setToday(formattedDate);
    }, []);

  // Toggle Availability
  const handleToggleAvailability = async () => {
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    await toggleParkingAvailability(vehicle.id, newAvailability);
  };

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
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md rounded-xl px-2 py-1.5 outline-none focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 text-sm w-full max-w-[150px]"
                max={endDate}
                min={today}
              />
            </div>
            <div className="flex justify-between items-center gap-2">
              <label className="text-slate-600 font-medium text-sm flex-shrink-0">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md rounded-xl px-2 py-1.5 outline-none focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 text-sm w-full max-w-[150px]"
                min={startDate}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-2 pt-2 border-t border-white/40 flex-shrink-0">
        <p className="text-slate-800 font-semibold text-lg flex justify-between items-center pb-4">
          <span>Total Rate:</span> 
          <span className="text-amber-700 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-200/50">${totalRate}</span>
        </p>
        
        {currentUser && currentUser.uid === ADMIN_UID ? (
          <button
            className={`w-full py-2.5 rounded-xl transition-all duration-300 shadow-md border ${
              isAvailable
                ? "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 border-emerald-300/50 text-white"
                : "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 border-rose-300/50 text-white"
            } font-semibold backdrop-blur-sm`}
            onClick={handleToggleAvailability}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </button>
        ) : (
          <button
            className={`w-full py-2.5 rounded-xl cursor-not-allowed transition-all duration-300 shadow-md border ${
              isAvailable
                ? "bg-gradient-to-r from-emerald-400 to-emerald-500 border-emerald-300/50 text-white opacity-80"
                : "bg-gradient-to-r from-rose-400 to-rose-500 border-rose-300/50 text-white opacity-80"
            } font-semibold backdrop-blur-sm`}
            disabled
          >
            {isAvailable ? "Available" : "Unavailable"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ParkingCard;