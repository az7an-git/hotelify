import React, { useState } from "react";
import { FaShoppingBag, FaTimes, FaUtensils } from "react-icons/fa";

function BookingForm({ order, formData, setFormData, handleSubmitOrder, isSubmitting }) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter selected items with quantity > 0
  const selectedItems = Object.values(order).filter((item) => item.quantity > 0);
  const totalCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  if (selectedItems.length === 0) return null;

  const onConfirmOrder = async (e) => {
    e.preventDefault();
    await handleSubmitOrder();
    setIsOpen(false);
  };

  return (
    <>
      {/* ---------- FLOATING BOTTOM CART BAR ---------- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg bg-[#0F172A]/95 border border-amber-500/40 text-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl px-5 py-3.5 rounded-full flex items-center justify-between gap-4 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-lg shadow-inner">
            <FaShoppingBag />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Your Selection</p>
            <p className="text-sm font-bold text-slate-100">
              {totalCount} {totalCount === 1 ? "Item" : "Items"} • <span className="text-amber-400">${totalPrice}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <span>Checkout</span>
          <span className="bg-slate-950/20 text-slate-950 px-1.5 py-0.5 rounded-full text-xs">→</span>
        </button>
      </div>

      {/* ---------- CHECKOUT MODAL DIALOG ---------- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 text-slate-100 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <FaUtensils className="text-amber-400 text-lg" />
                <h3 className="text-lg font-bold text-slate-300">Order Checkout</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-red-800/80 hover:bg-red-700 text-slate-400 hover:text-slate-300 flex items-center justify-center transition-colors text-sm"
              >
                <FaTimes />
              </button>
            </div>

            {/* Selected Items Summary List */}
            <div className="bg-[#0B0F17]/80 rounded-2xl p-4 border border-slate-800 max-h-36 overflow-y-auto space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Order Summary</p>
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/60 last:border-0">
                  <span className="text-slate-300 font-medium truncate max-w-[200px]">{item.name} x {item.quantity}</span>
                  <span className="text-amber-400 font-bold">${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 text-sm font-bold text-slate-200">
                <span>Total Amount:</span>
                <span className="text-amber-400 text-base">${totalPrice}</span>
              </div>
            </div>

            {/* Customer Contact Details Form */}
            <form onSubmit={onConfirmOrder} className="space-y-3.5">
              <div className="flex flex-col space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => {
                    if (e.target.value.length <= 25) {
                      setFormData({ ...formData, name: e.target.value });
                    }
                  }}
                  className="bg-[#0B0F17]/90 text-slate-100 border border-slate-700/70 shadow-inner focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 rounded-xl px-4 py-2.5 outline-none transition-all text-sm w-full placeholder-slate-500"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contact Number</label>
                <input
                  type="number"
                  placeholder="e.g. 03001234567"
                  value={formData.contact}
                  onChange={(e) => {
                    if (e.target.value.length <= 13) {
                      setFormData({ ...formData, contact: e.target.value });
                    }
                  }}
                  className="bg-[#0B0F17]/90 text-slate-100 border border-slate-700/70 shadow-inner focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 rounded-xl px-4 py-2.5 outline-none transition-all text-sm w-full placeholder-slate-500"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Room / Delivery Address</label>
                <input
                  type="text"
                  placeholder="e.g. Room 402 / Main Lounge"
                  value={formData.address}
                  onChange={(e) => {
                    if (e.target.value.length <= 30) {
                      setFormData({ ...formData, address: e.target.value });
                    }
                  }}
                  className="bg-[#0B0F17]/90 text-slate-100 border border-slate-700/70 shadow-inner focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 rounded-xl px-4 py-2.5 outline-none transition-all text-sm w-full placeholder-slate-500"
                  required
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-1/3 py-3 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 transition-all active:scale-95"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <span>Confirm & Place Order</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}

export default BookingForm;
