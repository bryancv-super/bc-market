import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthStateView } from "@/components/auth/auth-state-view";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: { state?: string };
}) {
  const state = searchParams?.state ?? "default";

  return (
    <AuthShell title="Nueva contrasena" subtitle="Crea una nueva contrasena segura">
      <AuthStateView mode="reset" state={state} />
      {state === "default" || state === "validation" || state === "error" || state === "loading" ? (
        <form className="space-y-7">
          <Input
            error={state === "validation" ? "La contrasena es muy corta" : state === "error" ? "No pudimos actualizar tu contrasena" : undefined}
            label="Nueva contrasena"
            placeholder="**********************"
            type="password"
          />
          <Input
            error={state === "validation" ? "Las contrasenas no coinciden" : undefined}
            label="Confirmar contrasena"
            placeholder="**********************"
            type="password"
          />
          <Button className="w-full" type="button">
            Actualizar contrasena
          </Button>
        </form>
      ) : null}
    </AuthShell>
  );
}
