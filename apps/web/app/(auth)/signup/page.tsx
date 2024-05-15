"use client"
import React, { useEffect } from 'react'
import {SignupFormDemo} from "../../components/SignUpFrom"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      router.push('/');
    }
  }, [session, status, router]);
  return (
    <section>
      <SignupFormDemo/>
    </section>
  )
}

export default page