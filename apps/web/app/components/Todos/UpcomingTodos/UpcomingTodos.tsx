"use client"
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import { ToggleEditTodo, setAddedTodoStatus, setEditTodo, setEditValues, setUpcomingTodos } from '../../../../lib/store/features/todos/todoSlice';
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
import { ListBulletIcon, Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import EditTodo from '../EditTodo/EditTodo';
import EditTodoCard from '../EditTodo/EditTodoCard';


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
  const { upcomingTodos, isAddTodoOpen, todoCount, editValues, isEditTodoOpen } = useAppSelector(state => state.todo)

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
      const response = await axios.post("/api/iscomplete", { id: todoId });
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

  const handleEditPayload = (id: string, todo: string, priority: string, hours: string, minutes: string) => {
    dispatch(setEditTodo({ id, todo, priority, hours, minutes }));
    dispatch(setEditValues({ ...editValues, id }))
  }

  return (
    <div className='relative grid grid-cols-4 gap-3 p-3'>
      {
        sortedDates.map(date => (
          <Card key={date} className=' w-auto bg-[#292929] border-[#525252]'>
            <CardHeader>
              <CardTitle>{date}</CardTitle>
              <CardDescription className='flex place-items-center gap-2'>
              <ListBulletIcon/>
              {groupedTodos[date].length} todos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {
                groupedTodos[date].map((todo: AllTodosType) => (
                  <div key={todo.id} className='flex place-items-center gap-2'>
                    <Checkbox
                      onCheckedChange={() => handleCompleteTodo(todo.id)}
                      checked={todo.isCompleted}
                      disabled={todo.isCompleted}
                    />
                    <div className='relative flex-1 flex items-center group'>
                      <div className={`hover:cursor-pointer ${todo.isCompleted ? 'line-through ' : ''}flex-1`}>
                        {todo.todo}
                      </div>
                      {todo.isCompleted ? null : <div className='cursor-pointer ml-2 hidden group-hover:flex group-hover:place-items-center'>
                        <Pencil1Icon
                          className='relative h-5 w-5'
                          onClick={() => { handleEditPayload(todo.id, todo.todo, todo.priority ?? "", todo.hours ?? "", todo.minutes ?? ""); dispatch(ToggleEditTodo()) }}
                          />
                        <TrashIcon className='ms-2 h-5 w-5' />
                      </div>}
                      {isEditTodoOpen && editValues?.id === todo.id && <EditTodoCard />}
                    </div>
                  </div>
                ))
              }
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
      {isAddTodoOpen && (<div className='absolute top-1/3 left-1/3'><AddTodo /></div>)}
    </div>
  )
}

export default UpcomingTodos