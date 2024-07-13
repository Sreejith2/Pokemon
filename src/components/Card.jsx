import React from 'react'

function Card(props) {
  return (
    <div className='flex flex-col items-center justify-center p-1 border border-black w-44 h-44'>
        <p className=' capitalize font-[600]'>{props.name}</p>
        <img className=' h-28 w-28' src={props.imgURL} alt='' />
    </div>
  )
}

export default Card