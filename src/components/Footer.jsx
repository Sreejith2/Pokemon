import React from 'react'

function Footer() {
  return (
    <div className='flex items-center justify-center p-2 border bg-'>
        <p className='text-[14px] font-[600]'>Copyrights {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer