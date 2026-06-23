import type { Difficulty } from "@/types";

// Objetivo: mapear la dificultad de una receta al color de un MUI Chip.
// Uso esperado: difficultyColor(receta.difficulty) -> color para <Chip color={...} />
export function difficultyColor(
  difficulty: Difficulty
): "success" | "warning" | "error" {
  switch (difficulty) {
    case "Fácil":
      return "success";
    case "Intermedio":
      return "warning";
    case "Difícil":
      return "error";
  }
}

// Objetivo: acortar un texto largo (ej. descripción) agregando "..." al final.
// Uso esperado: truncate(receta.description, 120)
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}
