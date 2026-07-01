import React from 'react'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'

function SidebarToggler({handleSideMenu, showSideMenu}) {
  return (
    <div 
    className='absolute max-md:left-0 max-md:-top-3 z-50 -left-10 top-5 cursor-pointer'
      onClick={handleSideMenu}
    >
    <FaAnglesLeft
    className={`${showSideMenu ? '' : 'hidden'}`}
     />
      <FaAnglesRight
    className={`${showSideMenu ? 'hidden' : ''}`}
     />

    </div>
  )
}

export default SidebarToggler
