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
import { DotsVerticalIcon, ListBulletIcon, PlusIcon } from '@radix-ui/react-icons'
import { TodaysTodoCheckBox } from './checkboxes/CheckBoxes'
import { useAppSelector } from '../../lib/store/hooks/hooks'
import { AddCloseTodoBtn } from './buttons/Buttons'
import AddTodo from './AddTodo'
import { getAllTodos } from '@repo/db'
import TestCard from './TestCard'
import OptionCard from './Todos/TodoCardOption/OptionCard'


const TodayCard = () => {

  const { isChecked } = useAppSelector(state => state.checked);
  const { isAddTodoOpen, todos } = useAppSelector(state => state.todo)
  console.log("is checked?", isChecked);

  return (
    <section className='relative'>
      <Card className="w-[350px] bg-[#292929] border-[#525252]">
        <CardHeader className='flex flex-row justify-between'>
          <div>
            <CardTitle>
              <div>Today</div>
            </CardTitle>
            <CardDescription className='flex place-items-center gap-2'>
              <ListBulletIcon />
              {todos.length} todos
            </CardDescription>
          </div>
          <div className='cursor-pointer'>
            <DotsVerticalIcon />
          </div>
        </CardHeader>
        <TestCard />
        <CardFooter>
          {
            isAddTodoOpen ? null : <AddCloseTodoBtn>
              <div className='flex place-items-center gap-2'>
                <PlusIcon />
                <span>New Todo</span>
              </div>
            </AddCloseTodoBtn>
          }
        </CardFooter>
      </Card>
      {isAddTodoOpen && <div className='absolute top-1/2 '><AddTodo /></div>}
      <OptionCard/>
    </section>
  )
}

export default TodayCard