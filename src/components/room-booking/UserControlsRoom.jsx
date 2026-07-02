import React from 'react';
import Loader from '../common/loader/Loader';

function UserControlsRoom({roomNotifications, handleDelete, loading}) {

  return (
    <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
    {
    loading.room ? <Loader msg={"Fetching room Updates for you"} /> : 
      
      roomNotifications.length === 0 ? (
      <p className="text-gray-500 italic">No Notifications yet (Room)</p>
    ) : (
      roomNotifications.map((room, i) => (
        <div
          key={i}
          className="p-4 mb-4 bg-white border shadow-sm rounded-lg transform transition duration-500 hover:shadow-md"
        >
        <p className='font-bold capitalize '>{room.userName}!</p>
          <p className="text-gray-700">{room.message}</p>

          <p className='font-semibold text-gray-600 italic'>Booked Room: {room.roomName}</p>
          <button
            onClick={() => handleDelete(room.id, 'room-booking-notifications')}
            className="mt-3 px-4 py-2 bg-red-500 text-slate-800 rounded-full transition duration-300 hover:bg-red-600 hover:scale-105"
          >
            Delete
          </button>
        </div>
      ))
    )}
  </div>
  
  )
}

export default UserControlsRoom
