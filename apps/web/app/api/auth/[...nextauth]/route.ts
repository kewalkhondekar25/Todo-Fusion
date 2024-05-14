import { getSingleUser } from "@repo/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import { NEXT_AUTH } from "../../../../lib/auth";



const handler = NextAuth(NEXT_AUTH);

export { handler as GET, handler as POST }