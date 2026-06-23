import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Recipe as RecipeModel, type RecipeDocument } from "@/models/Recipe";
import type { Recipe, RecipeSummary } from "@/types";

// Responsabilidad: lectura del catálogo de recetas.
//
// Métodos disponibles:
// - getAllRecipes: trae todas las recetas con los campos del listado (RecipeCard).
// - getRecipeById: trae una receta completa para la vista de detalle.

type RecipeDocWithId = RecipeDocument & { _id: Types.ObjectId };

function toRecipe(doc: RecipeDocWithId): Recipe {
  return {
    id: doc._id.toString(),
    title: doc.title,
    image: doc.image,
    difficulty: doc.difficulty as Recipe["difficulty"],
    prepTime: doc.prepTime,
    servings: doc.servings,
    ingredients: doc.ingredients,
    instructions: doc.instructions,
    description: doc.description,
  };
}

// Retorna todas las recetas, ordenadas por título, con los campos
// necesarios para el listado público (no incluye ingredientes/pasos).
export async function getAllRecipes(): Promise<RecipeSummary[]> {
  await connectToDatabase();

  const recipes = await RecipeModel.find().sort({ title: 1 });

  return (recipes as RecipeDocWithId[]).map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    image: doc.image,
    difficulty: doc.difficulty as RecipeSummary["difficulty"],
    prepTime: doc.prepTime,
  }));
}

// Retorna la receta completa por id, o null si no existe / el id es inválido.
export async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!Types.ObjectId.isValid(id)) return null;

  await connectToDatabase();

  const recipe = await RecipeModel.findById(id);
  if (!recipe) return null;

  return toRecipe(recipe as RecipeDocWithId);
}
