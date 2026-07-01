// src/services/orderService.js

import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const getFoodOrders = async () => {
  const ordersCollection = collection(db, 'food-orders');
  const orderSnapshot = await getDocs(ordersCollection);
  return orderSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const orderRef = doc(db, 'food-orders', orderId);
  await updateDoc(orderRef, { status: newStatus });
};
