import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/Firebase";
import { addVehicleBooking } from "../../services/vehicleRentalService";
import BookingForm from "../common/forms/BookingForm";
import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const VehicleBooking = ({ vehicle }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [cnic, setCnic] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRate, setTotalRate] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end > start) {
        const days = (end - start) / (1000 * 60 * 60 * 24);
        const rate = Math.round(days * vehicle.price);
        setTotalRate(rate > 0 ? rate : 0);
      } else {
        setTotalRate(0);
      }
    } else {
      setTotalRate(0);
    }
  }, [startDate, endDate, vehicle.price]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      userId: auth.currentUser.uid,
      vehicleId: vehicle.id,
      name,
      contact,
      vehicleName: vehicle.name,
      startDate,
      endDate,
      totalRate,
      cnic,
      status: "pending",
      available: true,
    };
    setLoading(true);
    try {
      await addVehicleBooking(bookingData);
      toast.success(NOTIFICATIONS.VEHICLE_BOOKING_SUCCESS);
    } catch (error) {
      console.error(error);
      toast.error(NOTIFICATIONS.VEHICLE_BOOKING_ERROR);
    } finally {
      setLoading(false);
    }
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
      loading={loading}
    />
  );
};

export default VehicleBooking;
