import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <AuthShell title="Inicia sesion" subtitle="Accede a tu cuenta para ver tus listas">
      <form className="space-y-6">
        <Input label="Correo electronico" placeholder="ejemplo@correo.com" type="email" />
        <Input label="Contrasena" placeholder="**********************" type="password" />
        <div className="text-right">
          <Link className="text-xs text-primary" href="/recover-password">
            ¿Olvidaste tu contrasena?
          </Link>
        </div>
        <Button className="w-full" type="button">
          Iniciar sesion
        </Button>
      </form>
      <p className="mt-9 text-center text-sm text-text-primary">
        ¿No tienes cuenta?{" "}
        <Link className="text-primary" href="/signup">
          Registrate
        </Link>
      </p>
    </AuthShell>
  );
}
