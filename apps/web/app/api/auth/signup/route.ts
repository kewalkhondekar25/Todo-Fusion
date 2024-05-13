import { createUser } from "@repo/db";
import { NextRequest, NextResponse } from "next/server"

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

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    console.log("body", reqBody);
    //_validations
    const createdUser = await createUser(reqBody) as CreatedUserType;
    console.log("created user from api", createdUser);

    return NextResponse.json({
      message: "user created",
      data: createdUser
    })
  } catch (error: any) {
    return error.message
  }
}