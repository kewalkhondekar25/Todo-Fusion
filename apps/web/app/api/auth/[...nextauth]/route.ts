import { NextRequest } from "next/server";

export const GET = (req: NextRequest, {params}: {params: string}) => {
  console.log(params);
  return Response.json({message: params})
}