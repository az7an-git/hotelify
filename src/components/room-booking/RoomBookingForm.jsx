// src/components/RoomBooking.js
import React, { useState } from "react";
import { auth } from "../../firebase/Firebase";
import { addRoomBooking } from "../../services/roomBookingService";
import BookingForm from "../common/forms/BookingForm";
import { toast } from "sonner";

const RoomBooking = ({ room }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [cnic, setCnic] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRate, setTotalRate] = useState(0);

  const handleTotalRate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    const rate = days * room.price;
    setTotalRate(rate);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    handleTotalRate();

    const bookingData = {
      userId: auth.currentUser.uid,
      roomId: room.id,
      room: room.name,
      name,
      contact,
      status: "vacant",
      cnic,
      totalRate,
      startDate,
      endDate,
    };
    await addRoomBooking(bookingData);
    toast.success("Booking request sent successfully!");
  };

  return (
    <BookingForm
      handleBooking={handleBooking}
      name={name}
      setName={setName}
      contact={contact}
      setContact={setContact}
      cnic={cnic}
      setCnic={setCnic}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      totalRate={totalRate}
    />
  );
};

export default RoomBooking;