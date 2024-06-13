import { updateAllCompleteTodo } from "@repo/db";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const { payload } = await req.json();
    // const {yetToComplete} = payload;
    // console.log("payload: ", yetToComplete);
    if (!Array.isArray(payload)) {
      return NextResponse.json({ message: 'Payload must be an array' }, { status: 400 });
    }
    const allCompletedTodos = await updateAllCompleteTodo(payload);
    if(allCompletedTodos){
      return NextResponse.json({
        message: "all todos completed",
        data: allCompletedTodos
      }, {status: 201})
    }
  } catch (error) {
    const errorMessage = error instanceof Error;
    return NextResponse.json({message: errorMessage});
  }
}