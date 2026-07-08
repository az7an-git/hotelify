import React from 'react'
import Loader from '../common/loader/Loader'

function UserFoodNotification({ notifications, handleDelete, loading }) {
  return (
    <div className="space-y-6 mx-auto p-4 flex justify-between items-center flex-wrap">
      {loading.food ? <Loader msg={"Fetching Food Updates for you"} /> : notifications.length > 0 ? (
        <div className="space-y-6">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="p-6 border rounded-lg shadow-md bg-white transform transition duration-500 hover:shadow-lg"
            >
              <p className="text-gray-800">
                {notification.message} dear <span className="font-semibold">{notification.userName}</span>
              </p>
              <p className="font-semibold mt-3">Ordered Items:</p>
              <ul className="mt-2 ml-4 space-y-2">
                {notification.orderedItems.map((item, index) => (
                  <li key={index} className="list-disc text-gray-600">{`${item.name} - Quantity: ${item.quantity}`}</li>
                ))}
              </ul>
              <button
                onClick={() => handleDelete(notification.id, 'food-notifications')}
                className="mt-4 px-4 py-2 bg-red-500 text-slate-800 rounded-full transition duration-300 transform hover:bg-red-600 hover:scale-105"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No notifications yet for food orders.
        </div>
      )}
    </div>

  )
}

export default UserFoodNotification
