"use client"
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import { setUpcomingTodos } from '../../../../lib/store/features/todos/todoSlice';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"


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
  const sortedDates = Object.keys(groupedTodos).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div>
      {
        sortedDates.map(date => (
          <Card key={date}>
            <CardHeader>
              <CardTitle>{date}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              {groupedTodos[date].map((todo: AllTodosType) => (
                <div key={todo.id}>
                  <p>{todo.todo}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
            <hr />
          </Card>
        ))
      }
    </div>
  )
}

export default UpcomingTodos