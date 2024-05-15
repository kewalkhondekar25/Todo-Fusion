"use client"
import React, { useEffect } from 'react'
import { getServerSession } from "next-auth"
import { useSession, signOut } from 'next-auth/react'
import { NEXT_AUTH } from "../../../lib/auth"
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';
import { SignupFormDemo } from '../../components/SignupFormDemo'

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      router.push('/');
    }
  }, [session, status, router]);

  // const { data: session, status } = useSession();
  // // useEffect(() => {
  // //   // Redirect only if session data exists and status is 'authenticated'
  //   if (session?.user && status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [session, status, router]);
  // const session = await getServerSession(NEXT_AUTH);
  // if(session?.user){
  //   redirect("/")
  // }

  return (
    <div>
      <SignupFormDemo/>
    </div>
  )
}

export default page