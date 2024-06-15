"use client"
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  ListBulletIcon,
  CalendarIcon
} from '@radix-ui/react-icons';
import { Button } from '../ui/button';

interface Todo {
  name: string;
  isCheck: boolean;
}

interface TodoGroup {
  id: number;
  title: string;
  todo: Todo[];
  date: number;
  color: string
}

const HomeCards = () => {
  const initialTodos: TodoGroup[] = [
    {
      id: 1,
      title: "tomorrow",
      todo: [
        { name: "prepare bento meal", isCheck: false },
        { name: "tweeting time", isCheck: false },
        { name: "buy avocado🥑", isCheck: false },
        { name: "pay💰utilities", isCheck: false }
      ],
      date: 1,
      color: "F0F0F0"
    },
    {
      id: 2,
      title: "today",
      todo: [
        { name: "optimise pp algorithm💻", isCheck: true },
        { name: "tweeting time", isCheck: false },
        { name: "naturals ice🍦cream", isCheck: false },
        { name: "cardio day", isCheck: false }
      ],
      date: 0,
      color: "292929"
    },
    {
      id: 3,
      title: "yesterday",
      todo: [
        { name: "fix bank stuff", isCheck: true },
        { name: "practice piano🎹", isCheck: true },
        { name: "pack🎒 for hiking", isCheck: true }
      ],
      date: -1,
      color: "D0DAFA"
    }
  ];

  const [todos, setTodos] = useState<TodoGroup[]>(initialTodos);

  let currentDate = new Date();
  let today = currentDate.toDateString();

  let tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  let tomorrowDateString = tomorrow.toDateString();

  let yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  let yesterdayDateString = yesterday.toDateString();

  const handleCheck = (todoName: string, groupId: number) => {
    const updatedTodos = todos.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          todo: group.todo.map(todo => {
            if (todo.name === todoName) {
              return {
                ...todo,
                isCheck: !todo.isCheck
              };
            }
            return todo;
          })
        };
      }
      return group;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      {todos.map(group => (
        <Card
          key={group.id}
          style={{
            backgroundColor: `#${group.color}`,
            color: `${group.color === "292929" ? "white" : "black"}` 
          }}
          className='text-black border-[#525252] mb-3 mx-3'>
          <CardHeader>
            <div>
              <CardTitle>
                <div className='capitalize'>{group.title}</div>
              </CardTitle>
              <CardDescription 
              style={{
                color: `${group.color === "292929" ? "white" : "black"}` 
              }}
              className='flex place-items-center gap-2 mt-2 text-black'>
                <ListBulletIcon />
                {group.todo.length} todos
                <CalendarIcon />
                {group.date === 1 ? tomorrowDateString : group.date === 0 ? today : group.date === -1 ? yesterdayDateString : null}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {group.todo.map(todo => (
              <div key={todo.name} className='flex place-items-center gap-2 mb-1'>
                <Checkbox
                  className='border-white'
                  style={{borderColor: `${group.color === "292929" ? "white" : "black"}` }}
                  checked={todo.isCheck}
                  onCheckedChange={() => handleCheck(todo.name, group.id)}
                />
                <div className={todo.isCheck ? "line-through " : ""}>
                  {todo.name}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            {/* <Button>New Todo</Button> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HomeCards;
