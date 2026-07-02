import React from 'react'

function Tabs({activeTab, setActiveTab}) {
    const tabs = [
        {
          order: "food-orders",
        },
        {
          order: "rental-orders",
        },
        {
          order: "room-bookings",
        },
        {
          order: "hall-bookings",
        },
      ];
  return (
    <div className="flex space-x-4 mb-6 flex-wrap max-lg:space-y-3">
        {tabs.map((tab, i) => {
          return (
            <button
              key={i}
              onClick={() => setActiveTab(tab.order)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide capitalize transition-all duration-200 shadow-md ${
                activeTab === tab.order
                  ? "bg-blue-500 text-slate-950 border border-teal-300"
                  : "bg-white/40 text-slate-600 hover:text-blue-600 hover:bg-white/60 border border-white/50 shadow-sm rounded-xl backdrop-blur-md transition-all"
              }`}
            >
              {tab.order.replace('-', ' ')}
            </button>
          );
        })}
      </div>
  )
}

export default Tabs
