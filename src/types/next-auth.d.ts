import type { DefaultSession } from "next-auth";

// Next Auth no expone `id` en la sesión por defecto: lo agregamos acá para
// poder usar `session.user.id` con tipado correcto en toda la app.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// El tipo `JWT` real vive en @auth/core/jwt (next-auth/jwt solo lo re-exporta),
// así que la augmentation tiene que apuntar ahí para que se mezcle correctamente.
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
  }
}
