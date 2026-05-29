import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Nueva contrasena" subtitle="Crea una nueva contrasena segura">
      <form className="space-y-7">
        <Input label="Nueva contrasena" placeholder="**********************" type="password" />
        <Input label="Confirmar contrasena" placeholder="**********************" type="password" />
        <Button className="w-full" type="button">
          Actualizar contrasena
        </Button>
      </form>
    </AuthShell>
  );
}
