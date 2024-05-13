import { getSingleUser } from "@repo/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"

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
          //_validations
          //check email
          const user = await getSingleUser(credentials.email) as CreatedUserType;
          console.log("user from db", user);
          if(!user) {
            return null;
          }
          //check pwd
          const hashPwd = user.password;
          const decode = await bcrypt.compare(credentials.password, hashPwd);
          console.log("decoded pwd: ", decode);
          if(!decode){
            return null
          }
          return user;
        } catch (error: any) {
          return error.message
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {params: {scope: "profile"}}
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