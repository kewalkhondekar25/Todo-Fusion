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
import { Button } from './ui/button'
import { AddCloseTodoBtn } from './buttons/Buttons'


const AddTodo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <section className='absolute top-[325px] right-[100px]'>
      <Card className="w-[400px] bg-[#383838] border-[#525252]">
        <CardHeader>
          <CardTitle>New Todo</CardTitle>
          <CardDescription>Add todo, Set Priority & Reminder</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="submit">
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
            </div>
            {/* <button>submit</button> */}
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
            <AddCloseTodoBtn>
              <span>Close</span>
            </AddCloseTodoBtn>
            <AddCloseTodoBtn>
              <span>Add Todo</span>
            </AddCloseTodoBtn>
        </CardFooter>
      </Card>
    </section>
  )
}

export default AddTodo