"use client"
import React, { useEffect } from 'react'
import { getAllTodos } from '@repo/db'
import { TodaysTodoCheckBox } from '../../checkboxes/CheckBoxes';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks';
import {setTodos} from "../../../../lib/store/features/todos/todoSlice"
import { Checkbox } from "../../ui/checkbox"

type AllTodosType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  usersId: string;
}
const TodaysTodos = () => {

  const {todos} = useAppSelector(state => state.todo)
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
  }
  useEffect(() => {
    getTodaysTodo();
  }, [])  
  return(
    <div>
      {
        todos.map((item, i) => {
          return(
            <div key={i} className='flex place-items-center gap-2'>
              <Checkbox/>
              <div>{item.todo}</div>
            </div>
          )
        })
      }
    </div>
  )
}
export default TodaysTodos