import { getAllTodos, createTodos } from "@repo/db"
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const todos = await getAllTodos();
    return NextResponse.json(todos, {status: 200});
  } catch (error) {
    return NextResponse.json({error}, {status: 405});
  }
}; 

//create new todo
export const POST = async (req: NextRequest) => {
try {
  const reqBody = await req.json();
  createTodos(reqBody)
  return NextResponse.json({
    message: "todo added",
  data: reqBody},
{status: 201})
} catch (error) {
  return NextResponse.json({error})
}
}