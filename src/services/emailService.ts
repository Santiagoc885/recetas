import nodemailer from "nodemailer";

// Responsabilidad: envío de correos transaccionales de la aplicación,
// usando una cuenta de Gmail (con contraseña de aplicación) vía Nodemailer.
//
// Métodos disponibles:
// - sendWelcomeEmail: envía el correo de bienvenida al registrarse.

function createTransporter() {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
}

// Envía el correo de bienvenida a un usuario recién registrado.
// Si no hay credenciales de Gmail configuradas, o el envío falla, no lanza
// excepción: el registro del usuario no debe depender del envío del correo.
export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn(
      "[emailService] Gmail no configurado, se omite el correo de bienvenida."
    );
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Recetas" <${process.env.GMAIL_USER}>`,
      to,
      subject: "¡Bienvenido a Recetas!",
      html: `
        <h1>¡Hola, ${name}!</h1>
        <p>Gracias por registrarte en Recetas. Ya puedes guardar tus recetas favoritas.</p>
      `,
    });
  } catch (error) {
    console.error("[emailService] Error al enviar el correo de bienvenida:", error);
  }
}
