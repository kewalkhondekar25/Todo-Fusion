import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  
  const token = await getToken({ req: request });
  if(token && (request.nextUrl.pathname.startsWith("/signin") || request.nextUrl.pathname.startsWith("/signup") || request.nextUrl.pathname === "/")){
    return NextResponse.redirect(new URL("/today", request.nextUrl));
  }

  if(!token && (request.nextUrl.pathname.startsWith("/today") || request.nextUrl.pathname.startsWith("/upcoming") || request.nextUrl.pathname.startsWith("/dashboard"))){
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard", "/today", "/upcoming"],
};