import React from 'react';

const HallCard = ({ hall, onBook, isBooking }) => {
  const { name, description, pp, offers, imageUrl } = hall;

  return (
    <div className="glass-card max-w-sm w-full mx-auto p-4 flex flex-col justify-between space-y-4">
      <div className="space-y-4 flex flex-col flex-grow">
        <div className="overflow-hidden rounded-xl h-44 relative flex-shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow flex flex-col space-y-3">
          <h2 className="text-xl font-bold text-slate-800 capitalize">{name}</h2>
          <p className="text-slate-500 italic text-sm line-clamp-2">{description}</p>
          <p className="text-slate-800 font-semibold flex items-center justify-between border-t border-white/40 pt-3">
            <span>Rate per Person</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-bold">${pp}</span>
          </p>

          {offers && offers.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Special Offers</h3>
              <ul className="space-y-2">
                {offers.map((offer, index) => (
                  <li
                    key={index}
                    className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/50"
                  >
                    <h4 className="font-bold text-blue-700 text-sm">{offer.title}</h4>
                    {offer.description && <p className="text-slate-600 mt-0.5 text-xs">{offer.description}</p>}
                    {offer.price && (
                      <p className="text-xs mt-1 font-medium">
                        Price: <span className="text-emerald-600">${offer.price}</span>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-white/40 flex-shrink-0">
        <button
          type="button"
          onClick={onBook}
          className="w-full py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md transition-all duration-300"
        >
          {isBooking ? 'Close Booking' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default HallCard;
