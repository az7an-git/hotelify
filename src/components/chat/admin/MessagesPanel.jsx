import React, { useEffect, useRef, useState } from 'react'

function MessagesPanel({ selectedUser, messages, newMessage, setNewMessage, handleSendMessage, viewMessage }) {
  const chatContainerRef = useRef(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Scroll to the bottom whenever the component renders or updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onSend = async (userId) => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    try {
      await handleSendMessage(userId);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`w-full lg:flex-1 p-3.5 sm:p-5 flex flex-col h-[75vh] sm:h-[72vh] bg-white/40 backdrop-blur-md shadow-sm border border-white/50 border-y lg:border-r border-white/60 rounded-2xl lg:rounded-r-2xl lg:rounded-l-none ${viewMessage ? 'flex' : 'max-lg:hidden'}`}>
      {selectedUser ? (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 mb-3.5 pb-2.5 border-b border-white/60">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
              {(selectedUser.name || 'U').charAt(0).toUpperCase()}
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-wide text-slate-800 truncate">
              {selectedUser.name || 'User'}
            </h3>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto bg-white/40 backdrop-blur-md border border-white/50 p-3 sm:p-4 rounded-2xl shadow-inner element space-y-3"
          >
            {messages.map(msg => (
              msg.userId === selectedUser.id && (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.senderId === 'admin' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl shadow-md max-w-[85%] sm:max-w-md text-xs sm:text-sm break-words ${msg.senderId === 'admin'
                      ? 'bg-blue-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-50 text-slate-700 border border-white/60 rounded-tl-none'
                      }`}
                  >
                    {msg.message}
                  </div>
                  {msg.timestamp && (
                    <span className="text-[10px] text-slate-400 mt-0.5 px-1">
                      {new Date(msg.timestamp?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              )
            ))}
          </div>

          {/* Input Bar */}
          <div className="mt-3.5 flex gap-2 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={sending}
              className="flex-1 min-w-0 bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-colors disabled:opacity-60"
            />
            <button
              onClick={() => onSend(selectedUser.id)}
              disabled={sending || !newMessage.trim()}
              className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-slate-950 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[70px] shrink-0"
            >
              {sending ? (
                <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full" />
              ) : (
                "Send"
              )}
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