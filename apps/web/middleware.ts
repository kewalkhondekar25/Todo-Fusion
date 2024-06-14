import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const path = request.nextUrl.pathname;
  const publicPaths = ["/signup", "/signin", "/"];
  const isPublicPath = publicPaths.includes(path);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/today", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/signin", 
    "/signup", 
    "/dashboard", 
    "/today", 
    "/upcoming"
  ]
};