// src/pages/AdminWeddingHallOrders.js

import React, { useEffect, useState } from 'react';
import { collection, updateDoc, doc, onSnapshot, addDoc,  } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import Loader from '../common/loader/Loader';

const AdminControlsHall = () => {
  const [bookings, setBookings] = useState([]);
  const[loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'wedding-hall-bookings'), (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const updateBookingStatus = async (bookingId, newStatus, userId, hallName, userName) => {
    const bookingRef = doc(db, 'wedding-hall-bookings', bookingId);
    await updateDoc(bookingRef, { status: newStatus });

    await addDoc(collection(db, 'wedding-hall-notifications'), {
      userId,
      hallName,
      message: `Your booking status is now: ${newStatus}`,
      userName,
      timestamp: new Date(),
    });
  };

  return (
    loading ? <Loader msg={"Fetching Halls Notfications"}/>  :
    <div className="container mx-auto p-4 ">    
    <div className="space-y-6 flex flex-wrap justify-between items-center">
      {bookings.map(booking => (
        booking.status !== 'Rejected' && booking.status !== 'Delivered' && (
          <div
            key={booking.id}
            className="p-6 bg-white border border-gray-200 shadow-lg rounded-lg transform transition duration-300 hover:shadow-xl hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Booking from <span className='italic capitalize'>{booking.name}</span></h3>
            <p className="text-xl font-semibold text-gray-700 mb-1">
               {booking.hallName}
            </p>
            <p className="text-gray-600">
              <strong>Contact:</strong>  {booking.contact}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Status:</strong> {booking.status}
            </p>
            
            <div className="flex gap-4 mt-4">
              {booking.status === "Pending" && (
                <>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "Accepted", booking.userId, booking.hallName, booking.name,)}
                    className="px-5 py-2 font-semibold bg-green-500 text-slate-800 rounded-full shadow-md transform transition hover:bg-green-600 hover:-translate-y-1 focus:ring focus:ring-green-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "Rejected", booking.userId, booking.hallName, booking.name,)}
                    className="px-5 py-2 font-semibold bg-red-500 text-slate-800 rounded-full shadow-md transform transition hover:bg-red-600 hover:-translate-y-1 focus:ring focus:ring-red-200"
                  >
                    Reject
                  </button>
                </>
              )}
              
              {booking.status === "Accepted" && (
                <button
                  onClick={() => updateBookingStatus(booking.id, "Delivered", booking.userId, booking.hallName, booking.name,)}
                  className="px-5 py-2 font-semibold bg-amber-600 text-white rounded-full shadow-md transform transition hover:bg-amber-700 hover:-translate-y-1 focus:ring focus:ring-amber-200"
                >
                  Delivered
                </button>
              )}
            </div>
          </div>
        )
      ))}
    </div>
  </div>
  );
};

export default AdminControlsHall;
