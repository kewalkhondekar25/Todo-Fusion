import { deleteTodo } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    const deletedTodo = await deleteTodo(payload);
    return NextResponse.json({
      message: "todo deleted successfully",
      data: deletedTodo
    },
  {status: 201})
  } catch (error) {
    const errorMessage = error instanceof Error
    return NextResponse.json({message: errorMessage})
  }
}