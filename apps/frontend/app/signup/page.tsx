import { AuthStateView, AuthLinks } from "@/components/auth/auth-state-view";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { state?: string };
}) {
  const state = searchParams?.state ?? "default";

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Para acceder a la mejor plataforma de listas">
      <AuthStateView mode="signup" state={state} />
      {state === "default" || state === "validation" || state === "error" || state === "loading" ? (
        <form className="space-y-5">
          <Input error={state === "validation" ? "Nombre es requerido" : undefined} label="Nombre completo" />
          <Input
            error={state === "validation" ? "Correo electronico invalido" : state === "error" ? "Este correo electronico ya esta registrado" : undefined}
            label="Correo electronico"
            placeholder="ejemplo@correo.com"
            type="email"
          />
          <Input
            error={state === "validation" ? "La contraseña es muy corta" : undefined}
            label="Contrasena"
            placeholder="****************"
            type="password"
          />
          <Input
            error={state === "validation" ? "Las contraseñas no coinciden" : undefined}
            label="Confirmar contrasena"
            placeholder="****************"
            type="password"
          />
          <Button className="w-full" type="button">
            Crear cuenta
          </Button>
        </form>
      ) : null}
      <AuthLinks mode="signup" />
    </AuthShell>
  );
}
