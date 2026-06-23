import { Schema, model, models, type InferSchemaType } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export type UserDocument = InferSchemaType<typeof userSchema>;

// `models.User` evita redefinir el modelo en cada hot-reload de Next.js.
export const User = models.User || model("User", userSchema);
