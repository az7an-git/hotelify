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
  <section className="py-16 glass-panel rounded-3xl mx-4 my-12 text-slate-800">
    <div className="container mx-auto px-8 text-center">
      <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-12">
        Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Amenities</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {amenities.map((amenity, index) => (
          <div key={index} className="p-6 bg-white/40 backdrop-blur-md border border-white/50 border border-white/60/80 rounded-2xl text-center transform hover:-translate-y-1 transition-all duration-300 shadow-xl">
            <div className="text-blue-600 text-5xl flex justify-center mb-4">{amenity.icon}</div>
            <h3 className="text-lg font-bold text-slate-700">{amenity.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AmenitiesSection;
