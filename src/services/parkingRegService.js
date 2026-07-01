import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';

// Add Parking Spot
export const addParkingSpot = async (name, category, rate, isAvailable, imageFile) => {
  try {
    // Upload Image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Add Parking Spot to Firestore
    await addDoc(collection(db, 'parkingSpots'), {
      name,
      category,
      rate,
      isAvailable,
      imageUrl,
    });
  } catch (error) {
    console.error('Error adding parking spot:', error);
  }
};

// Fetch Parking Spots
export const fetchParkingSpots = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'parkingSpots'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching parking spots:', error);
  }
};
