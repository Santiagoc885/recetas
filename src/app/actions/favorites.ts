"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { toggleFavorite } from "@/services/favoriteService";

// Agrega o quita una receta de los favoritos del usuario autenticado.
// Retorna el nuevo estado (true = quedó como favorita).
//
// Server Functions son alcanzables por POST directo, no solo desde la UI,
// por eso siempre se vuelve a verificar la sesión acá aunque el botón que
// la invoca ya esté oculto para usuarios no autenticados.
export async function toggleFavoriteAction(recipeId: string): Promise<boolean> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Debes iniciar sesión para guardar favoritos.");
  }

  const isFavoriteNow = await toggleFavorite(session.user.id, recipeId);

  revalidatePath("/");
  revalidatePath("/favorites");

  return isFavoriteNow;
}
