"use client"
import ListView from '@/components/ListView';
import { AuthContext } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
const page = () => {
    const router = useRouter();
    const {isAuthenticated, loading, } = useContext(AuthContext);
    console.log(isAuthenticated, loading);
    if(loading) {
        return <div>Loading...</div>
    }
    if(!isAuthenticated) router.push('/sign-in');
  return <ListView />
}

export default page
