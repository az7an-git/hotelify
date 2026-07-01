import { collection, addDoc, getDocs,  } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';

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
    console.error('Error adding food item:', error);
  }
};

// Fetch Food Items
export const fetchFoodItems = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'foodItems'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching food items:', error);
  }
};
