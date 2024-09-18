import React from 'react'
import { Button } from './ui/button'
import { SquareCheck } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div id="#nav">
      <div className='flex justify-between mx-6 mt-4'>
        <div className='flex text-4xl font-extrabold' >
            <div className='flex justify-center items-center mr-2'>
            <SquareCheck/>
            </div>
            Task<span className='text-teal-700'>Me</span>
        </div>
        <div className="flex gap-2">
            <Button variant={'outline'} className='bg-teal-700 text-white font-montserrat'>Log In</Button>
            <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
