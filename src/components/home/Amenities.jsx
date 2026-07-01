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
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-8 text-center ">
      <h2 className="text-3xl font-bold mb-8">Our Amenities</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {amenities.map((amenity, index) => (
          <div key={index} className="text-center transform hover:scale-105 transition duration-500 shadow-sm">
            <div className="text-yellow-500 text-6xl mb-4">{amenity.icon}</div>
            <h3 className="text-xl font-semibold">{amenity.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AmenitiesSection;
