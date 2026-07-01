import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const getBookingsByDateRange = async (category, startDate, endDate) => {
  const collectionMap = {
    'Food Orders': 'food-orders',
    'Rental Orders': 'vehicle-rental',
    'Room Orders': 'room-bookings',
    'Hall Orders': 'wedding-hall-bookings',
  };
  const selectedCollection = collectionMap[category];

  const bookingsRef = collection(db, selectedCollection);
  const bookingsQuery = query(
    bookingsRef,
    where('applyDate', '>=', startDate),
    where('applyDate', '<=', endDate)
  );

  const querySnapshot = await getDocs(bookingsQuery);
  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return bookings;
};
