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
    <div className="w-full mx-auto p-5 glass-card transform transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60">
      <div className="flex items-center pb-3 border-b border-white/50">
        <img className="shrink-0 rounded-full h-16 w-16 object-cover border border-white/60 shadow-sm" src={foodItem.imageUrl} alt={foodItem.name} />
        <h3
          className="text-lg md:text-xl font-bold text-slate-800 capitalize ml-4 flex-1 line-clamp-2 text-left leading-tight"
          title={foodItem.name}
        >
          {foodItem.name}
        </h3>
      </div>
      <p className="text-slate-600 text-sm italic py-4 line-clamp-2">{foodItem.desc}</p>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/50">
        <span title="Per Item" className="text-blue-600 text-base font-bold">
          ${foodItem.price} <span className="text-xs text-slate-500 font-medium">/ item</span>
        </span>

        <div className="flex items-center bg-white/40 backdrop-blur-md border border-white/60 px-2.5 py-1 rounded-full shadow-sm">
          <button
            onClick={handleRemove}
            className="w-7 h-7 flex items-center justify-center text-sm bg-white/50 backdrop-blur-md shadow-sm border border-white/60 rounded-full text-slate-600 font-bold hover:text-blue-600 hover:bg-white/80 transition-all duration-200 transform active:scale-90"
          >
            -
          </button>
          <span className="mx-3 text-sm font-bold text-slate-700 w-4 text-center">{quantity}</span>
          <button
            onClick={handleAdd}
            className="w-7 h-7 flex items-center justify-center text-sm bg-white/50 backdrop-blur-md shadow-sm border border-white/60 rounded-full text-slate-600 font-bold hover:text-blue-600 hover:bg-white/80 transition-all duration-200 transform active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 mt-2">
        <span className="text-xs text-slate-600 font-medium uppercase tracking-wider font-semibold">Total Price</span>
        <p className="text-lg font-bold text-slate-800">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            ${quantity * foodItem.price}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FoodCard;
