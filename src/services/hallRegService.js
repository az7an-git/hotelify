import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';
import { toast } from 'sonner';

// Delete Hall
export const deleteHall = async (hallId) => {
  try {
    await deleteDoc(doc(db, 'halls', hallId));
  } catch (error) {
    toast.error(`Error deleting hall: ${error.message || error}`);
  }
};

// Add Hall
export const addHall = async (name, description, pp, imageFile, available, offers) => {
  try {
    // Upload Image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Add Hall to Firestore
    await addDoc(collection(db, 'halls'), {
      name,
      description,
      pp,
      imageUrl,
      available,
      offers,
    });
  } catch (error) {
    toast.error(`Error adding hall: ${error.message || error}`);
  }
};

// Fetch Halls
export const fetchHalls = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'halls'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error(`Error fetching halls: ${error.message || error}`);
    return [];
  }
};

// Fetch Halls bookings
export const fetchHallsBookings = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'wedding-hall-bookings'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error(`Error fetching hall bookings: ${error.message || error}`);
    return [];
  }
};
