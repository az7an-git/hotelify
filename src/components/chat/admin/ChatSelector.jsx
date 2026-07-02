import React from 'react'
import Loader from '../../common/loader/Loader'

function ChatSelector({users, showSideMenu, selectedUser, setSelectedUser, loading, viewMessage, setViewMessage}) {
  const handleUser = (user) => {
    setSelectedUser(user);
    setViewMessage(true);
  }
  return (
    <div className={`w-1/4 border-r border-white/60 bg-white/40 backdrop-blur-md shadow-sm border border-white/50 p-3 h-[70vh] rounded-l-2xl ${showSideMenu ? 'flex flex-col' : 'hidden'} ${viewMessage ? 'max-lg:hidden' : 'max-lg:w-full max-lg:text-center'}`}>
    <h3 
      className="text-lg font-bold tracking-wide mb-4 text-slate-800 border-b border-white/60 pb-2">
      Users
    </h3>
    
    <div className="space-y-2 overflow-y-auto">
      {
        loading.user ? <Loader msg={"Fetching Users"} /> :
        users && users.length > 0 ? 
        
        users.map(user => (
        <div 
          key={user.id} 
          className={`md:p-3 max-md:text-sm p-2 rounded-xl cursor-pointer transition-all duration-200 border font-medium ${
            selectedUser?.id === user.id 
              ? 'bg-blue-500 text-slate-950 border-teal-300 shadow-md shadow-teal-500/10' 
              : 'bg-white/40 backdrop-blur-md border border-white/50 text-slate-600 font-medium border-white/60/60 hover:bg-slate-800 hover:text-slate-700'
          }`}
          onClick={() => handleUser(user)}
        >
        <span className=''>
        {user.name || 'Unknown User'}
        </span>
       
        </div>
      )) :
      <p className="text-sm text-slate-600 font-medium italic text-center py-4">No users to chat</p>
      }
    </div>
  </div>
  )
}

export default ChatSelector
