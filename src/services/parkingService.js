import { doc, updateDoc, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

// Fetch all parking options
export const getParkingOptions = async () => {
  const parkingCollection = collection(db, 'parking-options');
  const snapshot = await getDocs(parkingCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Toggle availability for a parking option
export const toggleParkingAvailability = async (vehicleId, isAvailable) => {
  const vehicleDoc = doc(db, 'parking-options', vehicleId);
  await updateDoc(vehicleDoc, { isAvailable });
};

// Book a parking spot
export const bookParkingSpot = async ({ userId, userName, spotId, spotName, spotCategory, startDate, endDate, totalRate }) => {
  try {
    await addDoc(collection(db, 'parking-bookings'), {
      userId,
      userName,
      spotId,
      spotName,
      spotCategory,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalRate,
      status: 'pending',
      applyDate: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error('Error booking parking spot:', error);
    throw error;
  }
};

// Fetch all parking bookings
export const getParkingBookings = async () => {
  const snapshot = await getDocs(collection(db, 'parking-bookings'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update status of a parking booking
export const updateParkingBookingStatus = async (bookingId, newStatus) => {
  const orderRef = doc(db, 'parking-bookings', bookingId);
  await updateDoc(orderRef, { status: newStatus });
};

// Send a booking notification to user
export const sendParkingBookingNotification = async (userId, message, spotName, userName, startDate, endDate, status) => {
  const notificationsCollection = collection(db, 'parking-booking-notifications');
  await addDoc(notificationsCollection, {
    userId,
    message,
    spotName,
    userName,
    startDate,
    endDate,
    status,
    timestamp: new Date(),
  });
};

// Fetch parking booking notifications
export const getParkingBookingsNotification = async () => {
  const collectionRef = collection(db, 'parking-booking-notifications');
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
