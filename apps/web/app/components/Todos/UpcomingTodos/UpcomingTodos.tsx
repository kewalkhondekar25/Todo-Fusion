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
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import AddTodo from '../../AddTodo';
import { AddCloseTodoBtn } from '../../buttons/Buttons';
import { PlusIcon } from '@radix-ui/react-icons';


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
  const { upcomingTodos, isAddTodoOpen } = useAppSelector(state => state.todo)

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
    <div className='flex justify-center gap-3'>
      {
        sortedDates.map(date => (
          <Card key={date} className='relative w-[300px] bg-[#292929] border-[#525252]'>
            <CardHeader>
              <CardTitle>{date}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              {groupedTodos[date].map((todo: AllTodosType) => (
                <div key={todo.id} className='flex place-items-center gap-2'>
                  <Checkbox
                    // onCheckedChange={() => handleCompleteTodo(todo.id)}
                    checked={todo.isCompleted}
                    disabled={todo.isCompleted}
                  />
                  <p>{todo.todo}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {
                isAddTodoOpen ? null : <AddCloseTodoBtn>
                  <div className='flex place-items-center gap-2'>
                    <PlusIcon />
                    <span>New Todo</span>
                  </div>
                </AddCloseTodoBtn>
              }
            </CardFooter>
          </Card>
        ))
      }
      <div className='absolute'>
      {isAddTodoOpen && <AddTodo/>}
      </div>
    </div>
  )
}

export default UpcomingTodos