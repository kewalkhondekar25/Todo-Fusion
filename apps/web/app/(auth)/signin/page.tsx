"use client"
import React, { useEffect } from 'react'
import { getServerSession } from "next-auth"
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { NEXT_AUTH } from "../../../lib/auth"
import { redirect } from "next/navigation";
import { SignupFormDemo } from '../../components/SignInForm'

const page = () => {

  return (
    <div>
      <SignupFormDemo/>
    </div>
  )
}

export default page