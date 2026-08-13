// src/components/VehicleCard.js
import React, { useState } from 'react';
import VehicleBooking from './VehicleBookingForm';
import { auth, ADMIN_UID } from '../../firebase/Firebase';
import SubmitButton from '../common/button/SubmitButton';
import { useAuth } from '../../contexts/authContext';
import { FaTrash } from 'react-icons/fa';
import DeleteConfirmModal from '../common/modal/DeleteConfirmModal';
import { deleteVehicle } from '../../services/rentalRegService';
import { toast } from 'sonner';
import { NOTIFICATIONS } from '../../constants/notifications';

const VehicleCard = ({ vehicle, onDeleted }) => {
  const [showForm, setShowForm] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { currentUser } = useAuth();

  const isAdmin = currentUser && currentUser.uid === ADMIN_UID;

  const handleBookNow = () => {
    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      toast.error(NOTIFICATIONS.VEHICLE_BOOKING_LOGIN_REQUIRED);
    }
  };

  const toggleAvailability = () => setIsAvailable(prev => !prev);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteVehicle(vehicle.id);
      toast.success(`Deleted ${vehicle.name}`);
      if (onDeleted) onDeleted(vehicle.id);
    } catch {
      toast.error("Failed to delete vehicle.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="glass-card max-w-sm w-full mx-auto p-4 flex flex-col justify-between space-y-4 relative h-full">
      <div className="space-y-4 flex flex-col flex-grow">
        <div className="overflow-hidden rounded-xl h-44 relative flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={vehicle.imageUrl}
            alt={vehicle.name}
          />
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              title="Delete Vehicle"
              className="absolute top-3 left-3 bg-rose-500/80 hover:bg-rose-600 text-white p-2 rounded-full backdrop-blur-md border border-rose-400/50 shadow-md transition-all active:scale-90 z-10"
            >
              <FaTrash className="text-xs" />
            </button>
          )}
          <div
            className={`absolute top-3 right-3 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${
              isAvailable
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-rose-500/20 text-rose-300 border-rose-500/40"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </div>
        </div>
        <div className="space-y-2 flex-grow flex flex-col justify-between">
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-xl font-bold text-slate-100 capitalize">
              {vehicle.name}
            </h3>
            <span className="text-lg font-bold text-emerald-400 flex-shrink-0 whitespace-nowrap">
              ${vehicle.price}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-400 font-medium mt-auto pt-2">
            <p className="italic font-light line-clamp-2 pr-4 text-slate-300">{vehicle.desc}</p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 justify-center flex-shrink-0">
        {isAdmin ? (
          // Admin-only availability toggle (No customer Book Now button)
          <button
            onClick={toggleAvailability}
            className={`w-full py-3 rounded-full font-bold text-xs transition-all duration-300 shadow-sm border backdrop-blur-md active:scale-95 flex items-center justify-center gap-2 ${
              isAvailable
                ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30"
                : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
            }`}
          >
            {isAvailable ? 'Set as Unavailable' : 'Set as Available'}
          </button>
        ) : (
          // Customer Book Now button
          <div onClick={isAvailable ? handleBookNow : null} className={!isAvailable ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}>
            <SubmitButton callToAction={isAvailable ? (showForm ? "Cancel" : "Book Now") : "Not Available"} />
          </div>
        )}
      </div>

      {showForm && <VehicleBooking vehicle={vehicle} onSuccess={() => setShowForm(false)} />}

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName={vehicle.name}
        itemType="Vehicle"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default VehicleCard;
