import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useAuth } from "../../contexts/authContext";
import HallCard from "./HallCard";
import BookButton from "../common/button/BookButton";
import BookingForm from "../common/forms/BookingForm";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const WeddingHallCard = ({ hall }) => {
  const { currentUser } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [totalRate, setTotalRate] = useState(0);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cnic, setCnic] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end > start) {
        const days = (end - start) / (1000 * 60 * 60 * 24);
        const rate = Math.round(days * hall.pp);
        setTotalRate(rate > 0 ? rate : 0);
      } else {
        setTotalRate(0);
      }
    } else {
      setTotalRate(0);
    }
  }, [startDate, endDate, hall.pp]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!currentUser) return toast.error(NOTIFICATIONS.HALL_BOOKING_LOGIN_REQUIRED);
    const bookingInfo = {
      name,
      cnic,
      contact,
      startDate,
      endDate,
      userId: currentUser.uid,
      hallName: hall.name,
      hallId: hall.id,
      status: "Pending",
      totalRate,
      createdAt: serverTimestamp(),
      applyDate: Timestamp.fromDate(new Date()),
    };

    setLoading(true);
    try {
      await addDoc(collection(db, "wedding-hall-bookings"), bookingInfo);
      setIsBooking(false);
      toast.success(NOTIFICATIONS.HALL_BOOKING_SUCCESS);
    } catch (error) {
      console.error("Error booking hall:", error);
      toast.error(NOTIFICATIONS.HALL_BOOKING_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <HallCard
        hall={hall}
        onBook={() => setIsBooking(!isBooking)}
        isBooking={isBooking}
      />
      {isBooking && (
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
          loading={loading}
        />
      )}
    </div>
  );
};

export default WeddingHallCard;