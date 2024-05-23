import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import EditTodoFunc from './EditTodoFunc'
import { Button } from '../../ui/button'
import { useAppDispatch } from '../../../../lib/store/hooks/hooks'
import { ToggleEditTodo } from '../../../../lib/store/features/todos/todoSlice'


const EditTodoCard = () => {
  const dispatch = useAppDispatch();
  return (
    <Card className='bg-[#383838] border-[#525252]'>
      <CardHeader>
        <CardTitle>Edit Todo</CardTitle>
        <CardDescription className='text-[#D6D6D6]'>Edit Your Today's Todo</CardDescription>
      </CardHeader>
      <CardContent>
        <EditTodoFunc/>
      </CardContent>
      <CardFooter className='flex justify-between'>
          <Button
            onClick={() => dispatch(ToggleEditTodo())}>Cancel</Button>
          <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}

export default EditTodoCard