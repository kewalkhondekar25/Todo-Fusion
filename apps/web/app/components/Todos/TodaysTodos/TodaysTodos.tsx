"use client"
import React, { useEffect } from 'react'
import { getAllTodos } from '@repo/db'
import { TodaysTodoCheckBox } from '../../checkboxes/CheckBoxes';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks';
import {setTodos} from "../../../../lib/store/features/todos/todoSlice"


const TodaysTodos = () => {

  const dispatch = useAppDispatch();  
  const getTodaysTodo = async () => {
    try {
      const response = axios.get("/api/todaystodos");
      const data = (await response).data;
      dispatch(setTodos(data))
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTodaysTodo();
  }, [])  
  return (
    <>
      {/* {
        todos.map(item => {
          return (
            <div key={item.id}>
              
              <span>{item.todo}</span>
            </div>
          )
        })
      } */}
    </>
  )
}
{/* <TodaysTodoCheckBox value={item.todo}/> */}

export default TodaysTodos