import { UserProfile } from '@clerk/nextjs'
import React from 'react'
import Nav from '../components/Nav'

function page() {
  return (
    <><Nav/>
    <div className='flex justify-center items-center h-screen bg-slate-300'>
        
        <UserProfile/>
    </div></>
  )
}

export default page