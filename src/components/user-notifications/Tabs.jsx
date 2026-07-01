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
              className={`px-4 py-2 rounded ${
                activeTab === tab.order
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab.order}
            </button>
          );
        })}
      </div>
  )
}

export default Tabs
