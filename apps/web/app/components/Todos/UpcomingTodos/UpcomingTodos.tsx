"use client"
import React, { useEffect } from 'react'
import { useAppSelector } from '../../../../lib/store/hooks/hooks'
import axios from 'axios';

type AllTodosType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  usersId: string;
  priority: string;
  date: Date;
  hours: string;
  minutes: string;
  isUpcoming: boolean;
}

const UpcomingTodos = () => {
  const getUpcomingTodos = async () => {
    const response = await axios.get("/api/todaystodos");
    const allTodos = response.data as AllTodosType[];
    const futureTodos = allTodos.filter(item => item.isUpcoming === true);
    console.log(futureTodos);
    
    
  } 

  useEffect(() => {
    getUpcomingTodos();
  }, [])
  return (
    <div>
      {/* {
        upcomingTodos.map(item => {
          return(
            <ul>
              <li>{item.todo}</li>
            </ul>
          )
        })
      } */}
    </div>
  )
}

export default UpcomingTodos