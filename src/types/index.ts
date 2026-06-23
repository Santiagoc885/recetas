// Tipos compartidos entre servicios, server actions y componentes.

export type Difficulty = "Fácil" | "Intermedio" | "Difícil";

// Forma completa de una receta tal como se guarda en MongoDB.
export interface Recipe {
  id: string;
  title: string;
  image: string;
  difficulty: Difficulty;
  prepTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  description: string;
}

// Subconjunto de campos que necesita el listado/RecipeCard.
export type RecipeSummary = Pick<
  Recipe,
  "id" | "title" | "image" | "difficulty" | "prepTime"
>;

export interface PublicUser {
  id: string;
  name: string;
  email: string;
}
