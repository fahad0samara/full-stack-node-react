
import React from 'react'
import {useParams} from "react-router-dom";
const Eedit = () => {
  const { id } = useParams();;
  console.log(id);
 
  
  


  return (
    <div
      className='bg-black
      h-screen
      w-screen
      flex
      justify-center
      items-center
      text-white
      text-2xl
      font-bold

      '
    >
          <h1>Employee Edit</h1>
      </div>
      
  )
}

export default Eedit