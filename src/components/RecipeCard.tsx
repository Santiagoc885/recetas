"use client";

import Link from "next/link";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import type { RecipeSummary } from "@/types";
import { difficultyColor } from "@/utils/format";
import { useFavorite } from "@/hooks/useFavorite";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';

// Responsabilidad: tarjeta reutilizable que muestra el resumen de una
// receta (imagen, nombre, tiempo y dificultad) en el listado y en
// favoritos, con el botón para agregar/quitar de favoritos.
// Props:
// - recipe: datos de la receta a mostrar.
// - isFavorite: si la receta ya es favorita del usuario actual.
// - isAuthenticated: si hay un usuario logueado (controla si el botón de
//   favorito es funcional o lleva a /login).
interface RecipeCardProps {
  recipe: RecipeSummary;
  isFavorite: boolean;
  isAuthenticated: boolean;
}

export default function RecipeCard({
  recipe,
  isFavorite,
  isAuthenticated,
}: RecipeCardProps) {
  const favorite = useFavorite(recipe.id, isFavorite);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        component={Link}
        href={`/recipes/${recipe.id}`}
        sx={{ position: "relative", height: 180, display: "block" }}
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Typography
            variant="h6"
            component={Link}
            href={`/recipes/${recipe.id}`}
            sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            {recipe.title}
          </Typography>

          {isAuthenticated ? (
            <IconButton
              aria-label={favorite.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              onClick={favorite.toggle}
              disabled={favorite.isPending}
              sx={{ color: "#f5b301" }}
            >
              {favorite.isFavorite ? < StarRateIcon/> : < StarBorderIcon/>}
            </IconButton>
          ) : (
            <IconButton
              aria-label="Inicia sesión para guardar favoritos"
              component={Link}
              href="/login"
              sx={{ color: "#f5b301" }}
            >
              <StarBorderIcon />
            </IconButton>
          )}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }}>
          <Chip icon={<AccessTimeIcon />} label={recipe.prepTime} size="small" />
          <Chip
            label={recipe.difficulty}
            color={difficultyColor(recipe.difficulty)}
            size="small"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
