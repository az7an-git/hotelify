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
   <>
     <div className="flex relative max-lg:hidden">
      {/*  Sidebar toggler */}
      <SidebarToggler
        handleSideMenu={handleSideMenu}
        showSideMenu={showSideMenu}
      />
      {/* left Panel - Chat Selector */}
      <ChatSelector
        users={users}
        showSideMenu={showSideMenu}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        loading={loading}
        setViewMessage={setViewMessage}
      />

      {/* Right Panel - Chat Window */}
      <MessagesPanel
        selectedUser={selectedUser}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
    <div className="flex relative lg:hidden">
      {/*  Sidebar toggler */}
     <div className={`${viewMessage ? '' : 'hidden'}`} 
     onClick={handleClick}
     ><IoArrowBack className="text-2xl font-semibold" /></div>
      {/* left Panel - Chat Selector */}
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
   </>
  );
};

export default AdminChat;