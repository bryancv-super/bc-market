import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { UserStateView, UserValidationMessage } from "@/components/user/user-state-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChangePasswordPage({
  searchParams,
}: {
  searchParams?: { state?: string };
}) {
  const state = searchParams?.state ?? "default";

  return (
    <AppShell className="bg-surface px-8">
      <Header backHref="/cuenta" title="Cambiar contrasena" />
      <UserStateView mode="change-password" state={state} />
      <form className="mt-16 space-y-10">
        <Input
          error={state === "validation" ? "La contrasena actual es incorrecta" : undefined}
          label="Contrasena actual"
          placeholder="**********************"
          type="password"
        />
        <Input
          error={state === "validation" ? "La contrasena es muy corta" : undefined}
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
        <UserValidationMessage message={state === "validation" ? "Revisa los errores del formulario" : undefined} />
        <Button className="w-full" type="button">
          Actualizar contrasena
        </Button>
      </form>
    </AppShell>
  );
}
