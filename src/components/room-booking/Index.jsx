import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { fetchRooms } from "../../services/roomRegService";
import Loader from "../common/loader/Loader";
import PageHeader from "../common/header/PageHeader";

const SAMPLE_ROOMS = [
  {
    id: "sample-1",
    name: "Presidential Ocean Suite",
    roomType: "Luxury Suite",
    price: 450,
    beds: "2 King Beds",
    description: "Panoramic ocean views, king bed, private jacuzzi, and 24/7 personal butler service.",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: "sample-2",
    name: "Deluxe Executive Room",
    roomType: "Executive",
    price: 280,
    beds: "1 King Bed",
    description: "Modern elegance equipped with high-speed workstation, lounge chair, and marble bath.",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: "sample-3",
    name: "Royal Heritage Suite",
    roomType: "Royal Suite",
    price: 600,
    beds: "3 King Beds",
    description: "Opulent classic decor, spacious double bedrooms, living area, and private balcony.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    available: true
  }
];

const RoomBookingMain = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRooms = async () => {
      const allRooms = await fetchRooms();
      setRooms(Array.isArray(allRooms) && allRooms.length > 0 ? allRooms : SAMPLE_ROOMS);
      setLoading(false);
    };
    fetchAllRooms();
  }, []);

  const handleDeletedRoom = (deletedId) => {
    setRooms(prev => prev.filter(room => room.id !== deletedId));
  };

  return loading ? (
    <Loader msg={"fetching rooms"} />
  ) : (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Available Rooms" 
          subtitle="Find the perfect room for your stay, designed for comfort and luxury." 
        />
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onDeleted={handleDeletedRoom} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl max-w-lg mx-auto shadow-xl my-8">
            <h3 className="text-xl font-bold text-slate-200 mb-2">No Rooms Available</h3>
            <p className="text-slate-400 text-sm">
              There are currently no rooms registered in the system. Please check back later or add new rooms from the Admin Registration panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomBookingMain;
