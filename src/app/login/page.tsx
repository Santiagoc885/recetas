import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Iniciar sesión
        </Typography>
        <LoginForm />
        <Typography sx={{ mt: 3 }} variant="body2" color="text.secondary">
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
