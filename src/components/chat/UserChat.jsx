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
  const [sending, setSending] = useState(false);

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
    if (newMessage.trim() === '' || sending) return;
  
    setSending(true);
    try {
      const displayName = currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'User');
      await addDoc(collection(db, 'messages'), {
        userId: currentUser.uid,
        senderId: currentUser.uid,
        senderName: displayName,
        senderEmail: currentUser.email || '',
        message: newMessage,
        timestamp: serverTimestamp(),
      });
    
      setNewMessage('');
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl text-center font-extrabold tracking-tight mb-6">
        Chat with <span className="text-blue-600">Admin</span>
      </h2>
      <div
        ref={chatContainerRef}
        className="overflow-y-auto h-[50vh] element bg-white/40 backdrop-blur-md shadow-sm border border-white/50 border border-white/60/80 p-4 rounded-2xl shadow-inner mb-4 space-y-3"
      >
        {loading ? (
          <Loader msg={"Fetching your messages"} />
        ) : (
          messages.map(
            (msg) =>
              (msg.senderId === currentUser.uid || msg.senderId === "admin") &&
              msg.userId === currentUser.uid && (
                <div
                  key={msg.id}
                  className={`p-3 rounded-2xl shadow-md max-w-md text-sm ${
                    msg.senderId === currentUser.uid
                      ? "bg-blue-500 text-slate-950 ml-auto rounded-tr-none font-medium"
                      : "bg-slate-850 text-slate-700 border border-white/60 mr-auto rounded-tl-none"
                  }`}
                >
                  {msg.message}
                </div>
              )
          )
        )}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          className="flex-1 bg-white/40 backdrop-blur-md shadow-sm border border-white/50 text-slate-700 border border-white/60 rounded-full px-5 py-3 outline-none focus:border-teal-500 transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={sending || !newMessage.trim()}
          className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-slate-950 px-6 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 shadow-md shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
        >
          {sending ? (
            <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full" />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserChat;