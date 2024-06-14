"use client"
import React, { useEffect } from 'react'
import {SignupFormDemo} from "../../components/SignUpFrom"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const page = () => {

  return (
    <section>
      <SignupFormDemo/>
    </section>
  )
}

export default page