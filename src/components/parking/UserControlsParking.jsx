import React from 'react';
import Loader from '../common/loader/Loader';

function UserControlsParking({ parkingNotifications, handleDelete, loading, deletingId }) {
  return (
    <div className="p-4 sm:p-6">
      {loading.parking ? (
        <Loader msg={"Fetching parking updates for you"} />
      ) : parkingNotifications.length === 0 ? (
        <div className="w-full text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No notifications yet for parking.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {parkingNotifications.map((noti, i) => (
            <div
              key={noti.id || i}
              className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="flex-1 flex flex-col justify-between mb-4">
                <div>
                  <p className="font-bold capitalize text-white text-base mb-1">{noti.userName}!</p>
                  <p className="text-emerald-400 font-medium text-sm mb-3">{noti.message}</p>
                  <div className="text-xs text-slate-300 font-medium space-y-1.5 mb-4">
                    <p className="flex justify-between items-center"><span className="text-slate-400">Spot Name:</span> <span className="text-slate-100 font-semibold">{noti.spotName}</span></p>
                    <p className="flex justify-between items-center"><span className="text-slate-400">Period:</span> <span className="text-amber-300 font-semibold">{new Date(noti.startDate).toLocaleDateString()} - {new Date(noti.endDate).toLocaleDateString()}</span></p>
                  </div>
                </div>
              </div>
              <button
                disabled={deletingId === noti.id}
                onClick={() => handleDelete(noti.id, 'parking-booking-notifications')}
                className="mt-auto w-full py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl font-bold text-xs tracking-wide transition duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-wait shadow-lg shadow-rose-600/20"
              >
                {deletingId === noti.id ? "Clearing..." : "Clear Notification"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserControlsParking;
