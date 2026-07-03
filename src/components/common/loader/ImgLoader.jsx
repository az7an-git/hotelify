import React from 'react';
import logo from '../../../assets/common/magnum.png';

function ImgLoader() {
  return (
    <div className="flex flex-col justify-center items-center absolute inset-0 h-full w-full bg-slate-50/80 backdrop-blur-md z-50">
      {/* Pulsing Logo */}
      <img
        src={logo}
        alt="Loading..."
        className="w-24 h-20 sm:w-32 sm:h-24 object-contain animate-pulse drop-shadow-xl mb-6"
      />

      {/* Bouncing Dots */}
      <div className="flex items-center space-x-3">
        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3.5 h-3.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3.5 h-3.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

export default ImgLoader;
