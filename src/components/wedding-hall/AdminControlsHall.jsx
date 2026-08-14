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

  const activeBookings = bookings.filter(
    (booking) => booking.status !== 'Rejected' && booking.status !== 'Delivered'
  );

  return loading ? (
    <Loader msg={"Fetching Halls Notfications"} />
  ) : (
    <div className="p-4 sm:p-6">
      {activeBookings.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No wedding hall bookings pending action.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {activeBookings.map((booking) => (
            <div
              key={booking.id}
              className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Booking from <span className="text-amber-400 font-semibold">{booking.name}</span>
                  </h3>
                  <div className="text-sm space-y-2 mb-4 text-slate-300">
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Hall:</span>
                      <span className="text-slate-100 font-semibold">{booking.hallName}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Contact:</span>
                      <span className="text-slate-100 font-semibold">{booking.contact}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Status:</span>
                      <span className={`px-2.5 py-0.5 text-xs rounded-full font-semibold capitalize border ${
                        booking.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : booking.status === 'Accepted'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {booking.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                {booking.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateBookingStatus(booking.id, "Accepted", booking.userId, booking.hallName, booking.name)}
                      className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-emerald-600/20"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, "Rejected", booking.userId, booking.hallName, booking.name)}
                      className="flex-1 px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-rose-600/20"
                    >
                      Reject
                    </button>
                  </>
                )}

                {booking.status === "Accepted" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "Delivered", booking.userId, booking.hallName, booking.name)}
                    className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-amber-600/20"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminControlsHall;
