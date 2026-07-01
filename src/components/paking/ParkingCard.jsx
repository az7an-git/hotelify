// src/components/ParkingCard.js

import React, { useState, useEffect } from "react";
import { toggleParkingAvailability } from "../../services/parkingService";
import { useAuth } from "../../contexts/authContext";

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
    <div className="max-w-sm mx-auto p-4 border rounded-lg shadow-lg bg-white transform transition duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="max-md:p-2 p-4">
        <div className="flex justify-between items-center font-semibold text-gray-800 text-lg lg:text-xl 2xl:text-3xl">
          <div className="   capitalize">{vehicle.name}</div>
          <div title="Per day" className="">
            ${vehicle.rate}
          </div>
        </div>
        <p className="text-gray-600 italic py-3 text-center">
          {vehicle.category}
        </p>
      </div>

      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <label className="text-gray-600 font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-1 transition duration-200 focus:ring-2 focus:ring-blue-300"
            max={endDate}
            min={today}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-600 font-medium">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-1 transition duration-200 focus:ring-2 focus:ring-blue-300"
            min={startDate}
          />
        </div>
      </div>
      <p className="text-gray-800 font-semibold text-lg mt-4">
        Total Rate: <span className="text-green-600">${totalRate}</span>
      </p>
      {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
        <button
          className={`mt-4 w-full py-2 rounded-lg transition-all duration-300 ${
            isAvailable
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } text-white font-semibold`}
          onClick={handleToggleAvailability}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </button>
      )}
      {currentUser && currentUser.uid !== "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
        <button
          className={`mt-4 w-full py-2 rounded-lg cursor-not-allowed transition-all duration-300 ${
            isAvailable
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } text-white font-semibold`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </button>
      )}
    </div>
  );
};

export default ParkingCard;