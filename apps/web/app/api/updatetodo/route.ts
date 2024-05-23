import { updateTodo } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    const updatedTodo = await updateTodo(payload);
    return NextResponse.json({
      message: "todos updated",
      data: updatedTodo
    },{status: 201})
  } catch (error) {
    const errorMessage = error instanceof Error
    return NextResponse.json({message: errorMessage})
  }
};