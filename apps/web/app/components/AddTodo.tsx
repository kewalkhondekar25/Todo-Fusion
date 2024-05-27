"use client"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { Calendar } from "./ui/calander"
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks/hooks"
import { openAddTodo, setAddedTodoStatus } from "../../lib/store/features/todos/todoSlice"
import PrioritySelect from './priority/EditTodoPrioritySelect'
import { Button } from './ui/button'
import { AddCloseTodoBtn } from './buttons/Buttons'
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from './ui/input2'
import axios from 'axios'
import { toast } from 'sonner'
import { format } from 'date-fns';
import { cn } from '../../lib/utils'
import { CalendarIcon, ClockIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Label } from './ui/label2'


const addTodoSchema = yup.object({
  todo: yup.string().required("New Todo is Required"),
  date: yup.date().required("Date is Required").nullable(),
  priority: yup.string().required("Priority is Required"),
  hours: yup.string().required("Hours is Required"),
  minutes: yup.string().required("Minutes is Required"),
})


const AddTodo = () => {

  const session = useSession();
  const payload = session.data?.user?.email;
  const dispatch = useAppDispatch();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours[i] = String(i).padStart(2, '0');
  }
  // console.log(hours);
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes[i] = String(i).padStart(2, '0');
  }
  // console.log(minutes);

  const formik = useFormik({
    initialValues: {
      todo: "",
      date: undefined,
      priority: "",
      hours: "",
      minutes: "",
      payload
    },
    validationSchema: addTodoSchema,
    onSubmit: async (value, { resetForm }) => {
      try {
        const response = await axios.post("/api/todaystodos", value);
        const data = response.data;
        console.log("this is data: ", data);
        const newTodo = data.data.todo;
        console.log("type of date: ", data.data.date);
        console.log("new todo: ", newTodo);
        // const newTodo = value;
        console.log(value);
        // alert(JSON.stringify(value));
        toast("📋 Todo added! Your productivity is on fire!", {
          description: `New Todo: ${newTodo}`
        });
        resetForm();
        dispatch(setAddedTodoStatus(`${newTodo}`));
        dispatch(openAddTodo());
      } catch (error: any) {
        console.log(error.message);
      }
    }
  })

  return (
    <section className='absolute top-20 -left-20'>
      <form onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit()
      }}>
        <Card className=" bg-[#383838] border-[#525252]">
          <CardHeader>
            <CardTitle>New Todo</CardTitle>
            <CardDescription>Add todo, Set Priority & Reminder</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Add New Todo</Label>
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
              <div className='flex justify-between place-items-center gap-1'>
                <div>
                  <Label>Select Priority</Label>
                  <Select
                    name='priority'
                    onValueChange={(value) => formik.setFieldValue('priority', value)}>
                    <SelectTrigger className=" border-white gap-2">
                      <ExclamationTriangleIcon />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#525252]">
                      <SelectItem value="priority1">Priority 1</SelectItem>
                      <SelectItem value="priority2">Priority 2</SelectItem>
                      <SelectItem value="priority3">Priority 3</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.todo && formik.errors.priority ? (
                    <div className="text-xs text-red-500">{formik.errors.priority}</div>
                  ) : null}
                </div>
                <div>
                  <Label>Set Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild
                      className='bg-[#383838] border-white'>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "gap-1 pl-3 text-left font-normal",
                          !formik.values.date && "text-muted-foreground"
                        )}
                      >
                        {formik.values.date ? (
                          format(new Date(formik.values.date), "PPP")
                        ) : (
                          <span className='text-white'>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-white" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formik.values.date}
                        onSelect={(date) => formik.setFieldValue('date', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {formik.touched.date && formik.errors.date ? (
                    <div className="text-xs text-red-500">{formik.errors.date}</div>
                  ) : null}
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-2 mt-1'>
                    <Label>Remind Me</Label>
                    <ClockIcon />
                  </div>
                  <div className='flex'>
                    <div>
                      <Select
                        name='hours'
                        onValueChange={(value) => formik.setFieldValue('hours', value)}>
                        <SelectTrigger className="border-white">
                          <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#525252]">
                          {
                            hours.map((item, i) => {
                              return (
                                <SelectItem key={i} value={`${item}`}>{item}</SelectItem>
                              )
                            })
                          }
                        </SelectContent>
                      </Select>
                      {formik.touched.hours && formik.errors.hours ? (
                        <div className="text-xs text-red-500">{formik.errors.hours}</div>
                      ) : null}
                    </div>
                    <div>
                      <Select
                        name='minutes'
                        onValueChange={(value) => formik.setFieldValue('minutes', value)}>
                        <SelectTrigger className="border-white">
                          <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#525252]">
                          {
                            minutes.map((item, i) => {
                              return (
                                <SelectItem key={i} value={`${item}`}>{item}</SelectItem>
                              )
                            })
                          }
                        </SelectContent>
                      </Select>
                      {formik.touched.minutes && formik.errors.minutes ? (
                        <div className="text-xs text-red-500">{formik.errors.minutes}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <AddCloseTodoBtn>
              <span>Close</span>
            </AddCloseTodoBtn>
            <Button>Add Todo</Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  )
}

export default AddTodo