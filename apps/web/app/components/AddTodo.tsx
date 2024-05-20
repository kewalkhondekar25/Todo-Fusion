import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import Inputs from './input/Inputs'
import PrioritySelect from './priority/PrioritySelect'
import  {TimePickerDemo}  from './TimePicker'
import { Label } from './ui/label2'


const AddTodo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <section className='absolute'>
      <Card className="w-[400px] bg-[#383838] border-[#525252]">
        <CardHeader>
          <CardTitle>New Todo</CardTitle>
          <CardDescription>Add todo, Set Priority & Reminder</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Inputs/>
            <div className='flex justify-between place-items-center'>
              <div className='mt-5'>
                <PrioritySelect/>
              </div>
              <div>
                <TimePickerDemo date={date} setDate={setDate}/>
              </div>
            </div>
            <div></div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default AddTodo