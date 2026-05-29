import { UserRound } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUser } from "@/lib/mock/data";

export default function EditProfilePage() {
  return (
    <AppShell className="bg-surface px-8">
      <Header backHref="/cuenta" title="Editar perfil" />
      <section className="mt-12">
        <div className="mx-auto grid size-[60px] place-items-center rounded-full bg-border-muted text-text-primary">
          <UserRound className="size-10" />
        </div>
        <Button className="mt-8 w-full" type="button" variant="outline">
          Cambiar foto de perfil
        </Button>
        <form className="mt-10 space-y-7">
          <Input defaultValue={mockUser.name} label="Nombre" />
          <Input defaultValue={mockUser.email} label="Correo electronico" type="email" />
          <Button className="w-full" type="button">
            Guardar cambios
          </Button>
        </form>
      </section>
    </AppShell>
  );
}
