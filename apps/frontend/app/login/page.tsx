import Link from "next/link";
import { AuthStateView, AuthLinks } from "@/components/auth/auth-state-view";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { state?: string };
}) {
  const state = searchParams?.state ?? "default";

  return (
    <AuthShell title="Inicia sesion" subtitle="Accede a tu cuenta para ver tus listas">
      <AuthStateView mode="login" state={state} />
      {state === "default" || state === "validation" || state === "error" ? (
        <form className="space-y-6">
          <Input
            error={state === "validation" ? "Correo es requerido" : state === "error" ? "Correo electronico o contraseña incorrectos" : undefined}
            label="Correo electronico"
            placeholder="ejemplo@correo.com"
            type="email"
          />
          <Input
            error={state === "validation" ? "Contraseña es requerida" : state === "error" ? "Correo electronico o contraseña incorrectos" : undefined}
            label="Contrasena"
            placeholder="**********************"
            type="password"
          />
          <div className="text-right">
            <Link className="text-xs text-primary" href="/recover-password">
              ¿Olvidaste tu contrasena?
            </Link>
          </div>
          <Button className="w-full" type="button">
            Iniciar sesion
          </Button>
        </form>
      ) : null}
      <AuthLinks mode="login" />
    </AuthShell>
  );
}
