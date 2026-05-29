import { AuthStateView, AuthLinks } from "@/components/auth/auth-state-view";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RecoverPasswordPage({
  searchParams,
}: {
  searchParams?: { state?: string };
}) {
  const state = searchParams?.state ?? "default";

  return (
    <AuthShell title="Recuperar contrasena" subtitle="Ingresa tu correo para recibir el enlace de restablecimiento">
      <AuthStateView mode="recover" state={state} />
      {state === "default" || state === "validation" || state === "error" || state === "loading" || state === "success" ? (
        <form className="space-y-7">
          <Input
            error={state === "validation" ? "Correo es requerido" : state === "error" ? "No pudimos enviar el correo" : undefined}
            label="Correo"
            placeholder="ejemplo@correo.com"
            type="email"
          />
          <Button className="w-full" type="button">
            Enviar enlace
          </Button>
        </form>
      ) : null}
      <AuthLinks mode="recover" />
    </AuthShell>
  );
}
