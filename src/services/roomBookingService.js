// src/services/roomBookingService.js
import { collection, addDoc, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const addRoomBooking = async (bookingData) => {
  try {
    const bookingWithDate = {
      ...bookingData,
      applyDate: Timestamp.fromDate(new Date()), // Sets the apply date to the current date and time
    };
    await addDoc(collection(db, 'room-bookings'), bookingWithDate);
  } catch (error) {
    console.error('Error booking room:', error);
  }
};

export const getRoomBookings = async () => {
  const ordersCollection = collection(db, 'room-bookings');
  const orderSnapshot = await getDocs(ordersCollection);
  return orderSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateRoomOrderStatus = async (roomId, newStatus) => {
  const orderRef = doc(db, 'room-bookings', roomId);
  await updateDoc(orderRef, { status: newStatus });
};

export const sendRoomBookingNotification = async (userId, message, roomName, userName, bookedFrom, BookedUntil, RoomStatus) => {
  const notificationsCollection = collection(db, 'room-booking-notifications');
  await addDoc(notificationsCollection, {
    userId,
    message,
    roomName,
    userName,
    bookedFrom,
    BookedUntil,
    RoomStatus,
    timestamp: new Date(),
  });
};
export const getRoomBookingsNotification = async () => {
  const roomsCollection = collection(db, 'room-booking-notifications');
  const roomSnapshot = await getDocs(roomsCollection);
  return roomSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};