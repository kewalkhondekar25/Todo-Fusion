"use client"
import React from 'react'
import Slider from './Slider'
import { SliderToggleBtn } from './buttons/Buttons'
import { useAppSelector } from '../../lib/store/hooks/hooks'

const Header = () => {
  const {isToggle} = useAppSelector(state => state.slider);
  return (
    <section className='h-full'>
    <SliderToggleBtn/>
      {isToggle && <Slider/>}
    </section>
    // <TopBar/>
  )
}

export default Header