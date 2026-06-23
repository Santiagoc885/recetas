"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { createUser, EmailAlreadyInUseError } from "@/services/userService";
import { sendWelcomeEmail } from "@/services/emailService";

// Responsabilidad: Server Actions de autenticación, invocadas directamente
// desde los formularios de Login y Register vía useActionState.

export interface FormState {
  errors?: Record<string, string[]>;
  message?: string;
}

const RegisterSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.email("Ingresa un correo válido.").trim(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

const LoginSchema = z.object({
  email: z.email("Ingresa un correo válido.").trim(),
  password: z.string().min(1, "La contraseña es obligatoria."),
});

// Valida los datos, crea el usuario, envía el correo de bienvenida e inicia
// sesión automáticamente. Retorna errores de validación o un mensaje si el
// correo ya está en uso.
export async function registerAction(
  _prevState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  const validated = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: z.flattenError(validated.error).fieldErrors as Record<string, string[]> };
  }

  const { name, email, password } = validated.data;

  try {
    await createUser({ name, email, password });
  } catch (error) {
    if (error instanceof EmailAlreadyInUseError) {
      return { message: error.message };
    }
    return { message: "No se pudo crear la cuenta. Intenta nuevamente." };
  }

  await sendWelcomeEmail(email, name);

  // Inicia sesión automáticamente con las credenciales recién creadas.
  // El query param ?bienvenida=1 le indica a AuthToast que muestre la
  // confirmación una vez que el home termine de cargar.
  await signIn("credentials", { email, password, redirectTo: "/?bienvenida=1" });

  return {};
}

// Valida los datos e inicia sesión con el Credentials Provider de NextAuth.
// Retorna un mensaje de error si las credenciales son inválidas.
export async function loginAction(
  _prevState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: z.flattenError(validated.error).fieldErrors as Record<string, string[]> };
  }

  try {
    await signIn("credentials", { ...validated.data, redirectTo: "/?sesion=1" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Email o contraseña incorrectos." };
    }
    // NEXT_REDIRECT y otros errores no relacionados a auth deben propagarse.
    throw error;
  }

  return {};
}

// Cierra la sesión del usuario y redirige al home.
export async function logoutAction() {
  await signOut({ redirectTo: "/?salida=1" });
}
