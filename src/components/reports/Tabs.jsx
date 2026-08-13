import React from "react";

function Tabs({ setActiveTab, activeTab }) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-4 mb-6 sm:mb-8 w-full">
      {["Food Orders", "Rental Orders", "Room Orders", "Hall Orders"].map(
        (tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border text-center ${
              tab === activeTab
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400/50 shadow-lg shadow-amber-500/20 scale-[1.02]"
                : "bg-slate-900/60 text-slate-300 border-white/10 hover:text-white hover:border-gold-400/40 backdrop-blur-md"
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
