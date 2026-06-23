"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GradeIcon from '@mui/icons-material/Grade';
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";

// Responsabilidad: la parte interactiva/visual del Navbar (botones, enlaces).
// Es Client Component porque MUI necesita pasar `next/link` como prop
// `component` de Stack/Button, y eso solo es serializable dentro del límite
// de cliente (no se puede pasar una referencia a componente desde un Server
// Component). El Server Component (Navbar.tsx) hace el trabajo de leer la
// sesión y le pasa acá solo datos planos.
// Props:
// - userName: nombre del usuario logueado, o null si no hay sesión.
export default function NavbarClient({ userName }: { userName: string | null }) {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar sx={{ gap: 2 }}>
        <Stack
          direction="row"
          spacing={1}
          component={Link}
          href="/"
          sx={{ alignItems: "center", textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          <MenuBookIcon />
          <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
            Chanti&apos;s Recipes
          </Typography>
        </Stack>

        {userName ? (
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Button
              component={Link}
              href="/favorites"
              color="inherit"
              startIcon={<GradeIcon />}
            >
              Favoritos
            </Button>
            <Typography variant="body2">Hola, {userName}</Typography>
            <form action={logoutAction}>
              <Button type="submit" color="inherit" variant="outlined">
                Salir
              </Button>
            </form>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1.5}>
            <Button component={Link} href="/login" color="inherit">
              Iniciar sesión
            </Button>
            <Button
              component={Link}
              href="/register"
              color="inherit"
              variant="outlined"
            >
              Registrarse
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
