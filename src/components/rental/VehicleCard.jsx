// src/components/VehicleCard.js
import React, { useState } from 'react';
import VehicleBooking from './VehicleBookingForm';
import { auth, ADMIN_UID } from '../../firebase/Firebase';
import SubmitButton from '../common/button/SubmitButton';
import { useAuth } from '../../contexts/authContext';

import { toast } from 'sonner';
import { NOTIFICATIONS } from '../../constants/notifications';

const VehicleCard = ({ vehicle }) => {
  const [showForm, setShowForm] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const { currentUser } = useAuth();

  const handleBookNow = () => {
    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      toast.error(NOTIFICATIONS.VEHICLE_BOOKING_LOGIN_REQUIRED);
    }
  };

  const toggleAvailability = () => setIsAvailable(prev => !prev);

  return (
    <div className="glass-card max-w-sm w-full mx-auto p-4 flex flex-col justify-between space-y-4 relative">
      <div className="space-y-4 flex flex-col flex-grow">
        <div className="overflow-hidden rounded-xl h-44 relative flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={vehicle.imageUrl}
            alt={vehicle.name}
          />
        </div>
        <div className="space-y-2 flex-grow flex flex-col justify-between">
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-xl font-bold text-slate-800 capitalize">
              {vehicle.name}
            </h3>
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 flex-shrink-0 whitespace-nowrap">
              ${vehicle.price}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-600 font-medium mt-auto pt-2">
            <p className="italic font-light line-clamp-2 pr-4">{vehicle.desc}</p>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/60 flex flex-col gap-3 justify-center flex-shrink-0">
        <div onClick={handleBookNow}>
          <SubmitButton callToAction={"Book Now"} />
        </div>

        {/* Admin-only availability toggle */}
        {currentUser && currentUser.uid === ADMIN_UID && (
          <button
            onClick={toggleAvailability}
            className="w-full bg-slate-700/80 hover:bg-slate-800/90 text-white font-medium py-2 rounded-lg transition-colors text-sm"
          >
            {isAvailable ? 'Set as Unavailable' : 'Set as Available'}
          </button>
        )}
      </div>

      {showForm && <VehicleBooking vehicle={vehicle} onSuccess={() => setShowForm(false)} />}
    </div>
  );
};

export default VehicleCard;
