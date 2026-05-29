import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RecoverPasswordPage() {
  return (
    <AuthShell title="Recuperar contrasena" subtitle="Ingresa tu correo para recibir el enlace de restablecimiento">
      <form className="space-y-7">
        <Input label="Correo" placeholder="ejemplo@correo.com" type="email" />
        <Button className="w-full" type="button">
          Enviar enlace
        </Button>
      </form>
      <div className="mt-9 text-center">
        <Link className="text-xs text-primary" href="/login">
          Volver al inicio de sesion
        </Link>
      </div>
    </AuthShell>
  );
}
