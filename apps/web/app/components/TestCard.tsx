import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { getAllTodos } from '@repo/db'
import TodaysTodos from './Todos/TodaysTodos/TodaysTodos'


const TestCard = () => {

  return (
    <CardContent>
        <TodaysTodos/>
      </CardContent>
  )
}

export default TestCard