import React from "react";
import { inputStyles } from "../registrations/FoodRegistration";

function BookingForm({ order, formData, setFormData, handleSubmitOrder, isSubmitting }) {
  return (
    <div className="flex flex-col justify-start items-center md:items-start w-full">
      {Object.values(order).some((item) => item.quantity > 0) && (
        <div className="mt-8 p-6 md:p-8 glass-card border border-white/60 shadow-xl rounded-3xl w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center border-b border-white/50 pb-3">Complete Your Order</h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 15) {
                    setFormData({ ...formData, name: e.target.value });
                  }
                }}
                className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition-colors text-sm w-full"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact Number</label>
              <input
                type="number"
                placeholder="Phone number"
                value={formData.contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    setFormData({ ...formData, contact: e.target.value });
                  }
                }}
                className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition-colors text-sm w-full"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Room / Delivery Address</label>
              <input
                type="text"
                placeholder="e.g., Room 402"
                value={formData.address}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length < 20) {
                    setFormData({ ...formData, address: e.target.value });
                  }
                }}
                className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition-colors text-sm w-full"
              />
            </div>
            <div className="pt-4">
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="glass-button-primary w-full py-3.5 rounded-full text-base font-bold shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
