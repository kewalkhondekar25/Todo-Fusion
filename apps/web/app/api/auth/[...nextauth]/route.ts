import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password", placeholder: "Your Password" }
      },
      async authorize(credentials: any) {
        
        return {
          id: "user1"
        }
      },
    })
  ]
});

export { handler as GET, handler as POST }