import React from 'react'

function Loader({msg}) {
  return (
    <div className="flex justify-center items-center w-full min-h-[50vh] p-4">
      <div className="text-center glass-card p-8 inline-block animate-fade-in">
        <div
          className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-600 mx-auto"
        ></div>
        <h2 className="text-slate-800 font-semibold mt-4">Loading...</h2>
        <p className="text-slate-600 text-sm mt-1">
         {msg}
        </p>
      </div>
    </div>
  )
}

export default Loader
