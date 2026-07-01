import React from 'react';
import './submitButton.css';

function SubmitButton({callToAction}) {
  return (
   /* From Uiverse.io by mrtqzbek11 */ 
<button
className='subButton mt-3'
type='submit'
>
 {callToAction}
</button>
  )
}

export default SubmitButton
