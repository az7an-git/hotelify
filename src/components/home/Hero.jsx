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
      className="relative min-h-[90vh] mx-4 mt-24 rounded-3xl flex flex-col items-center justify-center bg-cover bg-center overflow-hidden pt-12 pb-12 shadow-2xl"
      style={{
        backgroundImage: `url(${fallbackHeroBg})`,
      }}
    >
      {/* Vibrant light gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent"></div>

      {/* Decorative ambient light source */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 w-[92%] max-w-4xl mx-auto space-y-4 md:space-y-6 glass-card p-6 md:p-12 mt-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-slide-up pb-2">
          Experience Luxury & Comfort
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto font-medium animate-slide-up">
          Welcome to <span className="text-blue-600 font-bold">Magnum</span> — Your dream luxury stay awaits!
        </p>
        <div className="pt-4 animate-slide-up">
          <Link
            to="/room-booking"
            className="glass-button-primary inline-block px-8 py-3.5 rounded-full text-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <span>Book Now</span>
          </Link>
        </div>

        {/* Professional Stats Banner */}
        <div className="pt-8 md:pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-slate-200 mt-6 md:mt-8 animate-slide-up">
          <div className="text-center">
            <h4 className="text-2xl md:text-3xl font-extrabold text-blue-600">150+</h4>
            <p className="text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Luxury Rooms</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl md:text-3xl font-extrabold text-blue-600">5 Star</h4>
            <p className="text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Services</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl md:text-3xl font-extrabold text-blue-600">24/7</h4>
            <p className="text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Concierge</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl md:text-3xl font-extrabold text-blue-600">100%</h4>
            <p className="text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;