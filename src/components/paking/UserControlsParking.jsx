import React from 'react';
import Loader from '../common/loader/Loader';

function UserControlsParking({ parkingNotifications, handleDelete, loading, deletingId }) {
  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-6 items-center justify-center">
      {
        loading.parking ? <Loader msg={"Fetching parking updates for you"} /> :
          parkingNotifications.length === 0 ? (
            <div className="w-full text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
              No notifications yet for parking.
            </div>
          ) : (
            parkingNotifications.map((noti, i) => (
              <div
                key={noti.id || i}
                className="p-5 bg-white border border-gray-150 shadow-md rounded-xl max-w-sm w-full transform transition duration-300 hover:shadow-lg"
              >
                <p className='font-bold capitalize text-slate-800 mb-1'>{noti.userName}!</p>
                <p className="text-emerald-600 font-semibold text-sm mb-3">{noti.message}</p>
                <div className="text-xs text-slate-500 font-medium space-y-1 mb-4">
                  <p><strong>Spot Name:</strong> {noti.spotName}</p>
                  <p><strong>Period:</strong> {new Date(noti.startDate).toLocaleDateString()} - {new Date(noti.endDate).toLocaleDateString()}</p>
                </div>
                <button
                  disabled={deletingId === noti.id}
                  onClick={() => handleDelete(noti.id, 'parking-booking-notifications')}
                  className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-xs tracking-wide transition duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-wait shadow-md shadow-rose-500/10"
                >
                  {deletingId === noti.id ? "Clearing..." : "Clear Notification"}
                </button>
              </div>
            ))
          )}
    </div>
  );
}

export default UserControlsParking;
