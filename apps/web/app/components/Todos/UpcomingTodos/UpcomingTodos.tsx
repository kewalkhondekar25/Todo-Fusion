"use client"
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import { ToggleEditTodo, setAddedTodoStatus, setEditTodo, setEditValues, setUpcomingAllCmpltTodo, setUpcomingTodos, toggleCardOption } from '../../../../lib/store/features/todos/todoSlice';
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
import { ListBulletIcon, Pencil1Icon, PlusIcon, TrashIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import EditTodo from '../EditTodo/EditTodo';
import EditTodoCard from '../EditTodo/EditTodoCard';
import OptionCard from '../TodoCardOption/OptionCard';
import { previousDay } from 'date-fns';
import classnames from 'classnames';



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

  const colors = ["#F0F0F0", "#EEA68F", "#D0DAFA", "#FFD0DF", "#ECDFAB", "#C2D5C3"];

  const [openOptionsId, setOpenOptionsId] = useState<any>(null);
  const [highlightedCardId, setHighlightedCardId] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>();
  console.log(highlightedCardId);
  console.log(selectedCard);
  const dispatch = useAppDispatch();
  const {
    upcomingTodos,
    isAddTodoOpen,
    todoCount,
    editValues,
    isEditTodoOpen,
    isOptionOpen,
    todayCardColor
  } = useAppSelector(state => state.todo)

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
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handleEditPayload = (id: string, todo: string, priority: string, hours: string, minutes: string) => {
    dispatch(setEditTodo({ id, todo, priority, hours, minutes }));
    dispatch(setEditValues({ ...editValues, id }))
  };
  const handleDeleteTodo = async (deleteId: string) => {
    try {
      const response = await axios.post("/api/deletetodos", {id: deleteId});
      const result = response.data;
      if(result){
        dispatch(setAddedTodoStatus(`${deleteId}`));
        toast("That todo is history!🪦", {
          description: "Todo deleted successfully🗑️"
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error
      console.log(errorMessage);
    }
  };

  if(!sortedDates.length){
    return(
      <div className=" relative flex justify-center place-items-center h-screen">
        {/* <div className='absolute top-20'>no upcoming todos</div> */}
        <div className='absolute top-1/4 right-2/3 '><AddTodo /></div>
      </div>
    )
  }

  return (
    <div className='relative grid grid-cols-4 gap-3 p-3'>
      {
        sortedDates.map((date, i) => (
          <Card key={date} 
          style={{ 
            backgroundColor: `${selectedCard === sortedDates[i] ? `#${todayCardColor}` : `${colors[i % colors.length]}`}` , 
            color: "black"
          }}
          className='relative'>
            <CardHeader className='flex flex-row justify-between'>
              <div>
                <CardTitle>{date}</CardTitle>
                <CardDescription className='flex place-items-center gap-2 text-gray-800'>
                  <ListBulletIcon />
                  {groupedTodos[date].length} todos
                </CardDescription>
              </div>
              <div className='cursor-pointer'>
                <DotsVerticalIcon
                  onClick={() => {
                    dispatch(setUpcomingAllCmpltTodo(groupedTodos[date]));
                    setSelectedCard(sortedDates[i]); 
                    setHighlightedCardId(prev => {
                      const newHighlightedCardId = [...prev, sortedDates[i]].filter(Boolean) as string[];
                      return newHighlightedCardId;
                    });
                    setOpenOptionsId(sortedDates[i]); 
                    dispatch(toggleCardOption()); 
                    }}/>
              </div>
            </CardHeader>
            <CardContent>
              {
                groupedTodos[date].map((todo: AllTodosType) => (
                  <div key={todo.id} className='flex place-items-center gap-2'>
                    <Checkbox
                      className='border-black'
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
                        <TrashIcon 
                          className='ms-2 h-5 w-5'
                          onClick={() => handleDeleteTodo(todo.id)} />
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
            {isOptionOpen && openOptionsId === sortedDates[i] &&
              <div className='absolute z-10 top-5 right-5'>
                <OptionCard />
              </div>
            }
          </Card>
        ))
      }
      {isAddTodoOpen && (<div className='absolute top-1/3 left-1/3'><AddTodo /></div>)}
    </div>
  )
}

export default UpcomingTodos