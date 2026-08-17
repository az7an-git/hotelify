import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';
import { toast } from 'sonner';

// Delete Vehicle
export const deleteVehicle = async (vehicleId) => {
  try {
    await deleteDoc(doc(db, 'vehicles', vehicleId));
  } catch (error) {
    toast.error(`Error deleting vehicle: ${error.message || error}`);
  }
};

// Add Vehicle
export const addVehicle = async (name, desc, price, imageFile, available) => {
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
    toast.error(`Error adding vehicle: ${error.message || error}`);
  }
};

// Fetch Vehicles
export const fetchVehicles = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'vehicles'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error(`Error fetching vehicles: ${error.message || error}`);
    return [];
  }
};
