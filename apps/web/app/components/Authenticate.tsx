"use client"
import React from 'react'
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation'

const Authenticate = () => {
  const router = useRouter()
  return (
    <div>
      <button onClick={() => signIn()}>
        SignIn
      </button>
      <button onClick={() => router.push("/signup")}>
        Sign Up  
      </button>  
    </div>
  )
}

export default Authenticate