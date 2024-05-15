import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH } from "./lib/auth";

export default async function middleware(request: NextRequest){
  const token = await getToken({req: request});
  // const session = await getServerSession(NEXT_AUTH)
  // const url = request.nextUrl
  // const cookies = request.cookies;
  // const token = cookies["next-auth.session-token" as keyof typeof cookies] ;
  // console.log(token);
  // console.log(session);
  
  

  if( token && (request.nextUrl.pathname.startsWith("/signin2"))){
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }
  // if(request.nextUrl.pathname.startsWith("/dashboard")){
  //   return NextResponse.redirect(new URL("/", request.url))
  // }

  // return NextResponse.next();
}

// export const config = {
//   matcher: ["/signin"]
// }
// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing since we don't need it
//   },
// };