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
        {
          order: "parking-bookings",
        },
      ];
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 max-w-md sm:max-w-none mx-auto mb-8">
        {tabs.map((tab, i) => {
          return (
            <button
              key={i}
              onClick={() => setActiveTab(tab.order)}
              className={`px-3 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide capitalize transition-all duration-300 shadow-md border text-center ${
                activeTab === tab.order
                  ? 'bg-amber-600 text-white border-amber-500 shadow-amber-500/10'
                  : 'bg-white/50 text-slate-600 border-white/60 hover:text-amber-700 hover:bg-white/80 backdrop-blur-md hover:shadow-lg'
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
