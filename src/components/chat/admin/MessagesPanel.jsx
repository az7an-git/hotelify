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
    <div className={`flex-1 p-4 flex flex-col h-[70vh] bg-white/40 backdrop-blur-md shadow-sm border border-white/50 border-y border-r border-white/60 rounded-r-2xl ${viewMessage ? '' : 'max-lg:hidden'}`}>
    {selectedUser ? (
      <>
        <h3 className="text-lg font-bold tracking-wide mb-4 text-slate-800 border-b border-white/60 pb-2">
          Chat with {selectedUser.name || 'User'}
        </h3>
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto bg-white/40 backdrop-blur-md border border-white/50 border border-white/60/80 p-4 rounded-2xl shadow-inner element space-y-3"
        >
          {messages.map(msg => (
            msg.userId === selectedUser.id &&
            <div 
              key={msg.id} 
              className={`p-3 rounded-2xl shadow-md max-w-md text-sm ${
                msg.senderId === 'admin' 
                  ? 'bg-blue-500 text-slate-950 ml-auto rounded-tr-none font-medium' 
                  : 'bg-slate-850 text-slate-700 border border-white/60 mr-auto rounded-tl-none'
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-1 bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-full px-5 py-3 outline-none focus:border-teal-500 transition-colors"
          />
          <button 
            onClick={() => handleSendMessage(selectedUser.id)} 
            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 px-6 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 shadow-md shadow-teal-500/10"
          >
            Send
          </button>
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center text-slate-600 font-medium italic text-sm">
        Select a user to start chatting
      </div>
    )}
  </div>
  )
}

export default MessagesPanel;