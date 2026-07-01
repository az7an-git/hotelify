import React, { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/Firebase';
import {inputStyles} from '../registrations/FoodRegistration';
import Loader from '../common/loader/Loader';

const UserChat = () => {
  const { currentUser } = useAuth();
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messageList);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [currentUser]);
  useEffect(() => {
    // Scroll to the bottom whenever the component renders or updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); 

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
  
    await addDoc(collection(db, 'messages'), {
      userId: currentUser.uid,
      senderId: currentUser.uid,
      message: newMessage,
      timestamp: serverTimestamp(),
    });
  
    setNewMessage('');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-bold mb-4">Chat with Admin</h2>
      <div
            ref={chatContainerRef}
       className="overflow-y-auto h-[50vh] element bg-gray-50 p-4 rounded-lg shadow mb-4">
       { loading ? <Loader msg={"Fetching your messages"} /> :
        messages.map(msg => (
        ( msg.senderId === currentUser.uid || msg.senderId === 'admin') && msg.userId === currentUser.uid &&
        <div 
            key={msg.id} 
            className={`mb-2 p-2 rounded-lg shadow-md w-fit ${msg.senderId === currentUser.uid ? 'bg-green-100 text-right ms-auto' : msg.senderId === 'admin' ? 'bg-gray-300 text-left' : 'hidden'}`}
          >
            {msg.message}
          </div> 
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
          className={`flex-1  p-2 mr-2 ${inputStyles}`}
        />
        <button 
        type='submit'
          className="bg-green-500 hover:bg-green-800 transition-all duration-200 text-white px-4 py-2 rounded-xl"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default UserChat;