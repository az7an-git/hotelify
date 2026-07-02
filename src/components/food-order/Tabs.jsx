import React from 'react'

function Tabs({ categories, handleCategoryChange, selectedCategory, }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-md ${selectedCategory === category
            ? 'bg-blue-500 text-slate-950 border border-teal-300'
            : 'bg-white/40 text-slate-600 hover:text-blue-600 hover:bg-white/60 border border-white/50 shadow-sm rounded-xl backdrop-blur-md transition-all'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Tabs
