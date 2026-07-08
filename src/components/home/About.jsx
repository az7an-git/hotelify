import React, { useState } from 'react';
import ImgLoader from '../common/loader/ImgLoader';

const AboutUsSection = () => {
  const [loading, setLoading] = useState(false);
  // Use an Unsplash fallback image directly
  const fallbackAboutBg = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80";

  return (
    loading ? <ImgLoader /> :
      <section className="py-8 lg:py-24 my-4 md:my-16 mx-0 sm:mx-6 lg:mx-8">
        <div className="container mx-auto max-w-7xl glass-card p-5 sm:p-10 lg:p-16 rounded-none sm:rounded-3xl shadow-2xl border border-white/60 lg:flex lg:items-center lg:gap-16 bg-white/50 backdrop-blur-xl">
          <div className="lg:w-1/2 space-y-4 lg:space-y-8 text-left">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-800">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800">Magnum Hotel</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-lg leading-relaxed font-medium">
              Experience unmatched luxury and comfort at The Magnum. From the moment you step through our doors, you'll be immersed in elegance and refinement. Our dedicated staff is committed to providing a personalized and unforgettable stay.
            </p>
            <div className="pt-1">
              <button className="glass-button-primary inline-block px-7 py-3 rounded-full text-base shadow-blue-500/20 hover:shadow-blue-500/40">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 h-52 sm:h-80 md:h-[400px] lg:h-[500px] mt-6 lg:mt-0 relative group rounded-2xl overflow-hidden shadow-2xl border border-white/80">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none"></div>
            <img src={fallbackAboutBg} alt="About Hotel" className="relative w-full h-full object-cover object-center transform group-hover:scale-110 transition duration-700 ease-in-out" />
          </div>
        </div>
      </section>
  );
};

export default AboutUsSection;
