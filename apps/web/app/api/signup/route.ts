import { createUser, getUsers } from "@repo/db";
import { type SignUpType, signupSchema } from "@repo/validation-schema";
import { NextRequest, NextResponse } from "next/server";


interface CreatedUserType {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  avatar?: string,
  isPremium: boolean,
  createdAt: Date;
  updatedAt: Date;
}

export const GET = async() => {
  try {
    const allUsers = await getUsers() as CreatedUserType;
    return NextResponse.json({
      message: "all users",
      data: allUsers
    })
  } catch (error) {
    return error
  }
}

export const POST = async (req: NextRequest) => {
  try {
    //_validations
    //no empty
    const reqBody: SignUpType = await req.json();
    const reqBodyRes = signupSchema.safeParse(reqBody);
    console.log("body", reqBody);
    console.log("parse body", reqBodyRes);
    console.log("parse body data", reqBodyRes.data);//undefined - empty string

    if(!reqBody){
      return NextResponse.json({
        message: "Body can not be empty"
      },
    {status: 400})
    }
    
    if(!reqBodyRes.data){
      return NextResponse.json({
        message: "All fields are required"
      },
    {status: 400})
    }
    const createdUser = await createUser(reqBody) as CreatedUserType;
    console.log("created user from api", createdUser);

    return NextResponse.json({
      message: "user created",
      data: createdUser
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },
  {status: 500})
  }
}