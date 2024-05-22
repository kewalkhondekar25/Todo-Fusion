import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { useAppDispatch } from "../../lib/store/hooks/hooks"
import { openAddTodo, setTodos } from "../../lib/store/features/todos/todoSlice"

import PrioritySelect from './priority/PrioritySelect'
import { TimePickerDemo } from './TimePicker'
import { Label } from './ui/label2'
import { Button } from './ui/button'
import { AddCloseTodoBtn } from './buttons/Buttons'
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from './ui/input2'
import axios from 'axios'

const addTodoSchema = yup.object({
  todo: yup.string().required("Whoops! Looks like New Todo is Required"),

})


const AddTodo = () => {

  const session = useSession();
  const payload = session.data?.user?.email
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      todo: "",
      payload
    },
    validationSchema: addTodoSchema,
    onSubmit: async (value, { resetForm }) => {
      try {
        const response = axios.post("/api/todaystodos", value);
        const data = (await response).data;
        alert(JSON.stringify(value))
        resetForm()
        dispatch(openAddTodo())
      } catch (error) {
        console.log(error);
      }
    }
  })
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <section className='absolute top-[325px] right-[100px]'>
      <form onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit()
      }}>
      <Card className="w-[400px] bg-[#383838] border-[#525252]">
        <CardHeader>
          <CardTitle>New Todo</CardTitle>
          <CardDescription>Add todo, Set Priority & Reminder</CardDescription>
        </CardHeader>
        <CardContent>
            
            <div>
              <Input
                className='border-white'
                placeholder='New todo'
                name='todo'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.todo} />
                {formik.touched.todo && formik.errors.todo ? (
            <div className="text-xs text-red-500">{formik.errors.todo}</div>
          ) : null}
              <div className='flex justify-between place-items-center'>
                <div className='mt-5'>
                  <PrioritySelect />
                </div>
                <div>
                  <TimePickerDemo date={date} setDate={setDate} />
                </div>
              </div>
            </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <AddCloseTodoBtn>
            <span>Close</span>
          </AddCloseTodoBtn>
          {/* <AddCloseTodoBtn>
            <span>Add Todo</span>
          </AddCloseTodoBtn> */}
          <Button>Add Todo</Button>  
        </CardFooter>
      </Card>
      </form>
    </section>
  )
}

export default AddTodo