import React from 'react'
import Loader from '../../common/loader/Loader'

function ChatSelector({users, showSideMenu, selectedUser, setSelectedUser, loading, viewMessage, setViewMessage}) {
  const handleUser = (user) => {
    setSelectedUser(user);
    setViewMessage(true);
  }
  return (
    <div className={`w-1/4 border-r bg-gray-100 p-1 md:p-4 h-[70vh] ${showSideMenu ? 'flex flex-col' : 'hidden'} ${viewMessage ? 'max-lg:hidden' : 'max-lg:w-full max-lg:text-center'}`}>
    <h3 
    className="text-xl font-semibold mb-4">Users</h3>
    
  <div className="">
    {
      loading.user ? <Loader msg={"Fetching Users"} /> :
      users && users.length > 0 ? 
      
      users.map(user => (
      <div 
        key={user.id} 
        className={`md:p-2 max-md:text-sm p-1 rounded cursor-pointer mb-2 overflow-x-auto element ${selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleUser(user)}
      >
      <span className=''>
      {user.name || 'Unknown User'}
      </span>
     
      </div>
    )) :
    <p>No users to chat</p>

    }
  </div>
  </div>
  )
}

export default ChatSelector
