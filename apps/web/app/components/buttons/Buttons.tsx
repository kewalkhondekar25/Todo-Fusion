"use client"
import { Button } from "../ui/button"

export const AlertButton = () => {
  return <Button onClick={() => alert("alert")}>Alert</Button>
}

export const TodoButton = () => {
  return <Button onClick={() => alert("hi from todo")}>Todo btn</Button>
}