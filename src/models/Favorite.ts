import { Schema, model, models, type InferSchemaType } from "mongoose";

const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipeId: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Un usuario no puede marcar la misma receta como favorita dos veces.
favoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export type FavoriteDocument = InferSchemaType<typeof favoriteSchema>;

export const Favorite = models.Favorite || model("Favorite", favoriteSchema);
