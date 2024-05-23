"use client"
import React, { useEffect } from 'react'
import { getAllTodos } from '@repo/db'
import { TodaysTodoCheckBox } from '../../checkboxes/CheckBoxes';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks';
import {setAddedTodoStatus, setTodos} from "../../../../lib/store/features/todos/todoSlice"
import { Checkbox } from "../../ui/checkbox"
import { toast } from 'sonner';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

type AllTodosType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  usersId: string;
}
const TodaysTodos = () => {

  const {todos, todoCount} = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();  

  const getTodaysTodo = async () => {
    try {
      const response = axios.get("/api/todaystodos");
      const data = (await response).data as AllTodosType[]
      dispatch(setTodos(data))
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTodo = async (todoId: string) => {
    try {
      //post id as payload
      const response = await axios.post("/api/iscomplete", {id: todoId});
      const data = response.data;
      dispatch(setAddedTodoStatus(`${todoId}`));
      toast("You're on a roll! Another todo checked off your list.🎯", {
        description: ""
      })
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    console.log(todoCount)
    getTodaysTodo()
  }, [todoCount])

  return(
    <div>
      {
        todos.map((item, i) => {
          return(
            <div key={i} className='relative flex place-items-center gap-2'>
              <Checkbox 
                onCheckedChange={() => handleCompleteTodo(item.id)}
                checked={item.isCompleted}
                disabled={item.isCompleted}
              />
              <div className='flex-1 flex items-center group'>
                <div className={`hover:cursor-pointer ${item.isCompleted ? 'line-through' : ''}flex-1`}>
                  {item.todo}
                </div>
                <div className='cursor-pointer ml-2 hidden group-hover:flex group-hover:place-items-center'>
                  <Pencil1Icon 
                    className='h-5 w-5'
                    onClick={() => alert("pencil")}/>
                  <TrashIcon className='ms-2 h-5 w-5'/>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default TodaysTodos