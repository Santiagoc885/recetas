"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/useToast";

// Mensajes que dejan las Server Actions de auth en la URL de redirección
// (ej. redirectTo: "/?sesion=1") para confirmarle al usuario qué pasó.
const MESSAGES: Record<string, string> = {
  bienvenida: "¡Cuenta creada con éxito! Ya iniciaste sesión.",
  sesion: "Sesión iniciada correctamente.",
  salida: "Sesión cerrada.",
};

// Responsabilidad: mostrar un toast de confirmación luego de registrarse,
// iniciar o cerrar sesión, y limpiar la marca de la URL para que no se
// repita si el usuario recarga la página.
export default function AuthToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    const match = Object.entries(MESSAGES).find(([param]) => searchParams.has(param));
    if (match) {
      showToast(match[1]);
      router.replace(pathname);
    }
    // Solo debe reaccionar a cambios en la URL, no en showToast/router/pathname.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
