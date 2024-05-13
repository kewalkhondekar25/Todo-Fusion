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

interface CustomUser extends CreatedUserType {
  firstName: string;
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
          const user = await getSingleUser(credentials.email) as CreatedUserType;
          console.log("user from db", user);
          //_validations
          if(!user) {
            return null;
          }

          if(user.password === credentials.password) {
            return user
          }
        } catch (error: any) {
          return error.message
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_URL,
  callbacks: {
    jwt: ({token, user}) => {
      if(user){
        const customUser = user as CustomUser;
        // token.id = `${customUser.id}`
        token.name = `${customUser.firstName} ${customUser.lastName}`
      }
      return token
    },
    session: ({ session, token, user }: any) => {
      if(session && user) {
        const customUser = user as CustomUser;
        // session.user.id = `${customUser.id}`
        session.user.name = `${customUser.firstName} ${customUser.lastName}`;
      }
      return session;
  }
  }
});

export { handler as GET, handler as POST }