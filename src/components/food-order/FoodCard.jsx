import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { ADMIN_UID } from '../../firebase/Firebase';
import { FaTrash } from 'react-icons/fa';
import DeleteConfirmModal from '../common/modal/DeleteConfirmModal';
import { deleteFoodItem } from '../../services/foodRegService';
import { toast } from 'sonner';

const FoodCard = ({ foodItem, onQuantityChange, onDeleted }) => {
  const [quantity, setQuantity] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { currentUser } = useAuth();

  const isAdmin = currentUser && currentUser.uid === ADMIN_UID;

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(foodItem, newQuantity);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(foodItem, newQuantity);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteFoodItem(foodItem.id);
      toast.success(`Deleted ${foodItem.name}`);
      if (onDeleted) onDeleted(foodItem.id);
    } catch {
      toast.error("Failed to delete food item.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="w-full mx-auto p-5 glass-card transform transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 relative">
      <div className="flex items-center pb-3 border-b border-white/50">
        <img className="shrink-0 rounded-full h-16 w-16 object-cover border border-white/60 shadow-sm" src={foodItem.imageUrl} alt={foodItem.name} />
        <h3
          className="text-lg md:text-xl font-bold text-slate-100 capitalize ml-4 flex-1 line-clamp-2 text-left leading-tight"
          title={foodItem.name}
        >
          {foodItem.name}
        </h3>
        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
            title="Delete Food Item"
            className="bg-rose-500/80 hover:bg-rose-600 text-white p-2 rounded-full backdrop-blur-md border border-rose-400/50 shadow-md transition-all active:scale-90 ml-2"
          >
            <FaTrash className="text-xs" />
          </button>
        )}
      </div>
      <p className="text-slate-400 text-sm italic py-4 line-clamp-2">{foodItem.desc}</p>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-800">
        <span title="Per Item" className="text-amber-400 text-base font-bold">
          ${foodItem.price} <span className="text-xs text-slate-400 font-medium">/ item</span>
        </span>

        {!isAdmin && (
          <div className="flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700 px-2.5 py-1 rounded-full shadow-sm">
            <button
              onClick={handleRemove}
              className="w-7 h-7 flex items-center justify-center text-sm bg-slate-800 border border-slate-700 rounded-full text-slate-200 font-bold hover:text-amber-400 hover:bg-slate-700 transition-all duration-200 transform active:scale-90"
            >
              -
            </button>
            <span className="mx-3 text-sm font-bold text-slate-100 w-4 text-center">{quantity}</span>
            <button
              onClick={handleAdd}
              className="w-7 h-7 flex items-center justify-center text-sm bg-slate-800 border border-slate-700 rounded-full text-slate-200 font-bold hover:text-amber-400 hover:bg-slate-700 transition-all duration-200 transform active:scale-90"
            >
              +
            </button>
          </div>
        )}
      </div>

      {!isAdmin && (
        <div className="flex justify-between items-center pt-4 mt-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider font-semibold">Total Price</span>
          <p className="text-lg font-bold text-slate-100">
            <span className="text-amber-400">
              ${quantity * foodItem.price}
            </span>
          </p>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName={foodItem.name}
        itemType="Food Item"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default FoodCard;
