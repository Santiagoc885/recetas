import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Crear cuenta
        </Typography>
        <RegisterForm />
        <Typography sx={{ mt: 3 }} variant="body2" color="text.secondary">
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
