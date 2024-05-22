"use client"
import { Button } from "../ui/button"
import { useAppDispatch } from "../../../lib/store/hooks/hooks"
import { toggle } from "../../../lib/store/features/slider/sliderSlice"
import { openAddTodo } from "../../../lib/store/features/todos/todoSlice"

import {HamburgerMenuIcon} from "@radix-ui/react-icons"
import { PlusIcon } from '@radix-ui/react-icons'



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
  return <Button variant="ghost" onClick={handleToggle}>
    <HamburgerMenuIcon/>
  </Button>
}

//add/close new todo btn
export const AddCloseTodoBtn = ({children}: {children: React.ReactElement}) => {
  const dispatch = useAppDispatch();
  const handleOpenCloseAddTodo = () => {
    dispatch(openAddTodo())
  }
  return <Button onClick={handleOpenCloseAddTodo} type="submit">{children}</Button>
}