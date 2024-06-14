import React from 'react'
import { 
  DrawingPinFilledIcon,
  ArrowRightIcon
} from '@radix-ui/react-icons'
import { Button } from '../ui/button'

const HeaderTop = () => {
  return (
    <section className='flex justify-between mt-1'>
      <div className='flex place-items-center gap-1 ml-2'>
        <span className='text-lg font-bold'>fusion</span>
        <DrawingPinFilledIcon
        className='h-5 w-5'/>
      </div>
      <div className='flex gap-5 place-items-center mr-2'>
        <span className='capitalize'>signin</span>
        <Button>Register
          <ArrowRightIcon/>
        </Button>
      </div>
    </section>
  )
}

export default HeaderTop