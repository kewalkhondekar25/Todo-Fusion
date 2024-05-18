import React from 'react'
import { SliderToggleBtn, TodoButton } from '../../components/buttons/Buttons'
import Header from '../../components/Header'
import { useAppSelector } from '../../../lib/store/hooks/hooks'

const page = () => {
  // const {isToggle} = useAppSelector(state => state.slider);
  return (
    <div className='relative flex justify-center place-items-center'>
      {/* {isToggle && <Header/>} */}
      <TodoButton/>
      <SliderToggleBtn/>
    </div>
  )
}

export default page