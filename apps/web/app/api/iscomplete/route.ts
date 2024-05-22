import { updateCompleteTodo } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const {id} = await req.json();
    const completed = await updateCompleteTodo(id);
    console.log(completed);
    return NextResponse.json({ completed: completed }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error)
  }
};