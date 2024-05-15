import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getSingleUser } from "@repo/db";

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

interface CustomUser extends CreatedUserType {
  firstName: string;
}

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password", placeholder: "Your Password" }
      },
      async authorize(credentials: any): Promise<any> {
        console.log(credentials.email);
        try {
          if(!credentials.email || !credentials.password){
            return null;
          }
          
          const user = await getSingleUser(credentials.email) as CreatedUserType;
          console.log("user from db", user);
          if(!user) {
            return null;
          }

          const decode = await bcrypt.compare(credentials.password, user.password);
          console.log("decoded pwd: ", decode);
          if(!decode){
            return null
          }
          return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email
            };
        } catch (error: any) {
          return error.message
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {params: {scope: "profile email"}}
    })
  ],
  secret: process.env.NEXTAUTH_URL,
  pages: {
    signIn: "/signin"
  }
}