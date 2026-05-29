import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChangePasswordPage() {
  return (
    <AppShell className="bg-surface px-8">
      <Header backHref="/cuenta" title="Cambiar contrasena" />
      <form className="mt-16 space-y-10">
        <Input label="Contrasena actual" placeholder="**********************" type="password" />
        <Input label="Nueva contrasena" placeholder="**********************" type="password" />
        <Input label="Confirmar contrasena" placeholder="**********************" type="password" />
        <Button className="w-full" type="button">
          Actualizar contrasena
        </Button>
      </form>
    </AppShell>
  );
}
