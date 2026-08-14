import React from 'react'
import Loader from '../common/loader/Loader'

function UserFoodNotification({ notifications, handleDelete, loading, deletingId }) {
  return (
    <div className="p-4 sm:p-6">
      {loading.food ? (
        <Loader msg={"Fetching Food Updates for you"} />
      ) : notifications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-emerald-400 font-semibold text-sm mb-3">
                    {notification.message} dear <span className="text-amber-300 font-bold">{notification.userName}</span>
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 mt-2 mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ordered Items:</p>
                  <ul className="space-y-2 text-sm">
                    {notification.orderedItems.map((item, index) => (
                      <li key={index} className="flex items-center justify-between text-xs sm:text-sm bg-slate-900/60 px-3.5 py-2 rounded-xl border border-white/10 shadow-inner">
                        <span className="text-slate-100 font-semibold">{item.name}</span>
                        <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                disabled={deletingId === notification.id}
                onClick={() => handleDelete(notification.id, 'food-notifications')}
                className="mt-auto w-full py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl font-bold text-xs tracking-wide transition duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-wait shadow-lg shadow-rose-600/20"
              >
                {deletingId === notification.id ? "Deleting..." : "Clear Notification"}
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
