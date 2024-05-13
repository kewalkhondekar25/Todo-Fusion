"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
// import { getServerSession } from "next-auth"

const page = () => {
  const session = useSession();
  const router = useRouter();
  // const session = await getServerSession();
  return (
    <div>
      <h3>dashboard page</h3>
      <p>{JSON.stringify(session)}</p>
      <button onClick={() => signOut()}>
        Log Out
      </button>
    </div>
  )
}

export default page

