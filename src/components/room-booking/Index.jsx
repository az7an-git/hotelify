// src/pages/RoomBookingPage.js
import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { fetchRooms } from "../../services/roomRegService";
import Loader from "../common/loader/Loader";

const RoomBookingMain = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRooms = async () => {
      const allRooms = await fetchRooms();
      console.log("rooms fetched:", allRooms);
      setRooms(allRooms);
      setLoading(false);
    };
    fetchAllRooms();
  }, []);

  return loading ? (
    <Loader msg={"fetching rooms"} />
  ) : (
    <div className="p-6">
      <h1 className="text-2xl lg:text-3xl text-center font-semibold mb-6">
        Available Rooms
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomBookingMain;
