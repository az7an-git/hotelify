import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImgLoader from "../common/loader/ImgLoader";

const HeroSection = () => {
  const [loading, setLoading] = useState(false);
  // Using a beautiful Unsplash fallback image directly to avoid Firebase 402 Payment Required errors
  const fallbackHeroBg = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80";

  return loading ? (
    <div className="h-screen w-full relative flex items-center justify-center bg-white/40 backdrop-blur-md border border-white/50">
      <ImgLoader />
    </div>
  ) : (
    <section
      className="relative min-h-[55vh] md:min-h-[85vh] mx-0 sm:mx-4 mt-16 md:mt-24 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center bg-cover bg-center overflow-hidden pt-8 pb-8 sm:pt-12 sm:pb-12 shadow-2xl"
      style={{
        backgroundImage: `url(${fallbackHeroBg})`,
      }}
    >
      {/* Vibrant light gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent"></div>

      {/* Decorative ambient light source */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 w-[96%] sm:w-[92%] max-w-4xl mx-auto space-y-4 md:space-y-6 glass-card p-4 sm:p-6 md:p-12 mt-4">
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 animate-slide-up pb-2">
          Experience Luxury & Comfort
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-xl mx-auto font-medium animate-slide-up">
          Welcome to <span className="text-amber-700 font-bold">Magnum</span> — Your dream luxury stay awaits!
        </p>
        <div className="pt-2 sm:pt-4 animate-slide-up">
          <Link
            to="/room-booking"
            className="glass-button-primary inline-block px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full text-base sm:text-lg"
          >
            <span>Book Now</span>
          </Link>
        </div>

        {/* Professional Stats Banner */}
        <div className="pt-6 md:pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto border-t border-slate-200 mt-4 md:mt-8 animate-slide-up">
          <div className="text-center">
            <h4 className="text-xl md:text-3xl font-extrabold text-amber-700">150+</h4>
            <p className="text-[10px] sm:text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Luxury Rooms</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl md:text-3xl font-extrabold text-amber-700">5 Star</h4>
            <p className="text-[10px] sm:text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Services</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl md:text-3xl font-extrabold text-amber-700">24/7</h4>
            <p className="text-[10px] sm:text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Concierge</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl md:text-3xl font-extrabold text-amber-700">100%</h4>
            <p className="text-[10px] sm:text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;