import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { auth } from "@/auth";
import { getAllRecipes } from "@/services/recipeService";
import { getFavoriteRecipeIds } from "@/services/favoriteService";
import RecipeGrid from "@/components/RecipeGrid";

// Página pública (/): catálogo completo de recetas. Si hay un usuario
// logueado, se consultan sus favoritos para marcar el ícono correspondiente en cada RecipeCard.
export default async function HomePage() {
  const session = await auth();

  const [recipes, favoriteIds] = await Promise.all([
    getAllRecipes(),
    session?.user ? getFavoriteRecipeIds(session.user.id) : Promise.resolve([]),
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Catálogo de recetas
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Explora nuestras recetas y guarda tus favoritas.
      </Typography>

      <RecipeGrid
        recipes={recipes}
        favoriteIds={favoriteIds}
        isAuthenticated={Boolean(session?.user)}
        emptyMessage="Todavía no hay recetas cargadas."
      />
    </Container>
  );
}
