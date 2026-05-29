import Link from "next/link";
import { UserSummaryCard } from "@/components/cards/user-summary-card";
import { UserStateView } from "@/components/user/user-state-view";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/lib/mock/data";

export default function ProfilePage({
  searchParams,
}: {
  searchParams?: { state?: string };
}) {
  const state = searchParams?.state ?? "default";

  return (
    <AppShell className="bg-surface px-8">
      <Header backHref="/home" title="Perfil" />
      <section className="mt-16 space-y-10">
        <UserStateView mode="profile" state={state} />
        <UserSummaryCard email={mockUser.email} name={mockUser.name} />
        <div className="space-y-4">
          <Button className="w-full" type="button" variant="outline">
            <Link href="/cuenta/editar">Editar perfil</Link>
          </Button>
          <Button className="w-full" type="button">
            <Link href="/cuenta/cambiar-contrasena">Cambiar contrasena</Link>
          </Button>
        </div>
        <Button className="w-full" type="button" variant="danger-outline">
          Cerrar sesion
        </Button>
      </section>
    </AppShell>
  );
}
