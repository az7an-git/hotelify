import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { uploadToCloudinary } from './cloudinaryService';

// Add Room
export const addRoom = async (name, description, imageFile, available, price, beds) => {
  try {
    // Upload Image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Add Room to Firestore
    await addDoc(collection(db, 'rooms'), {
      name,
      description,
      imageUrl,
      available,
      price,
      beds,
    });
  } catch (error) {
    console.error('Error adding room:', error);
  }
};

// Fetch Rooms
export const fetchRooms = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'rooms'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};
