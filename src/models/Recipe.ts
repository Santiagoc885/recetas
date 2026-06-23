import { Schema, model, models, type InferSchemaType } from "mongoose";

const recipeSchema = new Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["Fácil", "Intermedio", "Difícil"],
  },
  prepTime: { type: String, required: true },
  servings: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  description: { type: String, required: true },
});

export type RecipeDocument = InferSchemaType<typeof recipeSchema>;

export const Recipe = models.Recipe || model("Recipe", recipeSchema);
