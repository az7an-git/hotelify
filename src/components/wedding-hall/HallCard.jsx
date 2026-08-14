import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { ADMIN_UID, db } from '../../firebase/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import DeleteConfirmModal from '../common/modal/DeleteConfirmModal';
import { deleteHall } from '../../services/hallRegService';
import { toast } from 'sonner';

const HallCard = ({ hall, onBook, isBooking, onDeleted }) => {
  const { name, description, pp, offers: initialOffers, imageUrl } = hall;
  const [offers, setOffers] = useState(initialOffers || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOfferTarget, setDeleteOfferTarget] = useState(null); // { index, title }
  const [isDeleting, setIsDeleting] = useState(false);
  const { currentUser } = useAuth();

  const isAdmin = currentUser && currentUser.uid === ADMIN_UID;

  // Delete entire hall without browser reload
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteHall(hall.id);
      toast.success(`Deleted ${name}`);
      if (onDeleted) onDeleted(hall.id);
    } catch {
      toast.error("Failed to delete hall.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Delete a specific special offer without browser reload
  const handleDeleteOfferConfirm = async () => {
    if (!deleteOfferTarget) return;
    setIsDeleting(true);
    try {
      const updatedOffers = offers.filter((_, idx) => idx !== deleteOfferTarget.index);
      const hallRef = doc(db, 'halls', hall.id);
      await updateDoc(hallRef, { offers: updatedOffers });
      setOffers(updatedOffers); // Instant in-memory state update!
      toast.success(`Deleted offer "${deleteOfferTarget.title}"`);
    } catch {
      toast.error("Failed to delete offer.");
    } finally {
      setIsDeleting(false);
      setDeleteOfferTarget(null);
    }
  };

  return (
    <div className="glass-card max-w-sm w-full mx-auto p-4 flex flex-col justify-between h-full space-y-4 hover:-translate-y-1 transition-transform duration-300 relative">
      <div className="space-y-4 flex flex-col flex-grow">
        <div className="overflow-hidden rounded-xl h-44 relative flex-shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              title="Delete Hall"
              className="absolute top-3 left-3 bg-rose-500/80 hover:bg-rose-600 text-white p-2 rounded-full backdrop-blur-md border border-rose-400/50 shadow-md transition-all active:scale-90 z-10"
            >
              <FaTrash className="text-xs" />
            </button>
          )}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 shadow-md">
            ${pp} / person
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-between space-y-3">
          <div>
            <h2 className="text-xl font-bold text-slate-100 capitalize">{name}</h2>
            <p className="text-slate-400 italic text-xs sm:text-sm line-clamp-2 mt-1">{description}</p>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Rate per Person</span>
              <span className="text-amber-400 font-bold text-base">${pp}</span>
            </div>

            {/* Special Offers Section */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Special Offers {offers && offers.length > 0 ? `(${offers.length})` : ''}
              </h3>

              <div
                style={{ backgroundColor: '#070b13', borderColor: '#1e293b' }}
                className="max-h-36 overflow-y-auto pr-1 custom-scrollbar space-y-2 rounded-2xl border p-2.5"
              >
                {offers && offers.length > 0 ? (
                  offers.map((offer, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: '#0f172a', borderColor: 'rgba(245, 158, 11, 0.3)' }}
                      className="p-2.5 rounded-xl border space-y-1 relative shadow-sm"
                    >
                      <div className="flex justify-between items-center pr-1">
                        <h4 style={{ color: '#fbbf24' }} className="font-bold text-xs">{offer.title}</h4>
                        <div className="flex items-center gap-1.5">
                          {offer.price && (
                            <span
                              style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                              className="font-bold text-xs px-2 py-0.5 rounded-md border"
                            >
                              ${offer.price}
                            </span>
                          )}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteOfferTarget({ index, title: offer.title });
                              }}
                              title="Delete Offer"
                              style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                              className="w-6 h-6 rounded-full border flex items-center justify-center transition-all hover:bg-rose-500 hover:text-white text-[9px] ml-1 shadow-sm active:scale-90 shrink-0"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                      {offer.description && (
                        <p style={{ color: '#cbd5e1' }} className="text-[11px] leading-relaxed line-clamp-2">{offer.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#94a3b8' }} className="py-3 flex items-center justify-center text-xs italic text-center px-2">
                    Standard Rate Applies (No special offers)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isAdmin && (
        <div className="pt-3 border-t border-slate-800 flex-shrink-0">
          <button
            type="button"
            onClick={onBook}
            className={`w-full py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-md border ${isBooking
              ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 border-amber-400/50 active:scale-95 shadow-amber-500/20"
              }`}
          >
            {isBooking ? 'Close Booking' : 'Book Now'}
          </button>
        </div>
      )}

      {/* Modal for deleting entire hall */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName={name}
        itemType="Wedding Hall"
        isDeleting={isDeleting}
      />

      {/* Modal for deleting an individual special offer */}
      <DeleteConfirmModal
        isOpen={!!deleteOfferTarget}
        onClose={() => setDeleteOfferTarget(null)}
        onConfirm={handleDeleteOfferConfirm}
        itemName={deleteOfferTarget?.title || ""}
        itemType="Special Offer"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default HallCard;
