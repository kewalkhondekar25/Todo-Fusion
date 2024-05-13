"use client"
import React from 'react'
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation'

const Authenticate = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col w-12'>
      <button className='bg-purple-500' onClick={() => signIn()}>
        SignIn
      </button>
      <button onClick={() => router.push("/signup")}>
        SignUp  
      </button>  
      <button onClick={() => router.push("/dashboard")}>
        Dashboard
      </button>
    </div>
  )
}

export default Authenticate