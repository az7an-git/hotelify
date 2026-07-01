// src/components/VehicleCard.js
import React, { useState } from 'react';
import VehicleBooking from './VehicleBookingForm';
import { auth } from '../../firebase/Firebase';
import CardRate from '../common/cards/CardRate';
import { useAuth } from '../../contexts/authContext';

const VehicleCard = ({ vehicle }) => {
  const [showForm, setShowForm] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const {currentUser} = useAuth();

  const handleBookNow = () => {
    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      alert('Please log in to apply for vehicle rental');
    }
  };

  const toggleAvailability = () => setIsAvailable(prev => !prev);

  return (
    <div className="p-2 md:p-4 w-full md:w[45%] lg:w-[30%] mx-auto  flex relative flex-wrap">
    <CardRate vehicle={vehicle} handleSubmit={handleBookNow}/>
          {showForm && <VehicleBooking vehicle={vehicle} />}
      
      {/* Admin-only availability toggle (Apply restrictions later) */}
      {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
      <button onClick={toggleAvailability} className="bg-gray-600 text-white p-2 mt-2 rounded absolute max-md:-bottom-2 -bottom-5 right-[35%] ">
        {isAvailable ? 'Set as Unavailable' : 'Set as Available'}
      </button>
      )}
    </div>
  );
};

export default VehicleCard;
