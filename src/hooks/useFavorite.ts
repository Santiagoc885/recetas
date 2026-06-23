"use client";

import { useState, useTransition } from "react";
import { toggleFavoriteAction } from "@/app/actions/favorites";
import { useToast } from "@/hooks/useToast";

// Qué hace: maneja el estado del ícono de favorito de una receta con UI
// optimista (cambia al instante, sin esperar la respuesta del servidor),
// dispara la Server Action que persiste el cambio en MongoDB y confirma el
// resultado con un toast.
// Retorna:
// - isFavorite: estado actual (optimista) del favorito.
// - isPending: true mientras la Server Action está en curso.
// - toggle: función para alternar el estado.
export function useFavorite(recipeId: string, initialIsFavorite: boolean) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function toggle() {
    const optimisticValue = !isFavorite;
    setIsFavorite(optimisticValue);

    startTransition(async () => {
      try {
        const actualValue = await toggleFavoriteAction(recipeId);
        setIsFavorite(actualValue);
        showToast(actualValue ? "Agregada a favoritos" : "Quitada de favoritos");
      } catch {
        // Si la Server Action falla, se revierte el cambio optimista.
        setIsFavorite(!optimisticValue);
        showToast("No se pudo actualizar el favorito. Intenta de nuevo.", "error");
      }
    });
  }

  return { isFavorite, isPending, toggle };
}
