import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { fetchChatUsers } from "../../services/chatService";
import MessagesPanel from "./admin/MessagesPanel";
import ChatSelector from "./admin/ChatSelector";
import SidebarToggler from "./admin/SidebarToggler";
import { IoArrowBack } from "react-icons/io5";

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showSideMenu, setShowSideMenu] = useState(true);
  const [viewMessage, setViewMessage] = useState(false);
  const [loading, setLoading] = useState({
    user: true,
    msgs: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchChatUsers();
      const senderOnly = fetchedUsers.filter((sender) => {
        return sender.id;
      });
      setUsers(senderOnly);
      setLoading({
        user: false,
      })
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Fetch chat history with selected user
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageList);
      });
      return unsubscribe;
    }
  }, [selectedUser]);

  const handleSendMessage = async (user) => {
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      userId: user,
      senderId: "admin",
      message: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };
  const handleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };
  const handleClick = () => {
    console.log('clicked')
    console.log(viewMessage)
    setViewMessage(false)
  }
  return (
    <div className="flex relative w-full flex-col lg:flex-row">
      {/* Sidebar toggler (Desktop) */}
      <SidebarToggler
        handleSideMenu={handleSideMenu}
        showSideMenu={showSideMenu}
      />

      {/* Back Button (Mobile when chat is selected) */}
      {viewMessage && (
        <button
          onClick={handleClick}
          className="lg:hidden flex items-center gap-2 mb-3 px-3 py-1.5 bg-white/40 backdrop-blur-md border border-white/50 rounded-full text-slate-800 font-semibold hover:text-blue-600 transition-all active:scale-95 cursor-pointer w-fit shadow-sm"
        >
          <IoArrowBack className="text-lg" />
          <span className="text-xs font-bold">Back</span>
        </button>
      )}

      {/* Left Panel - Chat Selector */}
      <ChatSelector
        users={users}
        showSideMenu={showSideMenu}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        loading={loading}
        viewMessage={viewMessage}
        setViewMessage={setViewMessage}
      />

      {/* Right Panel - Chat Window */}
      <MessagesPanel
        selectedUser={selectedUser}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        viewMessage={viewMessage}
      />
    </div>
  );
};

export default AdminChat;