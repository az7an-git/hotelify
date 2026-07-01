import React from "react";

function Tabs({ setActiveTab, activeTab }) {
  return (
    <div className="flex gap-4 mb-4 flex-wrap max-md:space-y-3">
      {["Food Orders", "Rental Orders", "Room Orders", "Hall Orders"].map(
        (tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-white rounded-[50px] ${
              tab === activeTab ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            {tab}
          </button>
        )
      )}
    </div>
  );
}

export default Tabs;
