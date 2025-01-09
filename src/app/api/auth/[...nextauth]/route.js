// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          profileImage: user.profileImage,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    serializeUser: (user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    }),
    deserializeUser: ({ id, name, email, profileImage }) => ({
      id,
      name,
      email,
      profileImage,
    }),
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          profileImage: token.profileImage,
        };
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.profileImage = user.profileImage;
      }

      // This is crucial for handling session updates
      if (trigger === "update" && session?.user?.profileImage) {
        console.log(
          "Updating token with new profile image:",
          session.user.profileImage
        );
        token.profileImage = session.user.profileImage;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

// Change these to named exports
export const GET = handler;
export const POST = handler;
