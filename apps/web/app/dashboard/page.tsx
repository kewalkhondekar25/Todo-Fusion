"use client"
import React, { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import ServerSession from '../components/ServerSession';
// import { getServerSession } from "next-auth"

const page = () => {
  // const session = await getServerSession();
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect only if session data exists and status is 'authenticated'
  //   if (session?.user && status === "authenticated") {
  //     router.push("/dashboard");
  //   }
  // }, [session, status, router]);
  return (
    <div>
      <h3>dashboard page</h3>
      <p>{JSON.stringify(session)}</p>
      <h3>Hello {JSON.stringify(session?.user?.name)}</h3>
      <h4>Your email is {JSON.stringify(session?.user?.email)}</h4>
      <button onClick={() => signOut()}>
        Log Out
      </button>
    </div>
  )
}

export default page

