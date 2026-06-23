"use client";

import { useActionState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { loginAction, type FormState } from "@/app/actions/auth";

// Responsabilidad: formulario de inicio de sesión.
// Usa useActionState para mostrar errores de validación y el mensaje de
// "credenciales incorrectas" sin necesidad de manejar estado manualmente.
const initialState: FormState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <Box component="form" action={formAction} noValidate>
      <Stack spacing={2.5}>
        {state.message && <Alert severity="error">{state.message}</Alert>}

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
          helperText={state.errors?.password?.[0]}
        />

        <Button type="submit" variant="contained" size="large" disabled={pending}>
          {pending ? "Ingresando..." : "Iniciar sesión"}
        </Button>
      </Stack>
    </Box>
  );
}
