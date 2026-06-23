import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import type { PublicUser } from "@/types";

const SALT_ROUNDS = 10;

// Responsabilidad: toda la lógica de usuarios (alta y verificación de
// credenciales) vive acá. Ninguna page, componente o server action debe
// importar el modelo `User` directamente.
//
// Métodos disponibles:
// - createUser: registra un usuario nuevo con password hasheada.
// - verifyCredentials: valida email/password para el login.
// - findUserById: obtiene los datos públicos de un usuario por id.

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("Ese correo ya está registrado.");
    this.name = "EmailAlreadyInUseError";
  }
}

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

// Crea un usuario nuevo. Lanza EmailAlreadyInUseError si el email ya existe.
// Retorna los datos públicos del usuario creado (sin password).
export async function createUser(input: CreateUserInput): Promise<PublicUser> {
  await connectToDatabase();

  const existing = await User.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    throw new EmailAlreadyInUseError();
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    password: hashedPassword,
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}

// Verifica email + password contra la base de datos.
// Retorna los datos públicos del usuario si son correctos, o null si no.
export async function verifyCredentials(
  email: string,
  password: string
): Promise<PublicUser | null> {
  await connectToDatabase();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return null;

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}

// Busca un usuario por id. Retorna null si no existe.
export async function findUserById(id: string): Promise<PublicUser | null> {
  await connectToDatabase();

  const user = await User.findById(id);
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}
