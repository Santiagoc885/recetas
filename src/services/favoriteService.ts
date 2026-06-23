import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Favorite } from "@/models/Favorite";
import type { RecipeDocument } from "@/models/Recipe";
import "@/models/Recipe"; // registra el modelo Recipe para el populate()
import type { RecipeSummary } from "@/types";

// Responsabilidad: gestionar las recetas favoritas de cada usuario.
//
// Métodos disponibles:
// - toggleFavorite: agrega o quita una receta de favoritos.
// - getFavoriteRecipeIds: ids de las recetas favoritas de un usuario (para marcar el ícono en RecipeCard).
// - getFavoriteRecipes: recetas favoritas completas de un usuario (para /favorites).

// Agrega la receta a favoritos si no estaba, o la quita si ya estaba.
// Retorna true si quedó como favorita, false si quedó sin marcar.
export async function toggleFavorite(
  userId: string,
  recipeId: string
): Promise<boolean> {
  await connectToDatabase();

  const existing = await Favorite.findOne({ userId, recipeId });

  if (existing) {
    await existing.deleteOne();
    return false;
  }

  await Favorite.create({ userId, recipeId });
  return true;
}

// Retorna los ids (string) de las recetas favoritas de un usuario.
export async function getFavoriteRecipeIds(userId: string): Promise<string[]> {
  await connectToDatabase();

  const favorites = await Favorite.find({ userId }).select("recipeId");
  return favorites.map((fav) => (fav.recipeId as Types.ObjectId).toString());
}

// Retorna las recetas favoritas completas (campos de listado) de un usuario.
export async function getFavoriteRecipes(
  userId: string
): Promise<RecipeSummary[]> {
  await connectToDatabase();

  const favorites = await Favorite.find({ userId }).populate<{
    recipeId: RecipeDocument & { _id: Types.ObjectId };
  }>("recipeId");

  return favorites
    .filter((fav) => fav.recipeId) // descarta favoritos cuya receta fue borrada
    .map((fav) => ({
      id: fav.recipeId._id.toString(),
      title: fav.recipeId.title,
      image: fav.recipeId.image,
      difficulty: fav.recipeId.difficulty as RecipeSummary["difficulty"],
      prepTime: fav.recipeId.prepTime,
    }));
}
