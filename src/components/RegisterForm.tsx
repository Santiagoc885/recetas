"use client";

import { useActionState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { registerAction, type FormState } from "@/app/actions/auth";

// Responsabilidad: formulario de registro de un nuevo usuario.
// Usa useActionState para mostrar errores de validación por campo y
// mensajes generales (ej. email ya registrado).
const initialState: FormState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <Box component="form" action={formAction} noValidate>
      <Stack spacing={2.5}>
        {state.message && <Alert severity="error">{state.message}</Alert>}

        <TextField
          name="name"
          label="Nombre"
          required
          fullWidth
          error={Boolean(state.errors?.name)}
          helperText={state.errors?.name?.[0]}
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          required
          fullWidth
          error={Boolean(state.errors?.email)}
          helperText={state.errors?.email?.[0]}
        />

        <TextField
          name="password"
          label="Contraseña"
          type="password"
          required
          fullWidth
          error={Boolean(state.errors?.password)}
          helperText={state.errors?.password?.[0] ?? "Mínimo 6 caracteres."}
        />

        <Button type="submit" variant="contained" size="large" disabled={pending}>
          {pending ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </Stack>
    </Box>
  );
}
