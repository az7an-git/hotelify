import React from 'react'

function Tabs({ categories, handleCategoryChange, selectedCategory, }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-md ${selectedCategory === category
            ? 'bg-teal-400 text-slate-950 border border-teal-300'
            : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Tabs
