import React from 'react'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'

function SidebarToggler({handleSideMenu, showSideMenu}) {
  return (
    <div 
      className='absolute hidden lg:block -left-10 top-5 cursor-pointer z-50'
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
