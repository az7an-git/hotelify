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
    <div className="container mx-auto p-4 ">
    {loading ? <Loader msg={"Fetching Halls updates for you"} /> : notifications.length === 0 ? (
      <div className="w-full text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
        No notifications yet for wedding halls.
      </div>
    ) : (
  <div className='flex justify-between items-center flex=wrap'>
    {
      notifications.map(notification => (
        <div
          key={notification.id}
          className="p-5 mb-4 bg-gray-100 border shadow-md rounded-lg transform transition duration-500 hover:shadow-lg hover:scale-105 flex flex-col w-fit flex-wrap justify-between items-center "
        >
          <p className='font-bold text-gray-500 italic' >{notification.userName}!</p>
          <p className='font-bold text-gray-800 italic' >{notification.hallName}</p>
          <p className="text-gray-700">{notification.message}</p> 
          <button
            onClick={() => deleteNotification(notification.id)}
            className="mt-3 px-4 py-2 bg-red-500 text-slate-800 rounded-full transition duration-300 hover:bg-red-600 hover:scale-105"
          >
            Delete
          </button>
        </div>
      ))
    }
  </div>
    )
    }
  </div>
  
  );
};

export default UserControlsHall;
