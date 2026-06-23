import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import { getRecipeById } from "@/services/recipeService";
import { difficultyColor } from "@/utils/format";

// Página pública (/recipes/[id]): detalle completo de una receta, incluye
// los campos que no se muestran en el listado (ingredientes, pasos,
// porciones, descripción).
export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ position: "relative", height: { xs: 220, sm: 360 }, borderRadius: 3, overflow: "hidden" }}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>

      <Typography variant="h4" component="h1" sx={{ mt: 3, fontWeight: 700 }}>
        {recipe.title}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }}>
        <Chip icon={<AccessTimeIcon />} label={recipe.prepTime} />
        <Chip label={recipe.difficulty} color={difficultyColor(recipe.difficulty)} />
        <Chip icon={<PeopleIcon />} label={`${recipe.servings} porciones`} />
      </Stack>

      <Typography sx={{ mt: 3 }} color="text.secondary">
        {recipe.description}
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Ingredientes
          </Typography>
          <List dense disablePadding>
            {recipe.ingredients.map((ingredient) => (
              <ListItem key={ingredient} disableGutters>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Preparación
          </Typography>
          <List disablePadding>
            {recipe.instructions.map((step, index) => (
              <ListItem key={step} disableGutters alignItems="flex-start">
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Container>
  );
}
