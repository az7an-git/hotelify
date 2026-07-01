import React from 'react'
import Loader from '../common/loader/Loader'

function UserFoodNotification({notifications, handleDelete, loading}) {
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
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full transition duration-300 transform hover:bg-red-600 hover:scale-105"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 italic">No Food order updates yet</p>
    )}
  </div>
  
  )
}

export default UserFoodNotification
