import { auth } from "@/auth";
import NavbarClient from "@/components/NavbarClient";

// Responsabilidad: barra de navegación superior, visible en toda la app.
// Es un Server Component: lee la sesión actual con `auth()` y le pasa solo
// el nombre del usuario (dato plano) a NavbarClient, que hace el render
// interactivo con MUI.
export default async function Navbar() {
  const session = await auth();

  return <NavbarClient userName={session?.user?.name ?? null} />;
}
