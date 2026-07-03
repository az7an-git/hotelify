import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
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
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding room:', error);
  }
};

// Fetch Rooms
export const fetchRooms = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'rooms'));
    const roomsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return roomsList.sort((a, b) => {
      const getTimestamp = (createdAt) => {
        if (!createdAt) return 0;
        if (typeof createdAt.toMillis === 'function') return createdAt.toMillis();
        if (createdAt.seconds) return createdAt.seconds * 1000;
        const time = new Date(createdAt).getTime();
        return isNaN(time) ? 0 : time;
      };
      return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};
