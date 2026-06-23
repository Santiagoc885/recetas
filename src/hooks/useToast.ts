"use client";

import { useContext } from "react";
import { ToastContext } from "@/components/ToastProvider";

// Qué hace: da acceso al sistema global de notificaciones (toasts).
// Retorna: showToast(mensaje, severidad?) para mostrar una notificación.
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
  }

  return context;
}
