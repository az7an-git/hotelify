import React from 'react';
import { FaSwimmingPool, FaSpa, FaWifi, FaUtensils, FaDumbbell, FaConciergeBell } from 'react-icons/fa';

const amenities = [
  { icon: <FaSwimmingPool />, title: 'Swimming Pool' },
  { icon: <FaSpa />, title: 'Spa & Wellness' },
  { icon: <FaWifi />, title: 'Free Wi-Fi' },
  { icon: <FaUtensils />, title: 'Restaurant' },
  { icon: <FaDumbbell />, title: 'Gym' },
  { icon: <FaConciergeBell />, title: '24/7 Concierge' },
];

const AmenitiesSection = () => (
  <section className="py-12 md:py-16 my-8 md:my-12 text-slate-800">
     <div className="w-[95%] max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
       <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10">
         Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800">Amenities</span>
       </h2>
       <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
         {amenities.map((amenity, index) => (
           <div key={index} className="p-4 sm:p-6 glass-card border border-white/60 text-center transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
             <div className="text-amber-600 text-4xl sm:text-5xl flex justify-center mb-3 sm:mb-4">{amenity.icon}</div>
             <h3 className="text-sm sm:text-lg font-bold text-slate-700">{amenity.title}</h3>
           </div>
         ))}
       </div>
     </div>
   </section>
);

export default AmenitiesSection;
