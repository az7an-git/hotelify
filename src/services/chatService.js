import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const fetchChatUsers = async () => {
  try {
    const messagesSnapshot = await getDocs(collection(db, 'messages'));
    const messages = messagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Group messages by user ID and capture name/email if available
    const users = {};
    messages.forEach((message) => {
      if (!users[message.userId]) {
        users[message.userId] = { 
          id: message.userId, 
          name: message.senderName || message.senderEmail || `User (${message.userId.substring(0, 5)})`,
          email: message.senderEmail || '',
          messages: [] 
        };
      } else if (!users[message.userId].name || users[message.userId].name.startsWith('User (')) {
        if (message.senderName || message.senderEmail) {
          users[message.userId].name = message.senderName || message.senderEmail;
          users[message.userId].email = message.senderEmail || '';
        }
      }
      users[message.userId].messages.push(message);
    });

    return Object.values(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// ... (Your useEffect code remains the same)
