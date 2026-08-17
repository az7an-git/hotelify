import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';
import { toast } from 'sonner';

// Delete Parking Spot
export const deleteParkingSpot = async (spotId) => {
  try {
    await deleteDoc(doc(db, 'parkingSpots', spotId));
  } catch (error) {
    toast.error(`Error deleting parking spot: ${error.message || error}`);
  }
};

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
    toast.error(`Error adding parking spot: ${error.message || error}`);
  }
};

// Fetch Parking Spots
export const fetchParkingSpots = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'parkingSpots'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error(`Error fetching parking spots: ${error.message || error}`);
    return [];
  }
};
