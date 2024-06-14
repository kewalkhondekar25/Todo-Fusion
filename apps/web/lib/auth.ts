import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { NextAuthOptions, User as NextAuthUser, Account, Profile, Session } from "next-auth";
import { getSingleUser, createUser } from "@repo/db";

interface CreatedUserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomUser extends CreatedUserType {
  firstName: string;
}

interface GoogleProfile extends Profile {
  given_name?: string;
  family_name?: string;
  picture?: string;
}

interface GitHubProfile extends Profile {
  login?: string;
  avatar_url?: string;
}

function isGoogleProfile(profile: Profile): profile is GoogleProfile {
  return (profile as GoogleProfile).given_name !== undefined;
}

function isGitHubProfile(profile: Profile): profile is GitHubProfile {
  return (profile as GitHubProfile).login !== undefined;
}

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password", placeholder: "Your Password" }
      },
      async authorize(credentials: any): Promise<NextAuthUser | null> {
        try {
          if (!credentials.email || !credentials.password) {
            return null;
          }

          const user = await getSingleUser(credentials.email) as CreatedUserType;
          
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          };
        } catch (error: any) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: { params: { scope: "profile email" } }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: { params: { scope: "user:email" } }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }: { user: NextAuthUser; account: Account | null; profile?: Profile }): Promise<boolean> {
      if (!user.email || !account) {
        return false;
      }

      if (account.provider === "google" && profile && isGoogleProfile(profile)) {
        let dbUser = await getSingleUser(user.email);

        if (!dbUser) {
          const { given_name: firstName = "", family_name: lastName = "", picture: avatar = "" } = profile;

          dbUser = await createUser({
            // id: user.id as string,
            firstName,
            lastName,
            email: user.email,
            password: "", // Password is not applicable for OAuth providers
            // avatar,
            // isPremium: false,
            // createdAt: new Date(),
            // updatedAt: new Date(),
          });
        }
      } else if (account.provider === "github" && profile && isGitHubProfile(profile)) {
        let dbUser = await getSingleUser(user.email);

        if (!dbUser) {
          const { login: firstName = "", avatar_url: avatar = "" } = profile;

          dbUser = await createUser({
            // id: user.id as string,
            firstName,
            lastName: "", // GitHub does not provide last name
            email: user.email,
            password: "", // Password is not applicable for OAuth providers
            // avatar,
            // isPremium: false,
            // createdAt: new Date(),
            // updatedAt: new Date(),
          });
        }
      }

      return true;
    },
    // async session({ session, token }: { session: Session; token: any }): Promise<Session> {
    //   session.user.id = token.id as string;
    //   return session;
    // },
    // async jwt({ token, user }: { token: any; user?: NextAuthUser }): Promise<any> {
    //   if (user) {
    //     token.id = user.id as string;
    //   }
    //   return token;
    // },
  },
};
