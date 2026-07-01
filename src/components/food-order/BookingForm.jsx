import React from "react";
import { inputStyles } from "../registrations/FoodRegistration";

function BookingForm({ order, formData, setFormData, handleSubmitOrder }) {
  return (
    <div className="flex flex-col justify-start  items-start">
      {Object.values(order).some((item) => item.quantity > 0) && (
        <div className="mt-6 p-4 border rounded-lg shadow-md w-fit ">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <div className="mb-2">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 15) {
                  setFormData({ ...formData, name: e.target.value });
                }
              }}
              className={`border p-1 w-full ${inputStyles}`}
            />
          </div>
          <div className="mb-2">
            <label>Contact:</label>
            <input
              type="number"
              value={formData.contact}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 11) {
                  setFormData({ ...formData, contact: e.target.value });
                }
              }}
              className={`border p-1 w-full ${inputStyles}`}
            />
          </div>
          <div className="mb-2">
            <label>Address:</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length < 20) {
                  setFormData({ ...formData, address: e.target.value });
                }
              }}
              className={`border p-1 w-full ${inputStyles}`}
            />
          </div>
          <button
            onClick={handleSubmitOrder}
            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-800 transition-all duration-200 text-white rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
