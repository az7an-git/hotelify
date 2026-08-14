import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';
import { toast } from 'sonner';

// Delete Food Item
export const deleteFoodItem = async (foodItemId) => {
  try {
    await deleteDoc(doc(db, 'foodItems', foodItemId));
  } catch (error) {
    toast.error(`Error deleting food item: ${error.message || error}`);
  }
};

// Add Food Item
export const addFoodItem = async (name, category, price, imageFile, available, desc) => {
  try {
    // Upload Image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Add Food Item to Firestore
    await addDoc(collection(db, 'foodItems'), {
      name,
      category,
      price,
      imageUrl,
      available,
      desc,
    });
  } catch (error) {
    toast.error(`Error adding food item: ${error.message || error}`);
  }
};

// Fetch Food Items
export const fetchFoodItems = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'foodItems'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error(`Error fetching food items: ${error.message || error}`);
    return [];
  }
};
