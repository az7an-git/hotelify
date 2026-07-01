// src/services/parkingService.js
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
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
