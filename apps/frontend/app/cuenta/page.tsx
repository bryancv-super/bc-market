"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserSummaryCard } from "@/components/cards/user-summary-card";
import { ConfirmationModal } from "@/components/feedback/confirmation-modal";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { fetchProfile } from "@/lib/api/market";
import { clearAuthSession, getStoredToken, getStoredUser, StoredUser, updateStoredUser } from "@/lib/auth/session";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    const token = getStoredToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    if (storedUser) {
      window.setTimeout(() => setUser(storedUser), 0);
    }

    fetchProfile(token)
      .then((profile) => {
        setUser(profile);
        updateStoredUser(profile);
      })
      .catch(() => {
        if (!storedUser) {
          clearAuthSession();
          router.replace("/login");
        }
      });
  }, [router]);


  function handleLogout() {
    clearAuthSession();
    router.replace("/login");
  }

  return (
    <AppShell className="bg-surface px-8">
      <Header backHref="/home" title="Perfil" />
      <section className="mt-16 space-y-10">
        <UserSummaryCard
          email={user?.email ?? "Cargando..."}
          name={user?.username ?? "Cargando..."}
          profileImage={user?.profileImage}
        />
        <div className="space-y-4">
          <Link
            className={cn(
              "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
              buttonVariants.outline,
            )}
            href="/cuenta/editar"
          >
            Editar perfil
          </Link>
          <Link
            className={cn(
              "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
              buttonVariants.primary,
            )}
            href="/cuenta/cambiar-contrasena"
          >
            Cambiar contraseña
          </Link>
        </div>
        <Button className="w-full" type="button" variant="danger-outline" onClick={() => setIsLogoutOpen(true)}>
          Cerrar sesión
        </Button>
      </section>
      {isLogoutOpen ? (
        <ConfirmationModal
          cancelLabel="Cancelar"
          confirmLabel="Cerrar sesión"
          description="Tendrás que iniciar sesión de nuevo para acceder a tus listas."
          title="Cerrar sesión"
          onCancel={() => setIsLogoutOpen(false)}
          onConfirm={handleLogout}
        />
      ) : null}
    </AppShell>
  );
}
