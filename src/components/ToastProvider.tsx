"use client";

import { createContext, useCallback, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { type AlertColor } from "@mui/material/Alert";

interface ToastContextValue {
  showToast: (message: string, severity?: AlertColor) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

// Responsabilidad: sistema simple de notificaciones (toasts) compartido por
// toda la app. Envuelve la app (ver layout.tsx) y expone `showToast` a
// través del hook useToast(), para confirmar acciones como registrarse,
// iniciar/cerrar sesión o agregar/quitar un favorito.
// Props: children — el árbol de la aplicación.
export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showToast = useCallback((msg: string, sev: AlertColor = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={severity} variant="filled" onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
