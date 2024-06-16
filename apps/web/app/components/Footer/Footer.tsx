import { DrawingPinFilledIcon } from '@radix-ui/react-icons'
import React from 'react'

const Footer = () => {

  const nav = ["signin", "pricing", "today's todo", "signup", "dev api", "upcoming' todo"]
  return (
    <section className='flex flex-col mx-3 mt-10'>
      <div className='flex flex-col gap-2'>
        <div className='flex place-items-center gap-1'>
          <span className='text-lg font-bold'>fusion</span>
          <DrawingPinFilledIcon className='h-5 w-5' />
        </div>
        <div className='w-1/2 text-sm text-[#CFCFD3] font-semibold'>
          Built to help productive people with their productivity
        </div>
      </div>
      <div className='grid grid-cols-3 mt-8 text-sm text-[#CFCFD3] font-semibold'>
        {
          nav.map(item => {
            return(
              <div key={item}>{item}</div>
            )
          })
        }
      </div>
      <div className='mt-10 text-center text-xs text-[#CFCFD3] font-semibold'>
        This web application is solely for educational purposes only.
      </div>
    </section>
  )
}

export default Footer