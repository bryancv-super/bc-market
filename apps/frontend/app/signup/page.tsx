import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <AuthShell title="Crea tu cuenta" subtitle="Para acceder a la mejor plataforma de listas">
      <form className="space-y-5">
        <Input label="Nombre completo" />
        <Input label="Correo electronico" placeholder="ejemplo@correo.com" type="email" />
        <Input label="Contrasena" placeholder="****************" type="password" />
        <Input label="Confirmar contrasena" placeholder="****************" type="password" />
        <Button className="w-full" type="button">
          Crear cuenta
        </Button>
      </form>
      <p className="mt-9 text-center text-sm text-text-primary">
        ¿Ya tienes cuenta?{" "}
        <Link className="text-primary" href="/login">
          Inicia Sesion
        </Link>
      </p>
    </AuthShell>
  );
}
