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
      className="relative min-h-[65vh] md:min-h-[88vh] mx-0 sm:mx-4 mt-16 md:mt-24 rounded-lg sm:rounded-3xl flex flex-col items-center justify-center bg-cover bg-center overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `url(${fallbackHeroBg})`,
      }}
    >
      {/* Dark overlay — darker at bottom so text on glass card is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-800/40 to-slate-900/30"></div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main card */}
      <div className="relative z-10 text-center px-8 sm:px-12 w-[95%] max-w-6xl mx-auto space-y-6 glass-card py-16 md:py-24 rounded-2xl sm:rounded-[3rem]">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-700 animate-slide-up leading-tight">
          Experience Luxury &amp; Comfort
        </h1>
        <p className="text-base md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium animate-slide-up">
          Welcome to <span className="text-amber-700 font-bold">Magnum</span> — Your dream luxury stay awaits!
        </p>
        <div className="animate-slide-up pt-4">
          <Link
            to="/room-booking"
            className="glass-button-primary inline-block px-8 py-3 sm:px-12 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-xl shadow-amber-600/20 hover:shadow-amber-600/40"
          >
            <span>Book Now</span>
          </Link>
        </div>

        {/* Stats row */}
        <div className="pt-10 grid grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto border-t border-slate-200/60 mt-4 animate-slide-up">
          <div className="text-center">
            <h4 className="text-xl md:text-4xl font-extrabold text-amber-700">150+</h4>
            <p className="text-[10px] sm:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1">Rooms</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl md:text-4xl font-extrabold text-amber-700">5★</h4>
            <p className="text-[10px] sm:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1">Services</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl md:text-4xl font-extrabold text-amber-700">24/7</h4>
            <p className="text-[10px] sm:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1">Concierge</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl md:text-4xl font-extrabold text-amber-700">100%</h4>
            <p className="text-[10px] sm:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;