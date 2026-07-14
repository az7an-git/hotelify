// src/pages/AdminOrders.js

import React, { useEffect, useState } from 'react';
import { getFoodOrders, updateOrderStatus } from '../../services/orderService';
import { sendNotification } from '../../services/foodService';
import Loader from '../common/loader/Loader';

let foodOrdersCache = null;

const AdminOrders = ({ isActive }) => {
  const [orders, setOrders] = useState(foodOrdersCache || []);
  const [loading, setLoading] = useState(!foodOrdersCache);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!foodOrdersCache) {
        setLoading(true);
      }
      const foodOrders = await getFoodOrders();
      foodOrdersCache = foodOrders;
      setOrders(foodOrders);
      setLoading(false);
    };
    if (isActive) {
      fetchOrders();
    }
  }, [isActive]);

  const handleStatusChange = async (orderId, userId, newStatus, orderedItems, name, actionKey) => {
    try {
      setProcessingId(`${orderId}-${actionKey}`);
      await updateOrderStatus(orderId, newStatus);

      const notificationMessage = {
        accepted: 'Your order has been accepted!',
        rejected: 'Your order has been rejected.',
        delivered: 'Your order has been delivered!',
      };

      await sendNotification(userId, notificationMessage[newStatus], orderedItems, name);

      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      foodOrdersCache = updatedOrders;
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  const activeOrders = orders.filter(
    (order) => order.status !== 'delivered' && order.status !== 'rejected'
  );

  return loading ? (
    <Loader msg={'Fetching Food Notifications'} />
  ) : (
    <div className="p-4">
      {activeOrders.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No food orders pending action.
        </div>
      ) : (
        <div className="space-y-6 flex justify-between items-center flex-wrap">
          {activeOrders.map((order) => (
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
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(order.id, order.userId, 'accepted', order.items, order.name, "accept")}
                      className="px-4 py-2 bg-green-500 text-slate-800 font-semibold rounded-full transition transform hover:bg-green-600 hover:scale-110 focus:ring focus:ring-green-200 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${order.id}-accept` ? "Processing..." : "Accept"}
                    </button>
                    <button
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(order.id, order.userId, 'rejected', order.items, order.name, "reject")}
                      className="px-4 py-2 bg-red-500 text-slate-800 font-semibold rounded-full transition transform hover:bg-red-600 hover:scale-110 focus:ring focus:ring-red-200 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${order.id}-reject` ? "Processing..." : "Reject"}
                    </button>
                  </>
                )}
                {order.status === 'accepted' && (
                  <button
                    disabled={!!processingId}
                    onClick={() => handleStatusChange(order.id, order.userId, 'delivered', order.items, order.name, "deliver")}
                    className="px-4 py-2 bg-blue-500 text-slate-800 font-semibold rounded-full transition transform hover:bg-blue-600 hover:scale-110 focus:ring focus:ring-blue-200 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {processingId === `${order.id}-deliver` ? "Processing..." : "Mark as Delivered"}
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

export default AdminOrders;
