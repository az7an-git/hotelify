import React from 'react';

const HallCard = ({ hall }) => {
  const { name, description, pp, offers, imageUrl } = hall;

  return (
    <div className="mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden ">
      <div>
        <img
          src={imageUrl}
          alt={name}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{name}</h2>
        <p className="text-gray-700 mt-2">{description}</p>
        <p className="text-gray-900 font-semibold mt-4">
          Rate per Person: <span className="text-blue-600">${pp}</span>
        </p>
        <h3 className="text-lg font-semibold text-gray-800 mt-6">Offers:</h3>
        {offers && offers.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {offers.map((offer, index) => (
              <li
                key={index}
                className="p-4 border rounded-md shadow-sm bg-blue-50"
              >
                <h4 className="font-bold text-blue-700">{offer.title}</h4>
                <p className="text-gray-600 mt-1">{offer.description}</p>
                <p className="text-gray-800 mt-1">
                  <strong>Price:</strong>{' '}
                  <span className="text-green-600">${offer.price}</span>
                </p>
            
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-4">No offers available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default HallCard;
