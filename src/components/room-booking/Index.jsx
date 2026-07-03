import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { fetchRooms } from "../../services/roomRegService";
import Loader from "../common/loader/Loader";
import PageHeader from "../common/header/PageHeader";

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
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Available Rooms" 
          subtitle="Find the perfect room for your stay, designed for comfort and luxury." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomBookingMain;
