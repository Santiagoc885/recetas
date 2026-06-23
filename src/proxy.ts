import { auth } from "@/auth";
import { NextResponse } from "next/server";

// En Next.js 16, `middleware.ts` se renombró a `proxy.ts` (mismo propósito:
// correr código antes de completar la petición). Acá se hace el chequeo
// "optimista" de sesión para /favorites: si no hay sesión, redirige a
// /login antes de renderizar la página.
//
// `auth(...)` envuelve la función y completa `req.auth` leyendo la cookie
// de sesión directamente del request (no depende de next/headers).
//
// Esta es una capa adicional de UX, no la única protección: la página y la
// server action de favoritos vuelven a verificar la sesión del lado del
// servidor (ver src/app/favorites/page.tsx y src/app/actions/favorites.ts).
export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/favorites"],
};
