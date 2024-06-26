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
import { useAppSelector, useAppDispatch } from '../../lib/store/hooks/hooks'
import { AddCloseTodoBtn } from './buttons/Buttons'
import AddTodo from './AddTodo'
import { getAllTodos } from '@repo/db'
import TestCard from './TestCard'
import OptionCard from './Todos/TodoCardOption/OptionCard'
import { toggleCardOption } from '../../lib/store/features/todos/todoSlice'


const TodayCard = () => {

  const dispatch = useAppDispatch();
  const { isChecked } = useAppSelector(state => state.checked);
  const { isAddTodoOpen, todos, isOptionOpen, todayCardColor } = useAppSelector(state => state.todo)
  console.log("is checked?", isChecked);
  // bg-[#292929]
  return (
    <section className='relative'>
      <Card className={`w-[350px] ${todayCardColor === "292929" ? "bg-[#292929]" : `bg-[#${todayCardColor}] text-black`} border-[#525252]`}>
        <CardHeader className='flex flex-row justify-between'>
          <div>
            <CardTitle>
              <div>Today</div>
            </CardTitle>
            <CardDescription className={`flex place-items-center gap-2 ${todayCardColor === "292929" ? "" : "text-gray-800"} `}>
              <ListBulletIcon />
              {todos.length} todos
            </CardDescription>
          </div>
          <div className='cursor-pointer'
            onClick={() => dispatch(toggleCardOption())}>
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
      {isOptionOpen &&
        <div className='absolute top-5 -right-20'>
          <OptionCard />
        </div>
      }
    </section>
  )
}

export default TodayCard