import { getSingleUser } from "@repo/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password", placeholder: "Your Password" }
      },
      async authorize(credentials: any): Promise<any> {
        console.log(credentials);
        return {
          id: 69,
          name: "kk"
        }
        
        // try {
        //   //get user from email
        //   const singleUser = await getSingleUser(credentials.identifier.email)
        //   console.log(singleUser);
        //   //if not throw error
        //   //if yes, check password & return user else err
        //   return singleUser
        // } catch (error: any) {
        //   throw new Error(error)
        // }
        return {
          id: "user1"
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_URL
});

export { handler as GET, handler as POST }