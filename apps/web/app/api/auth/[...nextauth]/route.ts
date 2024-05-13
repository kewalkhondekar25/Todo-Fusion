import { getSingleUser } from "@repo/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

const handler = NextAuth({
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
          const user = await getSingleUser(credentials.email) as CreatedUserType
          if (user.password === credentials.password) {
            return { user }
          }

          if (!user) {
            return null;
          }
        } catch (error: any) {
          return error.message
        }

      },
    })
  ],
  secret: process.env.NEXTAUTH_URL
});

export { handler as GET, handler as POST }