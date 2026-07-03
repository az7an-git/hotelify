import React from 'react'

function Tabs({ categories, handleCategoryChange, selectedCategory, }) {
  return (
    <div>
      <div className="tabs flex justify-center items-center mb-8 gap-3 sm:gap-4 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-md border ${selectedCategory === category
              ? 'bg-blue-500 text-white border-blue-400 shadow-blue-500/30'
              : 'bg-white/50 text-slate-600 border-white/60 hover:text-blue-700 hover:bg-white/80 backdrop-blur-md hover:shadow-lg'
              }`}
            onClick={() => handleCategoryChange(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs
