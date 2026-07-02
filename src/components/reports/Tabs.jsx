import React from "react";

function Tabs({ setActiveTab, activeTab }) {
  return (
    <div className="flex gap-4 mb-4 flex-wrap max-md:space-y-3">
      {["Food Orders", "Rental Orders", "Room Orders", "Hall Orders"].map(
        (tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-md ${
              tab === activeTab
                ? "bg-blue-500 text-slate-950 border border-teal-300"
                : "bg-white/40 text-slate-600 hover:text-blue-600 hover:bg-white/60 border border-white/50 shadow-sm rounded-xl backdrop-blur-md transition-all"
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
