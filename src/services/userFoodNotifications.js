// src/services/notificationService.js

import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

// Fetch user's food notifications by userId
export const getUserFoodNotifications = async (userId) => {
  const notificationsCollection = collection(db, 'food-notifications');
  const q = query(notificationsCollection, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Delete a specific notification by ID
export const deleteNotification = async (notificationId, collectionNotification) => {
  const notificationRef = doc(db, collectionNotification, notificationId);
  await deleteDoc(notificationRef);
};
