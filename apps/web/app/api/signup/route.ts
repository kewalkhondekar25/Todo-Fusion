import { createUser, getUsers, getSingleUser } from "@repo/db";
import { type SignUpType, signupSchema } from "@repo/validation-schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

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
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
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
    //empty body
    if(!reqBody){
      return NextResponse.json({
        message: "Body can not be empty"
      },
    {status: 400})
    }
    //empty fields
    if(!reqBodyRes.data){
      return NextResponse.json({
        message: "All fields are required"
      },
    {status: 400})
    };
    const {firstName, lastName, email, password} = reqBody;
    //existing email
    const existingEmail = await getSingleUser(email)
    if(existingEmail){
      return NextResponse.json({
        message: "email address already exists"
      },
    {status: 409})
    }
    //hash pwd
    const hashedPwd = await bcrypt.hash(password, 10);
    console.log("hashed pwd", hashedPwd);
    //dehash pwd
    // const decode = await bcrypt.compare(password, hashedPwd);
    // console.log("decoded pwdw", decode);
    const data = {firstName, lastName, email, password: hashedPwd};
    const createdUser = await createUser(data) as CreatedUserType;
    // const createdUser = await createUser(reqBody) as CreatedUserType;
    console.log("created user from api", createdUser);

    return NextResponse.json({
      message: "user created",
      data: createdUser
    },{status: 201})
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },
  {status: 500})
  }
}