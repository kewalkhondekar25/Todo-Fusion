"use client"
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import { setUpcomingTodos } from '../../../../lib/store/features/todos/todoSlice';
import axios from 'axios';

type AllTodosType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  usersId: string;
  priority?: string;
  date?: Date;
  hours?: string;
  minutes?: string;
  isUpcoming?: boolean;
}

const UpcomingTodos = () => {

  const dispatch = useAppDispatch();
  const { upcomingTodos } = useAppSelector(state => state.todo)

  const getUpcomingTodos = async () => {
    const response = await axios.get("/api/todaystodos");
    const allTodos = response.data as AllTodosType[];
    const futureTodos = allTodos.filter(item => item.isUpcoming === true);
    dispatch(setUpcomingTodos(futureTodos));
  }

  useEffect(() => {
    getUpcomingTodos();
  }, []);

  const groupTodosByDate = (todos: AllTodosType[]) => {
    return todos.reduce((acc, todo) => {
      if (todo.date) {
        const formattedDate = new Date(todo.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(todo);
      }
      return acc;
    }, {} as { [key: string]: AllTodosType[] | any });
  }

  const groupedTodos = groupTodosByDate(upcomingTodos);

  return (
    <div>
      {
        Object.entries(groupedTodos).map(([date, todos]) => (
          <div key={date}>
            <h3>{date}</h3>
            {todos && todos.map((todo: AllTodosType) => ( // Specify the type of todo here
              <div key={todo.id}>
                <p>{todo.todo}</p>
              </div>
            ))}
            <hr />
          </div>
        ))
      }
    </div>
  )
}

export default UpcomingTodos