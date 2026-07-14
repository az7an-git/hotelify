import React from "react";

function Tabs({ setActiveTab, activeTab }) {
  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      {["Food Orders", "Rental Orders", "Room Orders", "Hall Orders"].map(
        (tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-md border text-center ${
              tab === activeTab
                ? "bg-amber-600 text-white border-amber-500 shadow-amber-500/10"
                : "bg-white/50 text-slate-600 border-white/60 hover:text-amber-700 hover:bg-white/80 backdrop-blur-md hover:shadow-lg"
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
