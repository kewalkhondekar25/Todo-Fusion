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
import { ToggleEditTodo, setAddedTodoStatus } from '../../../../lib/store/features/todos/todoSlice'
import axios from 'axios'


const EditTodoCard = () => {

  const dispatch = useAppDispatch();
  const { editPayload, editValues } = useAppSelector(state => state.todo);

  const handleEditTodo = async () => {
    try {
      const response = await axios.post("/api/updatetodo", editValues);
      const result = response.data;
      // console.log(result.data.todo);
      dispatch(setAddedTodoStatus(`${result.data.todo}`));
      dispatch(ToggleEditTodo())
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <Card className='absolute top-5  z-10 bg-[#383838] border-[#525252]'>
        <CardHeader>
          <CardTitle>Edit Todo</CardTitle>
          <CardDescription className='text-[#D6D6D6]'>Sharpen your focus by editing your Todo</CardDescription>
        </CardHeader>
        <CardContent>
          <EditTodoFunc />
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            onClick={() => dispatch(ToggleEditTodo())}>Cancel</Button>
          <Button
            onClick={handleEditTodo}
            >Save</Button>
        </CardFooter>
      </Card>
  )
}

export default EditTodoCard