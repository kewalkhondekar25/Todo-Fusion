"use client"
import React, { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import ServerSession from '../components/ServerSession';
import ButtonDemo from '../components/ButtonDemo';
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks/hooks';
import { increase, decrease, setStatus } from '../../lib/store/features/counter/counterSlice';
import { Button } from '../components/ui/button';
import { SliderToggleBtn } from '../components/buttons/Buttons';
import Header from '../components/Header';
// import { getServerSession } from "next-auth"

const page = () => {
  //RTK
  const {count, decision} = useAppSelector(state => state.counter);
  const {isToggle} = useAppSelector(state => state.slider);

  // const session = await getServerSession();
  const { data: session, status } = useSession();
  const router = useRouter();
  const num = 69;

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
      <hr />
      <ButtonDemo onClick={increase}>
        +
      </ButtonDemo>
      <h3>Count: {count}</h3>
      <ButtonDemo onClick={decrease}>
        -
      </ButtonDemo>
      <hr />
      <div>
        <h3>Status: {decision}</h3>
        <div className='flex flex-col'>
          <ButtonDemo onClick={() => setStatus("active")}>
            Set Status - Active
            </ButtonDemo>
          <ButtonDemo onClick={() => setStatus("inactive")}>
            Set Status - Inactive
            </ButtonDemo>
        </div>
      </div>
      <hr />
      <Button>
        Shadcn button
      </Button>
      <hr />
      <div>isOpen: {isToggle? "true" : "false"}</div>
      <SliderToggleBtn/>
      {isToggle && <Header/>}
    </div>
  )
}

export default page

