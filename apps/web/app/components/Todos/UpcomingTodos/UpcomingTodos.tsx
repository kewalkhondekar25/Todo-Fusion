"use client"
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import { setAddedTodoStatus, setUpcomingTodos } from '../../../../lib/store/features/todos/todoSlice';
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
import { toast } from 'sonner';


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
  const { upcomingTodos, isAddTodoOpen, todoCount } = useAppSelector(state => state.todo)

  const getUpcomingTodos = async () => {
    const response = await axios.get("/api/todaystodos");
    const allTodos = response.data as AllTodosType[];
    const futureTodos = allTodos.filter(item => item.isUpcoming === true);
    dispatch(setUpcomingTodos(futureTodos));
  }

  useEffect(() => {
    getUpcomingTodos();
  }, [todoCount]);

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
  };

  return (
    <div className='relative grid grid-cols-4 gap-3 p-3'>
    {/* <div className='flex flex-col items-center gap-3'> */}
    {
      sortedDates.map(date => (
        <Card key={date} className='w-auto bg-[#292929] border-[#525252]'>
          <CardHeader>
            <CardTitle>{date}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {groupedTodos[date].map((todo: AllTodosType) => (
              <div key={todo.id} className='flex place-items-center gap-2'>
                <Checkbox
                  onCheckedChange={() => handleCompleteTodo(todo.id)}
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
    <div className='absolute top-1/4 left-1/3 '>
      {isAddTodoOpen && <AddTodo/>}
    </div>
  {/* </div> */}
</div>

  )
}

export default UpcomingTodos