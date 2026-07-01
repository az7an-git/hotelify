// src/services/vehicleRentalService.js
import { collection, addDoc, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const addVehicleBooking = async (bookingData) => {
  try {
    const bookingWithDate = {
      ...bookingData,
      applyDate: Timestamp.fromDate(new Date()), // Sets the apply date to the current date and time
    };
    await addDoc(collection(db, 'vehicle-rental'), bookingWithDate);
  } catch (error) {
    console.error('Error booking vehicle:', error);
  }
};
export const getRentalVehicles = async () => {
  const ordersCollection = collection(db, 'vehicle-rental');
  const orderSnapshot = await getDocs(ordersCollection);
  return orderSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const getRentalVehiclesNotification = async () => {
  const ordersCollection = collection(db, 'vehicle-rental-notifications');
  const orderSnapshot = await getDocs(ordersCollection);
  return orderSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const sendRentalNotification = async (userId, message, orderedVehicle,userName, bookedFrom, BookedUntil) => {
  const notificationsCollection = collection(db, 'vehicle-rental-notifications');
  await addDoc(notificationsCollection, {
    userId,
    message,
    orderedVehicle,
    userName,
    bookedFrom,
    BookedUntil,
    timestamp: new Date(),
  });
};
export const updateRentalOrderStatus = async (orderId, newStatus) => {
  const orderRef = doc(db, 'vehicle-rental', orderId);
  await updateDoc(orderRef, { status: newStatus });
};