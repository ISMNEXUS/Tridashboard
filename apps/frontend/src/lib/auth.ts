import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import bcryptjs from 'bcryptjs';

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt' as const,
    maxAge: 15 * 60, // 15 minutes
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciales inválidas');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        });

        if (!user || !user.password) {
          throw new Error('Usuario no encontrado');
        }

        if (!user.isActive) {
          throw new Error('Usuario inactivo');
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string, 
          user.password as string
        );

        if (!isPasswordValid) {
          throw new Error('Contraseña incorrecta');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          roles: (user.roles as any[]).map((ur: any) => ur.role.name),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }: any) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles;
      }
      return session;
    },
    async authorized({ auth, request }: any) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl?.pathname.startsWith('/dashboard');
      
      if (isOnDashboard && !isLoggedIn) {
        return false; // Redirect to login page
      }
      
      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export { authOptions };
