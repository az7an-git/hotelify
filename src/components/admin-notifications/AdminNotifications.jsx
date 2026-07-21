import React, { useState } from "react";
import AdminOrders from "../food-order/AdminOrder";
import AdminControls from "../rental/AdminControls";
import AdminControlsRoom from "../room-booking/AdminControlsRoom";
import AdminControlsHall from "../wedding-hall/AdminControlsHall";
import AdminControlsParking from "../parking/AdminControlsParking";

function AdminNotifications() {
  const [activeTab, setActiveTab] = useState("food-orders");
  
  const tabs = [
    {
      order: 'food-orders',
    },
    {
      order: 'rental-orders',
    },
    {
      order: 'room-bookings',
    },
    {
      order: 'hall-bookings',
    },
    {
      order: 'parking-bookings',
    },
  ]

  return (
    <div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">

      {
        tabs.map((tab, i) => {
         return <button
         key={i}
          onClick={() => setActiveTab(tab.order)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide capitalize transition-all duration-200 ${
            activeTab === tab.order
              ? "bg-amber-600 text-white border-amber-500 shadow-md"
              : "bg-white/40 text-slate-600 hover:text-amber-700 hover:bg-white/60 border border-white/50 shadow-sm rounded-xl backdrop-blur-md transition-all"
          }`}
        >
         {tab.order.replace('-', ' ')}
        </button>
        })
      }
      </div>
   

      <div className={activeTab === "food-orders" ? "block" : "hidden"}>
        <AdminOrders isActive={activeTab === "food-orders"} />
      </div>
      <div className={activeTab === "rental-orders" ? "block" : "hidden"}>
        <AdminControls isActive={activeTab === "rental-orders"} />
      </div>
      <div className={activeTab === "room-bookings" ? "block" : "hidden"}>
        <AdminControlsRoom isActive={activeTab === "room-bookings"} />
      </div>
      <div className={activeTab === "hall-bookings" ? "block" : "hidden"}>
        <AdminControlsHall />
      </div>
      <div className={activeTab === "parking-bookings" ? "block" : "hidden"}>
        <AdminControlsParking isActive={activeTab === "parking-bookings"} />
      </div>
    </div>
  );
}

export default AdminNotifications;
