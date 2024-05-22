"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { ListBulletIcon, PlusIcon } from '@radix-ui/react-icons'
import { TodaysTodoCheckBox } from './checkboxes/CheckBoxes'
import { useAppSelector } from '../../lib/store/hooks/hooks'
import { AddCloseTodoBtn } from './buttons/Buttons'
import AddTodo from './AddTodo'
import { getAllTodos } from '@repo/db'
import TestCard from './TestCard'


const TodayCard = () => {

  const {isChecked} = useAppSelector(state => state.checked);
  const {isAddTodoOpen} = useAppSelector(state => state.todo)
  console.log("is checked?", isChecked);
  
  return (
    <section className='relative'>
      <Card className="w-[350px] bg-[#292929] border-[#525252]">
      <CardHeader>
        <CardTitle>Today</CardTitle>
        <CardDescription className='flex place-items-center gap-2'>
              <ListBulletIcon/>
            {69} todos
        </CardDescription>
      </CardHeader>
      <TestCard/>
      <CardFooter>
        <AddCloseTodoBtn>
            <div className='flex place-items-center gap-2'>
              <PlusIcon/>
              <span>New Todo</span>
            </div>
        </AddCloseTodoBtn>
      </CardFooter>
    </Card>
    {isAddTodoOpen && <AddTodo/>}
    {/* <AddTodo/> */}
    </section>
  )
}

export default TodayCard