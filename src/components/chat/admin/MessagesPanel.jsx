import React, { useEffect, useRef } from 'react'

function MessagesPanel({selectedUser, messages, newMessage, setNewMessage, handleSendMessage, viewMessage}) {
  const chatContainerRef = useRef(null);
   useEffect(() => {
      // Scroll to the bottom whenever the component renders or updates
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]); 
  return (
    <div className={`flex-1 p-1 md:p-4 flex flex-col h-[70vh]  ${viewMessage ? '' : 'max-lg:hidden'}`}>
    {selectedUser ? (
      <>
        <h3 className="text-xl font-semibold mb-4 ">Chat with {selectedUser.nsme ? selectedUser.name : 'User'}</h3>
        <div
        ref={chatContainerRef}
         className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow element">
          {messages.map(msg => (
          msg.userId === selectedUser.id &&
          <div 
              key={msg.id} 
              className={`mb-2 p-2 rounded-lg shadow-md w-fit ${msg.senderId === 'admin' ? 'bg-blue-100 text-right ms-auto' : msg.senderId === selectedUser.id ? 'bg-gray-300 text-left ' : 'hidden'}`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-1 border rounded p-2 mr-2"
          />
          <button 
            onClick={() => handleSendMessage(selectedUser.id)} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </>
    ) : (
      <p>Select a user to start chatting</p>
    )}
  </div>
  )
}

export default MessagesPanel;