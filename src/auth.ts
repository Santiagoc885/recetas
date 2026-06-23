import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyCredentials } from "@/services/userService";

// Configuración central de NextAuth v5.
// - Credentials Provider: valida email/password contra userService (capa de
//   servicios), nunca contra Mongoose directamente.
// - Sesión JWT: la firma y verificación del token la maneja NextAuth, no se
//   implementa JWT manualmente.
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await verifyCredentials(
          credentials.email as string,
          credentials.password as string
        );

        return user;
      },
    }),
  ],
  callbacks: {
    // Copia el id del usuario al token la primera vez que inicia sesión.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Expone el id del usuario en `session.user.id`.
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
