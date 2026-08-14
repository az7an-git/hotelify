import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/Firebase';
import Loader from '../common/loader/Loader';

const UserControlsHall = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        collection(db, 'wedding-hall-notifications'),
        (snapshot) => {
          const userNotifications = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(notification => notification.userId === currentUser.uid);
          setNotifications(userNotifications);
          setLoading(false);
        }
      );
      return unsubscribe;
    }
  }, [currentUser]);

  const deleteNotification = async (notificationId) => {
    await deleteDoc(doc(db, 'wedding-hall-notifications', notificationId));
  };

  return (
    <div className="p-4 sm:p-6">
      {loading ? (
        <Loader msg={"Fetching Halls updates for you"} />
      ) : notifications.length === 0 ? (
        <div className="w-full text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No notifications yet for wedding halls.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="flex-1 flex flex-col justify-between mb-4">
                <div>
                  <p className="font-bold text-white text-base capitalize mb-1">{notification.userName}!</p>
                  <h4 className="text-amber-400 font-bold text-base mb-2">{notification.hallName}</h4>
                  <p className="text-emerald-400 font-medium text-sm mb-3">{notification.message}</p>
                </div>
              </div>
              <button
                onClick={() => deleteNotification(notification.id)}
                className="mt-auto w-full py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl font-bold text-xs tracking-wide transition duration-200 active:scale-95 shadow-lg shadow-rose-600/20"
              >
                Clear Notification
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserControlsHall;
