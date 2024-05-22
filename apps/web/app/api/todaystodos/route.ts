import { getAllTodos } from "@repo/db"
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const todos = await getAllTodos();
    return NextResponse.json(todos, {status: 200});
  } catch (error) {
    return NextResponse.json({error}, {status: 405});
  }
}; 