"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Responsabilidad: envolver la app con el cache de Emotion (necesario para
// que los estilos de MUI se rendericen bien en el servidor con App Router)
// y con el tema visual compartido por toda la aplicación.
// Props: children — el árbol de la aplicación.
const theme = createTheme({
  palette: {
    primary: { main: "#e82121" },
    secondary: { main: "#16d31f" },
    background: { default: "#f3ecec" },
  },
  shape: { borderRadius: 12 },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
