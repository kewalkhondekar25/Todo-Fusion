import React from 'react'
import { SliderToggleBtn, TodoButton } from '../../components/buttons/Buttons'
import Header from '../../components/Header'


const page = () => {
  return (
    <div className='relative flex justify-center place-items-center'>
      <TodoButton/>
      <SliderToggleBtn/>
    </div>
  )
}

export default page