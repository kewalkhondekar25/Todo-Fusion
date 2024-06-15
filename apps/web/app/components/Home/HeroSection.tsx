import React from 'react'
import { 
  CalendarIcon,
  Share2Icon,
  ChatBubbleIcon,
} from '@radix-ui/react-icons'
import { FlipWordsDemo } from '../FlipWords'

const HeroSection = () => {
  return (
    <section className='flex justify-center place-items-center h-screen'>
      <div className='flex flex-col justify-center place-items-center'>
        <div className='flex flex-row gap-2 text-below-320 text-3xl'>
          <div className='relative text-[#F9E796] capitalize font-bold'>
            <CalendarIcon
            className='absolute -top-7 right-1/3 h-7 w-7 transform rotate-12'/>
            <span>track,</span>
          </div>
          <div className='relative text-[#607669] capitalize font-bold'>
            <Share2Icon
            className='absolute -top-7 right-1/4 h-7 w-7 transform -rotate-12'/>
            <span>share</span>
          </div>
          <div className='font-bold'>and</div>
          <div className='relative text-[#E77975] capitalize font-bold'>
            <ChatBubbleIcon
            className='absolute -top-7 right-1/3 h-7 w-7 transform rotate-12'/>
            <span>chat</span>
          </div>
        </div>
        <div className='text-3xl font-bold'>
          with your todos
        </div>
        <div className='w-80 text-center text-sm text-[#CFCFD3] mt-3 font-semibold'>
          <div>
            Elevate your productivity effortlessly with fusion, the modern todo tracking app designed
          </div>
            <FlipWordsDemo/>
        </div>
      </div>
    </section>
  )
}

export default HeroSection