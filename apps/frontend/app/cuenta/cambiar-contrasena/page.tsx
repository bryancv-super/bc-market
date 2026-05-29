 "use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/lib/api/auth";
import { getStoredToken } from "@/lib/auth/session";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const token = getStoredToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    setIsLoading(true);

    try {
      await changePassword(token, currentPassword, newPassword, passwordConfirmation);
      setCurrentPassword("");
      setNewPassword("");
      setPasswordConfirmation("");
      setSuccess("Contrasena actualizada correctamente");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos actualizar la contraseña");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppShell className="bg-surface px-8">
      <Header backHref="/cuenta" title="Cambiar contraseña" />
      <form className="mt-16 space-y-10" onSubmit={handleSubmit}>
        <Input
          label="Contraseña actual"
          onChange={(event) => setCurrentPassword(event.target.value)}
          placeholder="**********************"
          required
          type="password"
          value={currentPassword}
        />
        <Input
          label="Nueva contraseña"
          minLength={8}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="**********************"
          required
          type="password"
          value={newPassword}
        />
        <Input
          label="Confirmar contraseña"
          minLength={8}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          placeholder="**********************"
          required
          type="password"
          value={passwordConfirmation}
        />
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        {success ? <p className="text-xs text-primary-dark">{success}</p> : null}
        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading ? "Actualizando..." : "Actualizar contraseña"}
        </Button>
      </form>
    </AppShell>
  );
}
