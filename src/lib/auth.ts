import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import type { DefaultSession, Session, User, Account, Profile } from "next-auth"
import type { JWT } from "next-auth/jwt"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { verifyPassword } from "@/app/(auth)/actions"

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

// Define logger types
type LoggerType = {
  error: (code: string, metadata?: unknown) => void;
  warn: (code: string) => void;
  debug: (code: string, metadata?: unknown) => void;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('Credentials auth attempt for:', credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            throw new Error("Invalid credentials");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            console.log('No user found or no password set for:', credentials.email);
            throw new Error("No user found");
          }

          const isPasswordValid = await verifyPassword(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log('Invalid password for:', credentials.email);
            throw new Error("Invalid password");
          }

          console.log('Auth successful for:', user.email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      // For OAuth sign-ins
      if (account && account.provider !== 'credentials') {
        if (!user?.email) {
          console.error("Sign in failed - no user email");
          return false;
        }
        return true;
      }

      // For credentials sign-in
      if (!user?.email) {
        console.error("Sign in failed - no user email");
        return false;
      }
      return true;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ token, user }: { token: JWT; user: User | undefined }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    redirect: async ({ url, baseUrl }: { url: string; baseUrl: string }) => {
      console.debug('Redirecting to:', url);
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl
    },
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code: string, metadata?: unknown) {
      console.error(code, metadata);
    },
    warn(code: string) {
      console.warn(code);
    },
    debug(code: string, metadata?: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.debug(code, metadata);
      }
    },
  } as LoggerType,
  events: {
    async signIn({ user }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }) {
      if (user) {
        try {
          // Store checkout data if coming from checkout flow
          const checkoutData = typeof window !== 'undefined' ?
              sessionStorage.getItem('pendingCheckoutConfig') : null;

          if (checkoutData) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                checkoutData: checkoutData ? JSON.parse(checkoutData) : null,
              },
            });
            // Clear checkout data from session storage after storing
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem('pendingCheckoutConfig');
            }
          }
        } catch (error) {
          // Handle error silently - don't break the auth flow
          console.error("Error storing checkout data:", error);
          return;
        }
      }
    },
  },
}

// Create the auth handler
export const auth = NextAuth(authOptions)

// Use this in server components and API routes
export const getServerAuthSession = auth;