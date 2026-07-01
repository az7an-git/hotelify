import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';

// Add Vehicle
export const addVehicle = async (name, desc, price, imageFile, available ,) => {
  try {
    // Upload Image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Add Vehicle to Firestore
    await addDoc(collection(db, 'vehicles'), {
      name,
      desc,
      price,
      imageUrl,
      available,
    });
  } catch (error) {
    console.error('Error adding vehicle:', error);
  }
};

// Fetch Vehicles
export const fetchVehicles = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'vehicles'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
  }
};
