import React from 'react'
import './submitButton.css'

function BookButton({text, setIsBooking, isBooking}) {
  return (
<div>
  <button
className='subButton mt-3'
type='submit'
onClick={() => setIsBooking(!isBooking)}
>
 {text}
</button>
</div>

  )
}

export default BookButton
