import React from 'react'
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../../../lib/auth"
import { redirect } from "next/navigation";
import { SignupFormDemo } from '../../components/SignupFormDemo'

const page = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if(session?.user){
    redirect("/")
  }
  return (
    <div>
      <SignupFormDemo/>
    </div>
  )
}

export default page