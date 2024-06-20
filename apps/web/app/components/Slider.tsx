"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { SliderToggleBtn } from './buttons/Buttons';
import { useSession } from 'next-auth/react';
import {Pencil2Icon} from "@radix-ui/react-icons"
import {CalendarIcon} from "@radix-ui/react-icons"
import Link from 'next/link';



const Slider = () => {
  const { data: session, status } = useSession();  
  const avaTar = session?.user?.image;
  
  const subCategory: string[] = ["today", "upcoming"]
  const iconMap: any = {
    today: Pencil2Icon,
    upcoming: CalendarIcon,
  };

  return (
    <section className='fixed z-20 top-0 bg-[#191919] h-screen w-60'>
      <div className='flex justify-between'>
        <div>
          <div className='flex flex-col justify-start ml-1 mt-2 text-sm text-[#CFCFD3] font-semibold gap-2'>
            <Avatar>
              <AvatarImage src={`${session ? `${avaTar}` : "https://github.com/shadcn.png"}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>
              {session? JSON.stringify(session?.user?.name).replace(/"/g, '').toUpperCase() : null}
            </p>
          </div>
          <nav className='flex flex-col mt-10 ms-3'>
            <div className='flex place-items-center gap-2'>
              <Pencil2Icon/>
              <p>Todos</p>
            </div>
            <div className='mt-2 ms-5'>
              {
                subCategory.map((item, i) => {
                  const IconComponent = iconMap[item];
                  const today = new Date();
                  const date = today.getDate();  
                  return(
                    <Link href={`/${item}`} key={i}>
                      <div className='flex place-items-center gap-2 mt-1'>
                        {item === "today" ? date : IconComponent && <IconComponent className='' />}
                        <ul>
                          <li className='text-sm capitalize'>{item}</li>
                        </ul>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </nav>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/">Home</Link>
        </div>
        <SliderToggleBtn/>
      </div>
    </section>
  )
}

export default Slider