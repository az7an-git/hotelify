import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const getBookingsByDateRange = async (category, startDate = null, endDate = null) => {
  const collectionMap = {
    'Food Orders': 'food-orders',
    'Rental Orders': 'vehicle-rental',
    'Room Orders': 'room-bookings',
    'Hall Orders': 'wedding-hall-bookings',
  };
  const selectedCollection = collectionMap[category];
  if (!selectedCollection) return [];

  const bookingsRef = collection(db, selectedCollection);
  let bookingsQuery;

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    bookingsQuery = query(
      bookingsRef,
      where('applyDate', '>=', start),
      where('applyDate', '<=', end)
    );
  } else if (startDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    bookingsQuery = query(bookingsRef, where('applyDate', '>=', start));
  } else if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    bookingsQuery = query(bookingsRef, where('applyDate', '<=', end));
  } else {
    bookingsQuery = query(bookingsRef);
  }

  try {
    const querySnapshot = await getDocs(bookingsQuery);
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings report:', error);
    return [];
  }
};
