import { Resend } from "resend";

export async function sendPasswordRecoveryEmail(to: string, resetUrl: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required to send password recovery emails");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || "BC Market <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: "Restablece tu contraseña de BC Market",
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.5;">
        <h1 style="font-size: 20px;">Restablece tu contraseña</h1>
        <p>Recibimos una solicitud para cambiar la contraseña de tu cuenta BC Market.</p>
        <p>
          <a href="${resetUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;padding:12px 16px;border-radius:8px;text-decoration:none;">
            Cambiar contraseña
          </a>
        </p>
        <p>Este enlace vence en 30 minutos. Si no solicitaste este cambio, puedes ignorar este correo.</p>
      </div>
    `,
    text: `Restablece tu contraseña de BC Market: ${resetUrl}`,
  });
}
