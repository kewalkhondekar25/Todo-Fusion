import React from 'react'
import Slider from './Slider'
import { useAppSelector } from '../../lib/store/hooks/hooks'

const Header = () => {
  // const {isToggle} = useAppSelector(state => state.slider)
  return (
    <div>
      this is header
      {/* {isToggle? "true" : "false"} */}
    </div>
  )
}

export default Header