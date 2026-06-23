import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { auth } from "@/auth";
import { getFavoriteRecipes } from "@/services/favoriteService";
import RecipeGrid from "@/components/RecipeGrid";
import StarRateIcon from "@mui/icons-material/StarRate";

// Página protegida (/favorites): solo las recetas favoritas del usuario
// autenticado. `proxy.ts` ya redirige antes de llegar acá, pero se vuelve a
// verificar la sesión del lado del servidor como defensa en profundidad.
export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const recipes = await getFavoriteRecipes(session.user.id);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}
      >
        Mis favoritos 
        <StarRateIcon sx={{ color: "#f5b301", fontSize: "1em" }} />
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Las recetas que has guardado.
      </Typography>

      <RecipeGrid
        recipes={recipes}
        favoriteIds={recipes.map((recipe) => recipe.id)}
        isAuthenticated
        emptyMessage="Todavía no agregaste ninguna receta a favoritos."
      />
    </Container>
  );
}
