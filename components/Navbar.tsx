"use client"
import React, { useContext} from 'react'
import { Button } from './ui/button'
import { SquareCheck } from 'lucide-react'
import { AuthContext} from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const {isAuthenticated, logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    console.log("Logout called, isAuthenticated now:", isAuthenticated);
  }

  const router = useRouter();

  return (
    <div id="#nav">
      <div className='flex justify-between mx-6 mt-4'>
        <div className='flex text-4xl font-extrabold' >
            <div className='flex justify-center items-center mr-2'>
            <SquareCheck/>
            </div>
            Task<span className='text-teal-700'>Me</span>
        </div>
        {!isAuthenticated ? (
          <div className="flex gap-2">
          <Button variant={'outline'} className='bg-teal-700 text-white font-montserrat' onClick={() => router.push('/sign-in')}>Log In</Button>
          <Button onClick={() => router.push('/sign-up')}>Sign Up</Button>
        </div>
        ) : (<Button variant={'destructive'} onClick={handleLogout}>Log out</Button>)}
        
      </div>
    </div>
  )
}

export default Navbar
