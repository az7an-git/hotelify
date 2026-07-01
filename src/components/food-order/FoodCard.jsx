import React, { useState } from 'react';

const FoodCard = ({ foodItem, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

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

  return (
    <div className="w-full mx-auto p-5 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60">
      <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
        <img className="rounded-full h-16 w-16 object-cover border border-slate-800" src={foodItem.imageUrl} alt={foodItem.name} />
        <h3 className="text-xl font-bold text-slate-100 capitalize">{foodItem.name}</h3>
      </div>
      <p className="text-slate-400 text-sm italic py-4 line-clamp-2">{foodItem.desc}</p>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-800/60">
        <span title="Per Item" className="text-teal-400 text-base font-semibold">
          ${foodItem.price} / item
        </span>
        
        <div className="flex items-center bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-full">
          <button 
            onClick={handleRemove} 
            className="w-7 h-7 flex items-center justify-center text-sm bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition duration-200"
          >
            -
          </button>
          <span className="mx-3 text-sm font-semibold text-slate-200 w-4 text-center">{quantity}</span>
          <button 
            onClick={handleAdd} 
            className="w-7 h-7 flex items-center justify-center text-sm bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition duration-200"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 mt-2">
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Price</span>
        <p className="text-lg font-bold text-slate-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            ${quantity * foodItem.price}
          </span>
        </p>
      </div>
    </div> 
  );
};

export default FoodCard;
