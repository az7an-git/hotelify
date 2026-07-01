// src/pages/AdminOrders.js

import React, { useEffect, useState } from 'react';
import { getFoodOrders, updateOrderStatus } from '../../services/orderService';
import { sendNotification } from '../../services/foodService';
import Loader from '../common/loader/Loader';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrders = async () => {
      const foodOrders = await getFoodOrders();
      setOrders(foodOrders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, userId, newStatus, orderedItems, name) => {
    await updateOrderStatus(orderId, newStatus);

    const notificationMessage = {
      accepted: 'Your order has been accepted!',
      rejected: 'Your order has been rejected.',
      delivered: 'Your order has been delivered!',
    };

    await sendNotification(userId, notificationMessage[newStatus], orderedItems, name);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, } : order
      )
    );
  };

  return (
    loading ? <Loader msg={'Fetching Food Notifications'} /> :
      <div className="">
        {
          <div className="space-y-6 p-4 flex justify-between items-center flex-wrap">
            {orders.map((order) => (
              order.status !== 'delivered' && order.status !== 'rejected' && (
                <div
                  key={order.id}
                  className="relative p-5 bg-white border-l-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl border-blue-500"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Order for {order.name}</h2>
                  <p className="text-gray-600">Contact: <span className="text-gray-800 font-medium">{order.contact}</span></p>
                  <p className="text-gray-600">Address: <span className="text-gray-800 font-medium">{order.address}</span></p>
                  <p className="text-gray-600">Status: <span className="text-blue-600 font-semibold capitalize">{order.status}</span></p>
                  <p className="text-lg font-semibold mt-3 text-gray-800">Items:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {order.items.map((item) => (
                      <li key={item.id} className="ml-5">{item.name} - Quantity: {item.quantity}</li>
                    ))}
                  </ul>

                  <div className="flex gap-3 mt-4 justify-start">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(order.id, order.userId, 'accepted', order.items, order.name)}
                          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-full transition transform hover:bg-green-600 hover:scale-110 focus:ring focus:ring-green-200"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(order.id, order.userId, 'rejected', order.items, order.name)}
                          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full transition transform hover:bg-red-600 hover:scale-110 focus:ring focus:ring-red-200"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {order.status === 'accepted' && (
                      <button
                        onClick={() => handleStatusChange(order.id, order.userId, 'delivered', order.items, order.name)}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-full transition transform hover:bg-blue-600 hover:scale-110 focus:ring focus:ring-blue-200"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        }
      </div>
  );
};

export default AdminOrders;
