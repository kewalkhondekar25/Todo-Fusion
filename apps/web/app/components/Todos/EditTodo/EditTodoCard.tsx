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
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import { ToggleEditTodo } from '../../../../lib/store/features/todos/todoSlice'
import axios from 'axios'


const EditTodoCard = () => {

  const dispatch = useAppDispatch();
  const {editPayload} = useAppSelector(state => state.todo);
  
  const handleEditTodo = async () => {
    try {
      const response = await axios.post("/api/updatetodo", editPayload);
      const result = response.data;
      dispatch(ToggleEditTodo())
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form >
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
            onClick={handleEditTodo}>Cancel</Button>
          <Button>Save</Button>
      </CardFooter>
    </Card>
    </form>
  )
}

export default EditTodoCard