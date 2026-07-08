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
      <div className="relative z-10 text-center px-6 sm:px-8 w-[92%] max-w-3xl mx-auto space-y-5 glass-card py-10 md:py-14 rounded-2xl sm:rounded-3xl">
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-700 animate-slide-up leading-tight">
          Experience Luxury &amp; Comfort
        </h1>
        <p className="text-sm md:text-xl text-slate-600 max-w-xl mx-auto font-medium animate-slide-up">
          Welcome to <span className="text-amber-700 font-bold">Magnum</span> — Your dream luxury stay awaits!
        </p>
        <div className="animate-slide-up">
          <Link
            to="/room-booking"
            className="glass-button-primary inline-block px-7 py-3 sm:px-10 sm:py-4 rounded-full text-base sm:text-lg"
          >
            <span>Book Now</span>
          </Link>
        </div>

        {/* Stats row */}
        <div className="pt-6 grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto border-t border-slate-200/60 mt-2 animate-slide-up">
          <div className="text-center">
            <h4 className="text-lg md:text-3xl font-extrabold text-amber-700">150+</h4>
            <p className="text-[9px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Rooms</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg md:text-3xl font-extrabold text-amber-700">5★</h4>
            <p className="text-[9px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Services</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg md:text-3xl font-extrabold text-amber-700">24/7</h4>
            <p className="text-[9px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Concierge</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg md:text-3xl font-extrabold text-amber-700">100%</h4>
            <p className="text-[9px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;