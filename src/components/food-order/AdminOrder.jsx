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
    <div className="p-4 sm:p-6">
      {activeOrders.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No food orders pending action.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Order for <span className="text-amber-400 font-semibold">{order.name}</span>
                  </h3>
                  <div className="text-sm space-y-2 mb-4 text-slate-300">
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Contact:</span>
                      <span className="text-slate-100 font-semibold">{order.contact}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Address:</span>
                      <span className="text-slate-100 font-semibold">{order.address}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Status:</span>
                      <span className={`px-2.5 py-0.5 text-xs rounded-full font-semibold capitalize border ${order.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : order.status === 'accepted'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}>
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 mt-2 mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Items:</p>
                  <ul className="space-y-2 text-sm">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between text-xs sm:text-sm bg-slate-900/60 px-3.5 py-2 rounded-xl border border-white/10 shadow-inner">
                        <span className="text-slate-100 font-semibold">{item.name}</span>
                        <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                {order.status === 'pending' && (
                  <>
                    <button
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(order.id, order.userId, 'accepted', order.items, order.name, "accept")}
                      className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${order.id}-accept` ? "Processing..." : "Accept"}
                    </button>
                    <button
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(order.id, order.userId, 'rejected', order.items, order.name, "reject")}
                      className="flex-1 px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-rose-600/20 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${order.id}-reject` ? "Processing..." : "Reject"}
                    </button>
                  </>
                )}
                {order.status === 'accepted' && (
                  <button
                    disabled={!!processingId}
                    onClick={() => handleStatusChange(order.id, order.userId, 'delivered', order.items, order.name, "deliver")}
                    className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-wait"
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
