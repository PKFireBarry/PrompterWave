import React from 'react'
import { UserButton } from '@clerk/nextjs'
function Logout() {
  return (
    <>

    <div className=' sticky   w-full bottom-12 m-4 flex'><UserButton></UserButton></div>
    </>
  )
}

export default Logout