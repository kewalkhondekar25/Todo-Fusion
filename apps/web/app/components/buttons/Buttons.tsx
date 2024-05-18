"use client"
import { Button } from "../ui/button"
import { useAppDispatch } from "../../../lib/store/hooks/hooks"
import { toggle } from "../../../lib/store/features/slider/sliderSlice"



export const AlertButton = () => {
  return <Button onClick={() => alert("alert")}>Alert</Button>
}

export const TodoButton = () => {
  return <Button onClick={() => alert("hi from todo")}>Todo btn</Button>
}

export const SliderToggleBtn = () => {
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    dispatch(toggle())
  }
  return <Button onClick={handleToggle}>Toggle</Button>
}