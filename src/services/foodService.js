// src/services/foodOrderService.js

import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const saveFoodOrder = async (orderData) => {
  const foodOrdersCollection = collection(db, 'food-orders');
  const orderDatawithDate = {
    ...orderData,
    applyDate: Timestamp.fromDate(new Date()),
  };
  await addDoc(foodOrdersCollection, orderDatawithDate);
};
// src/services/notificationService.js



export const sendNotification = async (userId, message, orderedItems,userName) => {
  const notificationsCollection = collection(db, 'food-notifications');
  await addDoc(notificationsCollection, {
    userId,
    message,
    orderedItems,
    userName,
    timestamp: new Date(),
  });
};

