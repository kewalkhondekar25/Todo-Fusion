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
    await createTodos(reqBody)
    return NextResponse.json({
      message: "todo added",
      data: reqBody
    },
      { status: 201 })
  } catch (error) {
    return NextResponse.json({ error })
  }
}