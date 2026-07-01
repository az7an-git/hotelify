import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';

// Add gallery Item
export const addToGallery = async (imageFile) => {
  try {
    // Upload Image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Add gallery Item to Firestore
    await addDoc(collection(db, 'galleryPics'), {
      imageUrl,
    });
  } catch (error) {
    console.error('Error adding picture to gallery:', error);
    return null;
  }
};

// Fetch gallery Items
export const fetchFromGallery = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'galleryPics'));
    const galleryItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return galleryItems;
  } catch (error) {
    console.error('Error fetching gallery pics:', error);
    return [];
  }
};
