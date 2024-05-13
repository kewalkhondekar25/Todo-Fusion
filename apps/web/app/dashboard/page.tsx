"use client"
import React from 'react'
import { useSession } from 'next-auth/react'

const page = () => {
  const session = useSession()
  return (
    <div>
      <h3>dashboard page</h3>
      <p>{JSON.stringify(session)}</p>
    </div>
  )
}

export default page