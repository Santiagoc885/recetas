import { config } from "dotenv";
import mongoose from "mongoose";
import { Recipe } from "@/models/Recipe";
import { uploadImageFromUrl } from "@/services/cloudinaryService";

config({ path: ".env.local" });


function slugify(text: string): string {
  const COMBINING_DIACRITICS = new RegExp("[̀-ͯ]", "g");
  return text
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "") // quita tildes
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const recipes = [
  {
    title: "Ensalada César",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    difficulty: "Fácil",
    prepTime: "15 min",
    servings: 2,
    ingredients: [
      "1 lechuga romana",
      "50 g de queso parmesano",
      "1 taza de crutones",
      "3 cucharadas de aderezo césar",
      "Pechuga de pollo a la plancha (opcional)",
    ],
    instructions: [
      "Lava y corta la lechuga en trozos medianos.",
      "Mezcla la lechuga con el aderezo césar.",
      "Agrega los crutones y el queso parmesano en láminas.",
      "Sirve con pollo a la plancha si lo deseas.",
    ],
    description:
      "Una ensalada clásica, fresca y rápida de preparar, ideal como entrada o plato ligero.",
  },
  {
    title: "Tacos de carne asada",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    difficulty: "Fácil",
    prepTime: "25 min",
    servings: 4,
    ingredients: [
      "500 g de carne de res para asar",
      "8 tortillas de maíz",
      "1 cebolla picada",
      "Cilantro fresco",
      "2 limones",
      "Sal y pimienta",
    ],
    instructions: [
      "Sazona la carne con sal y pimienta.",
      "Cocina la carne a la plancha hasta el término deseado.",
      "Corta la carne en trozos pequeños.",
      "Calienta las tortillas y arma los tacos con carne, cebolla y cilantro.",
      "Sirve con limón al gusto.",
    ],
    description:
      "Tacos sencillos y llenos de sabor, perfectos para una comida rápida en familia.",
  },
  {
    title: "Sopa de tomate",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    difficulty: "Fácil",
    prepTime: "30 min",
    servings: 4,
    ingredients: [
      "6 tomates maduros",
      "1 cebolla",
      "2 dientes de ajo",
      "500 ml de caldo de verduras",
      "Aceite de oliva",
      "Albahaca fresca",
    ],
    instructions: [
      "Sofríe la cebolla y el ajo en aceite de oliva.",
      "Agrega los tomates picados y cocina 10 minutos.",
      "Incorpora el caldo de verduras y cocina 15 minutos más.",
      "Licúa hasta obtener una textura suave.",
      "Sirve caliente con albahaca fresca.",
    ],
    description:
      "Una sopa reconfortante, ideal para días fríos, con sabor casero e intenso.",
  },
  {
    title: "Pasta al pesto",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    difficulty: "Intermedio",
    prepTime: "20 min",
    servings: 3,
    ingredients: [
      "300 g de pasta",
      "2 tazas de albahaca fresca",
      "1/2 taza de aceite de oliva",
      "1/4 taza de piñones",
      "50 g de queso parmesano",
      "2 dientes de ajo",
    ],
    instructions: [
      "Cocina la pasta en agua con sal hasta que esté al dente.",
      "Licúa la albahaca, el aceite, los piñones, el ajo y el queso hasta obtener una salsa homogénea.",
      "Mezcla la pasta caliente con el pesto.",
      "Sirve con queso parmesano extra.",
    ],
    description:
      "Pasta italiana clásica con una salsa pesto casera fresca y aromática.",
  },
  {
    title: "Pollo al curry",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    difficulty: "Intermedio",
    prepTime: "40 min",
    servings: 4,
    ingredients: [
      "600 g de pechuga de pollo en cubos",
      "400 ml de leche de coco",
      "2 cucharadas de pasta de curry",
      "1 cebolla",
      "2 dientes de ajo",
      "Arroz blanco para acompañar",
    ],
    instructions: [
      "Sofríe la cebolla y el ajo hasta que estén transparentes.",
      "Agrega el pollo y cocina hasta dorar.",
      "Incorpora la pasta de curry y mezcla bien.",
      "Agrega la leche de coco y cocina a fuego medio 20 minutos.",
      "Sirve caliente acompañado de arroz blanco.",
    ],
    description:
      "Un curry cremoso y aromático, con el balance justo entre especias y dulzura de coco.",
  },
  {
    title: "Hamburguesa casera",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    difficulty: "Intermedio",
    prepTime: "35 min",
    servings: 4,
    ingredients: [
      "600 g de carne molida",
      "4 panes de hamburguesa",
      "Queso cheddar",
      "Lechuga y tomate",
      "Cebolla caramelizada",
      "Sal, pimienta y especias al gusto",
    ],
    instructions: [
      "Sazona la carne molida y forma las hamburguesas.",
      "Cocina las hamburguesas a la plancha por ambos lados.",
      "Agrega el queso cheddar para que se derrita.",
      "Tuesta los panes ligeramente.",
      "Arma la hamburguesa con lechuga, tomate y cebolla caramelizada.",
    ],
    description:
      "Hamburguesas jugosas hechas en casa, con todos los toppings clásicos.",
  },
  {
    title: "Sushi de salmón",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80",
    difficulty: "Difícil",
    prepTime: "1 h 30 min",
    servings: 4,
    ingredients: [
      "2 tazas de arroz para sushi",
      "300 g de salmón fresco",
      "Láminas de alga nori",
      "Vinagre de arroz",
      "Palta",
      "Salsa de soja y wasabi para acompañar",
    ],
    instructions: [
      "Cocina el arroz y mézclalo con vinagre de arroz, azúcar y sal.",
      "Corta el salmón y la palta en tiras finas.",
      "Extiende el arroz sobre el alga nori.",
      "Agrega el relleno y enrolla firmemente con una esterilla de bambú.",
      "Corta en porciones y sirve con soja y wasabi.",
    ],
    description:
      "Rolls de sushi caseros con salmón fresco, un desafío que vale la pena.",
  },
  {
    title: "Risotto de hongos",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    difficulty: "Difícil",
    prepTime: "50 min",
    servings: 3,
    ingredients: [
      "300 g de arroz arborio",
      "250 g de hongos mixtos",
      "1 litro de caldo de verduras caliente",
      "1/2 taza de vino blanco",
      "50 g de mantequilla",
      "60 g de queso parmesano",
    ],
    instructions: [
      "Saltea los hongos y resérvalos.",
      "Tuesta el arroz en mantequilla hasta que esté translúcido.",
      "Agrega el vino blanco y deja que se evapore.",
      "Incorpora el caldo caliente de a poco, revolviendo constantemente.",
      "Cuando el arroz esté cremoso, agrega los hongos y el queso parmesano.",
    ],
    description:
      "Un risotto cremoso y untuoso que requiere paciencia pero recompensa con sabor.",
  },
  {
    title: "Pancakes esponjosos",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    difficulty: "Fácil",
    prepTime: "20 min",
    servings: 2,
    ingredients: [
      "1 taza de harina",
      "1 huevo",
      "1 taza de leche",
      "1 cucharada de azúcar",
      "1 cucharadita de polvo de hornear",
      "Miel y frutas para acompañar",
    ],
    instructions: [
      "Mezcla los ingredientes secos en un bowl.",
      "Agrega el huevo y la leche, mezcla hasta obtener una masa homogénea.",
      "Cocina pequeñas porciones en una sartén caliente hasta dorar ambos lados.",
      "Sirve con miel y frutas.",
    ],
    description:
      "El desayuno clásico de fin de semana: pancakes suaves, esponjosos y dulces.",
  },
  {
    title: "Torta de chocolate",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    difficulty: "Difícil",
    prepTime: "1 h 15 min",
    servings: 8,
    ingredients: [
      "200 g de chocolate negro",
      "200 g de mantequilla",
      "4 huevos",
      "200 g de azúcar",
      "150 g de harina",
      "1 cucharadita de polvo de hornear",
    ],
    instructions: [
      "Derrite el chocolate junto con la mantequilla a baño maría.",
      "Bate los huevos con el azúcar hasta que doblen su volumen.",
      "Incorpora el chocolate derretido a la mezcla de huevos.",
      "Agrega la harina tamizada con el polvo de hornear, mezclando con movimientos envolventes.",
      "Hornea a 180°C por 35-40 minutos. Deja enfriar antes de desmoldar.",
    ],
    description:
      "Una torta húmeda e intensa en chocolate, perfecta para ocasiones especiales.",
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Falta la variable de entorno MONGODB_URI");
  }

  await mongoose.connect(uri);
  console.log("Conectado a MongoDB");

  await Recipe.deleteMany({});
  console.log("Recetas anteriores eliminadas");

  console.log("Subiendo imágenes a Cloudinary...");
  const recipesWithCloudinaryImages = await Promise.all(
    recipes.map(async (recipe) => ({
      ...recipe,
      image: await uploadImageFromUrl(recipe.image, slugify(recipe.title)),
    }))
  );

  await Recipe.insertMany(recipesWithCloudinaryImages);
  console.log(`${recipes.length} recetas insertadas`);

  await mongoose.disconnect();
  console.log("Listo.");
}

seed().catch((error) => {
  console.error("Error al ejecutar el seed:", error);
  process.exit(1);
});
