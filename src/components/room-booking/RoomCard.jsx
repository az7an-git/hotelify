import React, { useState } from "react";
import { auth, ADMIN_UID } from "../../firebase/Firebase";
import RoomBooking from "./RoomBookingForm";
import Auth from "../common/auth/Index";
import SubmitButton from "../common/button/SubmitButton";
import { FaBed, FaTrash } from "react-icons/fa";
import DeleteConfirmModal from "../common/modal/DeleteConfirmModal";
import { deleteRoom } from "../../services/roomRegService";
import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const RoomCard = ({ room, onDeleted }) => {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = auth.currentUser && auth.currentUser.uid === ADMIN_UID;

  const handleBookNow = () => {
    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      toast.error(NOTIFICATIONS.ROOM_BOOKING_LOGIN_REQUIRED);
      return <Auth />;
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteRoom(room.id);
      toast.success(`Deleted ${room.name}`);
      if (onDeleted) onDeleted(room.id);
    } catch {
      toast.error("Failed to delete room.");
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
            src={room.imageUrl}
            alt="room"
          />
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              title="Delete Room"
              className="absolute top-3 left-3 bg-rose-500/80 hover:bg-rose-600 text-white p-2 rounded-full backdrop-blur-md border border-rose-400/50 shadow-md transition-all active:scale-90 z-10"
            >
              <FaTrash className="text-xs" />
            </button>
          )}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 shadow-md">
            Luxury Suite
          </div>
        </div>

        <div className="space-y-2 flex-grow flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-slate-100">
              {room.name}
            </h3>
            <span className="text-lg font-bold text-amber-400 ml-2 flex-shrink-0">
              ${room.price}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-400 font-medium mt-auto pt-2">
            <p className="italic font-light line-clamp-2 pr-4 text-slate-300">{room.description}</p>
            <div
              title="No. of Beds"
              className="flex items-center space-x-1 bg-slate-900/60 backdrop-blur-md border border-slate-700 px-2.5 py-1 rounded-lg flex-shrink-0 text-slate-200"
            >
              <span className="font-semibold text-xs">{room.beds}</span>
              <span className="text-amber-400 text-xs">
                <FaBed />
              </span>
            </div>
          </div>
        </div>
      </div>

      {!isAdmin && (
        <div className="pt-3 border-t border-slate-800 flex justify-center flex-shrink-0" onClick={handleBookNow}>
          <SubmitButton callToAction={showForm ? "Cancel" : "Book Now"} />
        </div>
      )}

      {showForm && <RoomBooking room={room} onSuccess={() => setShowForm(false)} />}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName={room.name}
        itemType="Room"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default RoomCard;
