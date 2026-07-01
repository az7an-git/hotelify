import React from "react";

function CardRate({vehicle, handleSubmit }) {
  return (
    <div className=" shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
      <div className="flex justify-between items-center font-semibold text-gray-800 text-lg lg:text-xl 2xl:text-3xl">
      <div className="   capitalize">{vehicle.name}</div>
      <div title="Per day" className="">${vehicle.price}</div>
      </div>
      <p className="text-gray-600 italic mb-4">{vehicle.desc}</p>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default CardRate;
