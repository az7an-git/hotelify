import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';

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
    console.error('Error adding hall:', error);
  }
};

// Fetch Halls
export const fetchHalls = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'halls'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching halls:', error);
  }
};
// Fetch Halls bookings
export const fetchHallsBookings = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'wedding-hall-bookings'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching halls:', error);
  }
};
