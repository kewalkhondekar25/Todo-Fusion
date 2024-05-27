import { getAllTodos, createTodos, getSingleUser } from "@repo/db"
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";

interface UserDataType {
  id: string   
  firstName: string
  lastName: string
  email : string   
  password: string
  avatar : string
  isPremium: Boolean  
  createdAt: Date
  updatedAt: Date 
}
//fetch single user's todos
export const GET = async () => {
  try {
    const session = await getServerSession(NEXT_AUTH);
    //get email
    console.log(session?.user?.email);
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json(
        { error: 'Email not found in session' }, { status: 400 });
    }
    //get id from email
    const userData = await getSingleUser(email) as UserDataType;
    console.log(userData);
    
    if(!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userData.id;
    console.log(userId);
    //use id to get todo from user using id
    const todos = await getAllTodos(userId);
    console.log(todos);
    
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 405 });
  }
};

//create new todo
export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json(); 
    const { todo, priority, minutes, hours, date,  payload } = reqBody;
    const inputDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDiff = inputDate.getTime() - today.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let isUpcoming;
    if (dayDiff === 0) {
      console.log("it's today");
    } else if (dayDiff === 1) {
      console.log("it's tomorrow");
    } else if (dayDiff === -1) {
      console.log("it's yesterday");
    }else if (dayDiff > 1) {
      console.log("future");
    } else {
      console.log("it's past");
    }

    const newTodo = await createTodos(reqBody)
    return NextResponse.json({
      message: "todo added",
      data: newTodo
    },
      { status: 201 })
  } catch (error) {
    return NextResponse.json({ error })
  }
}