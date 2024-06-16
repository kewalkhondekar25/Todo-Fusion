"use client"
import React, { useState } from 'react'
import { PlaceholdersAndVanishInputDemo } from './SubscribeInput'
import { Input } from '../ui/input'
import Footer from './Footer'
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

interface Todo {
  name: string;
  isCheck: boolean;
}

interface TodoGroup {
  id: number;
  title: string;
  todo: Todo[];
  date: number;
  color: string,
  rotate: string,
  left: string,
  z: string
}

const Subscribe = () => {

  const initialTodos: TodoGroup[] = [
    {
      id: 1,
      title: "tomorrow",
      todo: [
        { name: "keto meal", isCheck: false },
        { name: "tweeting time", isCheck: false },
        { name: "buy avocado🥑", isCheck: false },
      ],
      date: 1,
      color: "F0F0F0",
      rotate: "15deg",
      left: "40%",
      z: "0"
    },
    {
      id: 2,
      title: "today",
      todo: [
        { name: "valorant💻", isCheck: true },
        { name: "tweeting time", isCheck: false },
        { name: "ice🍦cream", isCheck: false },
      ],
      date: 0,
      color: "292929",
      rotate: "",
      left: "25%",
      z: "-1"
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
      color: "D0DAFA",
      rotate: "-12deg",
      left: "12%",
      z: "-2"
    }
  ];

  const [todos, setTodos] = useState<TodoGroup[]>(initialTodos);
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
    <section className='flex flex-col justify-between place-items-center h-screen'>
      <div className='text-3xl font-bold mx-3 mt-5'>
        Get <span className='text-[#4CDF7E]'>ready</span> to create your first todo
      </div>
      <PlaceholdersAndVanishInputDemo />
      <div className='relative h-64 w-full mt-5'>
        <div className=''>
          {todos.map(group => (
            <Card
              key={group.id}
              style={{
                backgroundColor: `#${group.color}`,
                color: `${group.color === "292929" ? "white" : "black"}`,
                rotate: group.rotate,
                position: "absolute",
                left: group.left,
                zIndex: group.z
              }}
              className='text-black border-[#525252]'>
              <CardHeader>
                <div>
                  <CardTitle>
                    <div className='capitalize'>{group.title}</div>
                  </CardTitle>
                  <CardDescription
                    style={{
                      color: `${group.color === "292929" ? "white" : "black"}`
                    }}
                    className='flex gap-2 mt-2 text-black'>
                    <ListBulletIcon />
                    {group.todo.length} todos
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {group.todo.map(todo => (
                  <div key={todo.name} className='flex place-items-center gap-2 mb-1'>
                    <Checkbox
                      className='border-white'
                      style={{ borderColor: `${group.color === "292929" ? "white" : "black"}` }}
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
      </div>
      <Footer />
    </section>
  )
}

export default Subscribe