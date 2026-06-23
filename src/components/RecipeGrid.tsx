import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RecipeCard from "@/components/RecipeCard";
import type { RecipeSummary } from "@/types";

// Responsabilidad: grid responsive de RecipeCards, reutilizado en el
// listado principal (/) y en la vista de favoritos (/favorites).
// Props:
// - recipes: recetas a mostrar.
// - favoriteIds: ids de las recetas que el usuario actual tiene en favoritos.
// - isAuthenticated: si hay un usuario logueado.
// - emptyMessage: texto a mostrar cuando `recipes` está vacío.
interface RecipeGridProps {
  recipes: RecipeSummary[];
  favoriteIds: string[];
  isAuthenticated: boolean;
  emptyMessage: string;
}

export default function RecipeGrid({
  recipes,
  favoriteIds,
  isAuthenticated,
  emptyMessage,
}: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
        {emptyMessage}
      </Typography>
    );
  }

  const favoriteIdSet = new Set(favoriteIds);

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favoriteIdSet.has(recipe.id)}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </Box>
  );
}
