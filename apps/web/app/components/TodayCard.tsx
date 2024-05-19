"use client"
import React from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { ListBulletIcon } from '@radix-ui/react-icons'
import { TodaysTodoCheckBox } from './checkboxes/CheckBoxes'
import { useAppSelector } from '../../lib/store/hooks/hooks'
import NewTodo from './NewTodo'
import DrawerComp from './dailog/Dailog'


const TodayCard = () => {

  const todos = ["wakeup early", "yoga 30 min", "grocery", "twitch stream"];
  const {isChecked} = useAppSelector(state => state.checked);
  console.log("is checked?", isChecked);
  
  return (
    <section className='relative'>
      <Card className="w-[350px] bg-[#292929] border-[#525252]">
      <CardHeader>
        <CardTitle>Today</CardTitle>
        <CardDescription className='flex place-items-center gap-2'>
            <ListBulletIcon/>
            {todos.length} todos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          todos.map((item, i) => {
            return(
              <div key={i} className='flex place-items-center gap-3 mt-2'>
                <TodaysTodoCheckBox value={item}/>
                <div className={`${isChecked ? "line-through" : null}`}>
                  {item}
                </div>
              </div>
            )
          })
        }
      </CardContent>
      <CardFooter>
          <DrawerComp/>
      </CardFooter>
    </Card>
    {/* <NewTodo/> */}
    </section>
  )
}

export default TodayCard